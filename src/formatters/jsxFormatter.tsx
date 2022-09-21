import React from 'react';
import { Formatter } from '../';

export const jsxFormatter: Formatter<JSX.Element | string> = {
  default: (_e, getChildren) => {
    // continue ADF traversal for unknown nodes but discard their data. Needs to
    // handle both the JSX and string type case
    const children = getChildren();
    if (children.every((e) => typeof e === 'string')) {
      return getChildren().join(' ');
    }
    return <>{getChildren()}</>;
  },
  nodes: {
    // Note that the index params are required to satisfy the React `key` prop constraints.
    doc: (_node, children) => <div>{children()}</div>,
    paragraph: (_node, children, idx) => <p key={idx}>{children()}</p>,
    listItem: (_node, children, idx) => <li key={idx}>{children()}</li>,
    bulletList: (_node, children, idx) => <ul key={idx}>{children()}</ul>,
    orderedList: (_node, children, idx) => <ol key={idx}>{children()}</ol>,
    blockquote: (_node, children, idx) => (
      <blockquote key={idx}>{children()}</blockquote>
    ),
    text: (t) => t.text || '',
    hardBreak: (_node, _c, idx) => <br key={idx} />,
    heading: (heading, children, idx) => {
      switch (heading.attrs?.level) {
        case 1:
          return <h1 key={idx}>{children()}</h1>;
        case 2:
          return <h2 key={idx}>{children()}</h2>;
        case 3:
          return <h3 key={idx}>{children()}</h3>;
        case 4:
          return <h4 key={idx}>{children()}</h4>;
        case 5:
          return <h5 key={idx}>{children()}</h5>;
        case 6:
          return <h6 key={idx}>{children()}</h6>;
        default:
          return <>{children()}</>;
      }
    },
    codeBlock: (codeBlock, children, idx) => (
      <pre key={idx}>
        <code lang={codeBlock.attrs?.language as string | undefined}>
          {children()}
        </code>
      </pre>
    ),
  },
  marks: {
    text: {
      strong: (_mark, next, _parent, nIdx, mIdx) => (
        <b key={nIdx + '.' + mIdx}>{next()}</b>
      ),
      underline: (_mark, next, _parent, nIdx, mIdx) => (
        <u key={nIdx + '.' + mIdx}>{next()}</u>
      ),
      em: (_mark, next, _parent, nIdx, mIdx) => (
        <i key={nIdx + '.' + mIdx}>{next()}</i>
      ),
      code: (_mark, next, _parent, nIdx, mIdx) => (
        <code key={nIdx + '.' + mIdx}>{next()}</code>
      ),
      strike: (_mark, next, _parent, nIdx, mIdx) => (
        <span
          style={{ textDecoration: 'line-through' }}
          key={nIdx + '.' + mIdx}
        >
          {next()}
        </span>
      ),
      subsup: (mark, next, _parent, nIdx, mIdx) => {
        switch (mark.attrs?.type) {
          case 'sub':
            return <sub key={nIdx + '.' + mIdx}>{next()}</sub>;
          case 'sup':
            return <sup key={nIdx + '.' + mIdx}>{next()}</sup>;
          default:
            return next();
        }
      },
      link: (mark, next, _parent, nIdx, mIdx) => (
        <a
          key={nIdx + '.' + mIdx}
          href={mark.attrs?.href || ''}
          target="_blank"
          rel="noreferrer"
        >
          {next()}
        </a>
      ),
    },
  },
};
