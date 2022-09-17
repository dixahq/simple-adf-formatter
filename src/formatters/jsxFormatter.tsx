import React from 'react';
import { Formatter } from '../types';

export const jsxFormatter: Formatter<JSX.Element> = {
  default: (_node, children) => <>{children()}</>,
  nodes: {
    doc: (_node, children) => <div>{children()}</div>,
    paragraph: (_node, children, idx) => <p key={idx}>{children()}</p>,
    text: (node, _children, idx) => <span key={idx}>{node.text}</span> ?? <span  key={idx}/>,
    hardBreak: (_n,_c,idx) => <br  key={idx} />,
  },
  marks: {
    text: {
      strong: (_mark, next, _parent, nIdx, mIdx) => <b key={nIdx +'.'+mIdx}>{next()}</b>,
      underline: (_mark, next, _parent, nIdx, mIdx) => <u key={nIdx +'.'+mIdx}>{next()}</u>,
      em: (_mark, next, _parent, nIdx, mIdx) => <i key={nIdx +'.'+mIdx}>{next()}</i>,
      code: (_mark, next, _parent, nIdx, mIdx) => <code key={nIdx +'.'+mIdx}>{next()}</code>,
      subsup: (mark, next, _parent, nIdx, mIdx) => {
        switch (mark.attrs?.type) {
          case 'sub':
            return <sub key={nIdx +'.'+mIdx}>{next()}</sub>;
          case 'sup':
            return <sup key={nIdx +'.'+mIdx}>{next()}</sup>;
          default:
            return next();
        }
      },
    },
  },
};
