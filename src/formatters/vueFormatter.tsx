import { h, VNode } from 'vue';
import { Formatter } from '../';

export const vueFormatter: Formatter<VNode | string> = {
  default: (_e, getChildren) => {
    // continue ADF traversal for unknown nodes but discard their data. Needs to
    // handle both the JSX and string type case
    const children = getChildren();
    if (children.every((e) => typeof e === 'string')) {
      return getChildren().join(' ');
    }
    return h('div', getChildren());
  },
  nodes: {
    doc: (_node, children) => h('div', children()),
    paragraph: (_node, children) => h('p', children()),
    listItem: (_node, children) => h('li', children()),
    bulletList: (_node, children) => h('ul', children()),
    orderedList: (_node, children) => h('ol', children()),
    blockquote: (_node, children) => h('blockquote', children()),
    text: (t) => t.text || '',
    hardBreak: (_node) => h('br'),
    heading: (heading, children) => {
      switch (heading.attrs?.level) {
        case 1:
          return h('h1', children());
        case 2:
          return h('h2', children());
        case 3:
          return h('h3', children());
        case 4:
          return h('h4', children());
        case 5:
          return h('h5', children());
        case 6:
          return h('h6', children());
        default:
          return h('div', children());
      }
    },
    codeBlock: (codeBlock, children) =>
      h('pre', [
        h('code', { lang: codeBlock.attrs?.language as string | undefined }, [
          children(),
        ]),
      ]),
  },
  marks: {
    text: {
      strong: (_mark, next) => h('b', next()),
      underline: (_mark, next) => h('u', next()),
      em: (_mark, next) => h('i', next()),
      code: (_mark, next) => h('code', next()),
      strike: (_mark, next) =>
        h('span', { style: { textDecoration: 'line-through' } }, next()),
      subsup: (mark, next, _parent) => {
        switch (mark.attrs?.type) {
          case 'sub':
            return h('sub', next());
          case 'sup':
            return h('sup', next());
          default:
            return next();
        }
      },
      link: (mark, next) =>
        h(
          'a',
          {
            href: mark.attrs?.href || '',
            target: '_blank',
            rel: 'noreferrer',
          },
          [next()]
        ),
    },
  },
};
