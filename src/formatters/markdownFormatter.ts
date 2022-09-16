import {Formatter} from '../types'

export const markdownFormatter: Formatter<string> = {
  default: (_node, children) => (children() ?? []).join(''),
  nodes: {
    doc: (_node, children) => (children() ?? []).join(''),
    heading: (heading, children) => `${'#'.repeat(parseInt(heading.attrs?.level as string) || 1)} ${children()}\n`,
    bulletList: (_node, children) => children().join('\n'),
    orderedList: (_node, children) => children().join('\n'),
    listItem: (_node, children) => '- ' + children(),
		paragraph: (_node, children) => children().join('') + '\n',
    text: (node) => node.text ?? '',
    hardBreak: () => '\n',
    blockquote: (_node, children) => `> ${children().join('')}\n`,
    codeBlock: (_node,children) => '```\n'+children()+'\n```',
    table: (_node, children) => `<table>\n${children().join('')}</table>\n`,
    tableRow:(_node, children) => `<tr>\n${children().join('')}`,
    tableHeader:(_node, children) => `  <td>${children()}`,
    tableCell:(_node, children) => `  <td>${children()}`,

  },
  marks: {
    text: {
      strong: (_mark, next) => `**${next()}**`,
      strike: (_mark, next) => `~~${next()}~~`,
      subsup: (mark, next) => {
        switch (mark.attrs?.type) {
          case 'sub': return `<sub>${next()}</sub>`
          case 'sup': return `<sup>${next()}</sup>`
          default: return next()
        }
      },
      underline: (_mark, next) => `<u>${next()}</u>`,
      em: (_mark, next) => `*${next()}*`,
      link: (mark, next) => `[${next()}](${mark.attrs?.href})`,
      code: (_mark, next) => `\`${next()}\``
    }
  }
}