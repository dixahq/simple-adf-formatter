import { ADFEntity, Formatter, formatAdf } from '../src';

const simpleAdf: ADFEntity = {
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
          text: 'world',
          marks: [
            {
              type: 'strong',
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
          text: 'Hello ',
        },
        {
          type: 'text',
          text: 'ADF',
        },
      ],
    },
  ],
};

describe(`ADF parsing`, () => {
  it('should strip markup', () => {
    const stripped = formatAdf(simpleAdf, {
      default: () => '',
      nodes: {
        doc: (_n, children) => children().join(''),
        paragraph: (_n, children) => children().join(''),
        text: (t) => t.text || '',
      },
      marks: {},
    });
    expect(stripped).toBe('Hello worldHello ADF');
  });

  it('should visit every node', () => {
    const toNestedString = (node: ADFEntity, processChildren: () => string[]) =>
      `${node.type}(${processChildren().join(',')})`;

    const formatter: Formatter<string> = {
      default: () => '',
      nodes: {
        doc: toNestedString,
        paragraph: toNestedString,
        text: (e) => e.type,
      },
      marks: {},
    };

    const result = formatAdf(simpleAdf, formatter);
    expect(result).toBe('doc(paragraph(text,text),paragraph(text,text))');
  });

  it("won't skip block nodes without formatter implementations", async () => {
    const adf: ADFEntity = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'my data',
                },
              ],
            },
          ],
        },
      ],
    };

    const formatter: Formatter<string | undefined> = {
      default: (_e, c) => c().join(''),
      nodes: {
        text: (t) => t.text,
      },
      marks: {},
    };

    expect(formatAdf(adf, formatter)).toBe('my data');
  });

  it('should apply all marks', () => {
    const adf: ADFEntity = {
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

    const formatter: Formatter<string> = {
      default: (_node, children) => children().join('-'),
      nodes: {},
      marks: {
        text: {
          em: (_mark, next) => `e(${next()})`,
          strong: (_mark, next) => `s(${next()})`,
        },
      },
    };

    expect(formatAdf(adf, formatter)).toBe('s()-e(s())-s()');
  });

  it('can exclude sub-trees per type', () => {
    const formatter: Formatter<string> = {
      default: () => '',
      nodes: {
        doc: (_e, children) => children().join(''), // recurse into children
        paragraph: () => 'p', // output a fixed string
        text: () =>
          'This is never called, as paragraph does not call children()',
      },
      marks: {},
    };

    const result = formatAdf(simpleAdf, formatter);
    expect(result).toBe('pp');
  });

  it('should recurse into all children if told so in default', () => {
    const f: Formatter<number> = {
      default: (_e, children) =>
        children().reduce((acc, curr) => acc + curr, 0),
      nodes: {
        text: (node) => node.text?.length || 0,
      },
      marks: {},
    };

    expect(formatAdf(simpleAdf, f)).toEqual('Hello WorldHello ADF'.length);
  });

  it('should support producing outlines', () => {
    const adf: ADFEntity = {
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
    const f: Formatter<string> = {
      default: (_node) => '', // don't recurse into unknown nodes
      nodes: {
        doc: (_node, children) => children().join(''),
        heading: (node, children) =>
          ' '.repeat(parseInt(node.attrs?.level as string) - 1) +
          children() +
          '\n',
        text: (node) => node.text || '',
      },
      marks: {},
    };

    //prettier-ignore
    expect(formatAdf(adf, f)).toEqual(`Heading 1
 Heading 1.1
 Heading 1.2
Heading 2
Heading 3
 Heading 3.1
  Heading 3.1.1
`);
  });
});
