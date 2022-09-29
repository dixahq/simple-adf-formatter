import { ADFEntity } from '../src';

export const headingsAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 1',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Text 1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 2',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Text 1.1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 3',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Text 1.1.1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 4,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 4',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Text 1.1.1.1',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Text 1.1.1.2',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 5,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 5',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Text 1.1.1.1.1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 6,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 6',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Text 1.1.1.1.1.1',
        },
      ],
    },
  ],
};

export const blockquoteAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'A quote follows.',
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Honk',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The end.',
        },
      ],
    },
  ],
};

export const textMarkupAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'regular',
        },
        {
          type: 'hardBreak',
        },
        {
          type: 'text',
          text: 'italic',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'hardBreak',
        },
        {
          type: 'text',
          text: 'underlined',
          marks: [
            {
              type: 'underline',
            },
          ],
        },
        {
          type: 'hardBreak',
        },
        {
          type: 'text',
          text: 'strikethrough',
          marks: [
            {
              type: 'strike',
            },
          ],
        },
        {
          type: 'hardBreak',
        },
        {
          type: 'text',
          text: 'bold',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
        {
          type: 'hardBreak',
        },
        {
          type: 'text',
          text: 'sub',
        },
        {
          type: 'text',
          text: 'script',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sub',
              },
            },
          ],
        },
        {
          type: 'hardBreak',
        },
        {
          type: 'text',
          text: 'super',
        },
        {
          type: 'text',
          text: 'script',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sup',
              },
            },
          ],
        },
        {
          type: 'hardBreak',
        },
        {
          type: 'text',
          text: 'eve',
          marks: [
            {
              type: 'em',
            },
            {
              type: 'strong',
            },
            {
              type: 'strike',
            },
          ],
        },
        {
          type: 'text',
          text: 'ry',
          marks: [
            {
              type: 'em',
            },
            {
              type: 'strong',
            },
            {
              type: 'strike',
            },
            {
              type: 'subsup',
              attrs: {
                type: 'sub',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'thi',
          marks: [
            {
              type: 'em',
            },
            {
              type: 'strong',
            },
            {
              type: 'strike',
            },
          ],
        },
        {
          type: 'text',
          text: 'ng',
          marks: [
            {
              type: 'em',
            },
            {
              type: 'strong',
            },
            {
              type: 'strike',
            },
            {
              type: 'subsup',
              attrs: {
                type: 'sup',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const inlineCodeAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello ',
        },
        {
          type: 'text',
          text: 'code',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: '.',
        },
      ],
    },
  ],
};

export const linkAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Go to ',
        },
        {
          type: 'text',
          text: 'Dixa',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://dixa.com',
              },
            },
          ],
        },
        {
          type: 'text',
          text: '!',
        },
      ],
    },
  ],
};

export const codeBlockAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Code follows.',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {},
      content: [
        {
          type: 'text',
          text: '10 PRINT "hah hah"\n20 GOTO 10',
        },
      ],
    },
  ],
};

export const tablesAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'table',
      attrs: {
        isNumberColumnEnabled: false,
        layout: 'default',
        localId: '439ed07e-e725-4fad-aba0-2a54d45440dd',
      },
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'A',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'B',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'A:1',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'B:1',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'A:2',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'B:2',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const largerAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'ADF Test',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Text',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Text ',
        },
        {
          type: 'text',
          text: 'with',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          text: 'markup',
          marks: [
            {
              type: 'em',
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Lists',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'un-',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'ordered',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'list',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'orderedList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'numbered',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'list',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Links',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'https://xkcd.com',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://xkcd.com',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Tables',
        },
      ],
    },
    {
      type: 'table',
      attrs: {
        isNumberColumnEnabled: false,
        layout: 'default',
        localId: '31672348-8738-4209-9135-a0c9d61c9828',
      },
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'I',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'hate',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'tables',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'in',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'markdown',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'a lot',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Code',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Inline ',
        },
        {
          type: 'text',
          text: 'code',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' and',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'typescript',
      },
      content: [
        {
          type: 'text',
          text: "// a code block\n(code) => 'blocks'",
        },
      ],
    },
  ],
};

export const bulletListAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'one',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'two',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'nine',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const orderedListAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'orderedList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'one',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'two',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'nine',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const headings2Adf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 1',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Text 1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 1.1',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'text in paras is ignored',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 1.2',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'text in paras is ignored',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 2',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'text in paras is ignored',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'text in paras is ignored',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 3',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'text in paras is ignored',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 3.1',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'text in paras is ignored',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 3.1.1',
        },
      ],
    },
  ],
};

export const simpleMarksAdf: ADFEntity = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'outer ',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
        {
          type: 'text',
          text: 'inner',
          marks: [
            {
              type: 'strong',
            },
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: ' outer',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
      ],
    },
  ],
};
