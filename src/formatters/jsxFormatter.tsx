import React from 'react';
import { Formatter } from '../types';

export const jsxFormatter: Formatter<JSX.Element> = {
  default: (_node, children) => <>{children()}</>,
  nodes: {
    doc: (_node, children) => <div>{children()}</div>,
    paragraph: (_node, children) => <p>{children()}</p>,
    text: (node) => <span>{node.text}</span> ?? <span />,
    hardBreak: () => <br />
  },
  marks: {
    text: {
      strong: (_mark, next) => <b>{next()}</b>,
      underline: (_mark, next) => <u>{next()}</u>,
      em: (_mark, next) => <i>{next()}</i>,
      code: (_mark, next) => <code>{next()}</code>,
      subsup: (mark, next) => {
        switch (mark.attrs?.type) {
          case 'sub':
            return <sub>{next()}</sub>;
          case 'sup':
            return <sup>{next()}</sup>;
          default:
            return next();
        }
      },
    },
  },
};
