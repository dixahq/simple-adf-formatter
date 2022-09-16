import { formatAdf } from '../';
import { ADFEntity, Formatter } from '../';

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
    const adf : ADFEntity = {
      "version": 1,
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "outer ",
              "marks": [
                {
                  "type": "strong"
                }
              ]
            },
            {
              "type": "text",
              "text": "inner",
              "marks": [
                {
                  "type": "strong"
                },
                {
                  "type": "em"
                }
              ]
            },
            {
              "type": "text",
              "text": " outer",
              "marks": [
                {
                  "type": "strong"
                }
              ]
            }
          ]
        }
      ]
    }

    const formatter :Formatter<string> = {
      default: (_node, children) => children().join('-'),
      nodes: {},
      marks: {
        text: {
          'em': (_mark,next) => `e(${next()})`,
          'strong': (_mark,next) => `s(${next()})`
        }
      }
    } 

    expect(formatAdf(adf,formatter)).toBe('s()-e(s())-s()');
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
});
