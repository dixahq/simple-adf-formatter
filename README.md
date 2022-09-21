# Simple ADF Formatter

A light-weight parser and formatter framework for converting [Atlassian Document
Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/) to arbitrary outputs.

While Atlassian provides utilities for building and traversing documents (`@atlaskit/adf-utils`), I
couldn't find a library that allows for simply rendering ADF within an
application running in the browser.

## 🎨 Design Goals

* Make it trivial to render ADF documents into arbitrary formats.
* Small runtime size: `simple-adf-formatter`'s size is `< 2kB`. Atlassian's [adf-utils](https://www.npmjs.com/package/@atlaskit/adf-utils) weighs > 550kB.
* No external dependencies: `simple-adf-formatter` has no external dependencies.
  Atlassian libraries bundle `@babel/runtime` and additional proprietary
  libraries from Atlassian.
* Understandable: Writing formatters producing arbitrary output should be
  simple. `simple-adf-formatter` comes with examples for popular UI frameworks.
  The formatter API surface is tiny and nicely typed to allow better code completion. The
  Atlassian documentation for `adf-utils` seems not to exist, the ADF reference
  points to the deprecated `adf-builder` library.
* Non-opinionated:
  * `simple-adf-formatter` does not make assumptions on which types your
    formatters produce. You can create `strings`, Markdown, HTML, React or JSX
    elements, Vue components or word counts and document outlines.
  * `simple-adf-formatter` does not implement the complete ADF specification.
    While all ADF types and markup options are supported, we don't restrict
    formatters from handling more or less markup options than the (current)
    specification allows. We also don't limit which types are allowed to be
    nested hierarchically.
* Open-source: `simple-adf-formatter` is licensed under the [Apache License
  2.0](https://spdx.org/licenses/Apache-2.0.html). `adf-utils` does not specify
  a license in the package, the links to the repository are dead.

## ⏱️ Quickstart

## 📖 Usage

To format ADF documents you need

* the ADF object of type `ADFEntity`
* a formatter implementation of type `Formatter<T>` with `T` being the desired
  result type. You can ...
  * ... use the formatters [shipped with this package](./src/formatters/), or
  * ... [customize them](#customizing-formatters), or
  * ... [write your own formatters](#writing-formatters) from scratch.
* call `formatAdf` with the ADF object and the formatter.

```ts
import { ADFEntity, formatAdf, markdownFormatter } from '../src';

const adf : ADFEntity = { /* see full representation below */ }
const markdown = renderAdf(adf, markdownFormatter)
```

The example above will produce the following markdown given the ADF below.
<details>
<summary>ADF</summary>

```json
{
    "version": 1,
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": {
          "level": 1
        },
        "content": [
          {
            "type": "text",
            "text": "ADF Test"
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Text"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Text "
          },
          {
            "type": "text",
            "text": "with",
            "marks": [
              {
                "type": "strong"
              }
            ]
          },
          {
            "type": "text",
            "text": " "
          },
          {
            "type": "text",
            "text": "markup",
            "marks": [
              {
                "type": "em"
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Lists"
          }
        ]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "un-"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "ordered"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "list"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "orderedList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "numbered"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "list"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Links"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "https://xkcd.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://xkcd.com"
                }
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Tables"
          }
        ]
      },
      {
        "type": "table",
        "attrs": {
          "isNumberColumnEnabled": false,
          "layout": "default",
          "localId": "31672348-8738-4209-9135-a0c9d61c9828"
        },
        "content": [
          {
            "type": "tableRow",
            "content": [
              {
                "type": "tableHeader",
                "attrs": {},
                "content": [
                  {
                    "type": "paragraph",
                    "content": [
                      {
                        "type": "text",
                        "text": "I",
                      }
                    ]
                  }
                ]
              },
              {
                "type": "tableHeader",
                "attrs": {},
                "content": [
                  {
                    "type": "paragraph",
                    "content": [
                      {
                        "type": "text",
                        "text": "hate",
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "tableRow",
            "content": [
              {
                "type": "tableCell",
                "attrs": {},
                "content": [
                  {
                    "type": "paragraph",
                    "content": [
                      {
                        "type": "text",
                        "text": "tables"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "tableCell",
                "attrs": {},
                "content": [
                  {
                    "type": "paragraph",
                    "content": [
                      {
                        "type": "text",
                        "text": "in"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "tableRow",
            "content": [
              {
                "type": "tableCell",
                "attrs": {},
                "content": [
                  {
                    "type": "paragraph",
                    "content": [
                      {
                        "type": "text",
                        "text": "markdown"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "tableCell",
                "attrs": {},
                "content": [
                  {
                    "type": "paragraph",
                    "content": [
                      {
                        "type": "text",
                        "text": "a lot"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Code"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Inline "
          },
          {
            "type": "text",
            "text": "code",
            "marks": [
              {
                "type": "code"
              }
            ]
          },
          {
            "type": "text",
            "text": " and"
          }
        ]
      },
      {
        "type": "codeBlock",
        "attrs": {
          "language": "typescript"
        },
        "content": [
          {
            "type": "text",
            "text": "// a code block\n(code) => 'blocks'"
          }
        ]
      }
    ]
  }
```
</details>

<details>
<summary>Markdown source</summary>

~~~md
# ADF Test


## Text

Text **with** *markup*

## Lists


- un-
- ordered
- list

1. numbered
1. list

## Links

[https://xkcd.com](https://xkcd.com)

## Tables

<table>
<tr>
  <th>I
  <th>hate
<tr>
  <td>tables
  <td>in
<tr>
  <td>markdown
  <td>a lot
</table>

## Code

Inline `code` and

```typescript
// a code block
(code) => 'blocks'
```
~~~

</details>

<details>
<summary>Markdown rendered</summary>

# ADF Test


## Text

Text **with** *markup*

## Lists


- un-
- ordered
- list

1. numbered
1. list

## Links

[https://xkcd.com](https://xkcd.com)

## Tables

<table>
<tr>
  <th>I
  <th>hate
<tr>
  <td>tables
  <td>in
<tr>
  <td>markdown
  <td>a lot
</table>

## Code

Inline `code` and

```typescript
// a code block
(code) => 'blocks'
```
</details>

### 📦 Installation

### 👩🏾‍🎨 <a name="writing-formatters"></a>Writing formatters

A `formatter` provides callbacks for each (or a subset of) the
node types in the document. Optionally it specifies callbacks that handle markup
properties. It also needs to specify a default callback to be used for node
types without callbacks specified.

A callback for a node type takes the node and a function to recurse into its
children as parameters and returns the type specified in the `formatters` type
argument. Additionally, the index of the node amongst its siblings is passed to
the callback.

```ts
export type NodeMapper<T> = (
  node: ADFEntity,
  processChildren: () => T[],
  siblingIdx: number
) => T;
```

A simple formatter going through the whole document and simply concatenating
text values can be written like this. Additionally, the node index and the index
of the markup amongst its siblings is passed to the callback.

```ts
export type MarkMapper<T> = (
  mark: ADFEntityMark,
  next: () => T,
  parent: ADFEntity,
  nodeIdx: number,
  markIdx: number
) => T;
```

This minimal formatter walks through the document tree while concatenating the
context of all `text` nodes.

```ts
const formatter: Formatter<string> = {
  default: (_node, children) => children().join(''), // recurse into nested nodes and concatenate the result
  nodes: {
    text: (t) => t.text || '',
  },
  marks: {},
}); 
```

#### Customizing formatters

To customize one of [the stock formatters](./src/formatters/), spread the
formatter into a new object and override the node/mark formatters as you see
fit.

```ts
import { ADFEntity, formatAdf, Formatter, jsxFormatter } from '../src';

const adf : ADFEntity =  { /* an ADF document */ }

const myCustomizedFormatter : Formatter<JSX.Element | string>= {
  // Use stock formatter, but ...
  ...jsxFormatter,
  nodes: {
    ...jsxFormatter.nodes,
    // ... wrap the ADF in a <section> instead of in a <div>.
    doc: (_node, children) => <section>{children()}</section>,
  }
}

const result : JSX.Element | string = 
  formatAdf(adf, myCustomizedFormatter);

```

### Examples

For more in-depth examples please refer to [the stock formatters](./src/formatters/) and [the tests](./test/).

<details>
<summary>JSX</summary>

This formatter wraps the document in a `<div>`, each paragraph in a `<p>` while
applying a subset of possible markup properties.

```ts
const jsxFormatter: Formatter<JSX.Element> = {
  default: (_node, children) => <>{children()}</>,
  nodes: {
    doc: (_node, children) => <div>{children()}</div>,
    paragraph: (_node, children) => <p>{children()}</p>,
    text: (node) => <span>{node.text}</span> ?? <span />,
  },
  marks: {
    text: {
      strong: (_mark, next) => <b>{next()}</b>,
      underline: (_mark, next) => <u>{next()}</u>,
      em: (_mark, next) => <em>{next()}</em>,
      code: (_mark, next) => <code>{next()}</code>,
    },
  },
}
```

</details>

<details>
<summary>Vue (using render functions)</summary>

This formatter wraps the document in a `<div>`, each paragraph in a `<p>` and
each text node in a `span` while applying a subset of possible markup properties.

```ts
 const f: Formatter<VNode> = {
  default: (_e, children) => h('section',children()),
  nodes: {
    doc: (_node, children) => h('div', children()),
    paragraph: (_node, children) => h('p', children()),
    text: (node) => h('span',node.text)
  },
  marks: {
    text: {
      strong: (_mark, next) => h('b', next()),
      underline: (_mark, next) => h('u', next()),
      em: (_mark, next) => h('i', next()),
      code: (_mark, next) => h('code', next()),
      strike: (_mark, next) =>
        h('span', { style: { textDecoration: 'line-through' } }, next()),      
    },
  },
}
   
```

</details>

<details>
<summary>Counting characters</summary>

This example counts the characters of all text content. It's not the intended
usage of formatters, but shows their flexibility nicely.

Note the `default` callback: Without it, it would to nothing at it would never
recurse into child nodes from any element including the `doc` root.

```ts
const f: Formatter<number> = {
    default: (_e, children) =>
      children().reduce((acc, curr) => acc + curr, 0),
    nodes: {
      text: (node) => node.text?.length || 0,
    },
    marks: {},
  };
```

</details>

<details>
<summary>Creating document outlines</summary>

This example also illustrates the flexibility but is not necessarily something
you'd typically do.

It creates an outline of the ADF by ...

* ... prefixig headings with the amount of spaces matching their level to create
   indentation
* ... outputting text elements as strings
* ... **EXPLICITLY** recursing only into children of `doc` and `heading`, 
  ignoring other nodes. Note that we simply return `''` from the default
  formatter, thus not recursing into unknown elements.
It only recurses into children of headings

```ts
const f: Formatter<string> = {
  default: (_node) => '', // don't recurse into unknown nodes
  nodes: {
    doc: (_node, children) => children().join(''),
    heading: (node, children) => ' '.repeat(
      parseInt(node.attrs?.level as string) - 1) + children() + '\n',
    text: (node) => node.text || '',
  },
  marks: {},
};
```

</details>

## 🔧 Development

* `yarn start`: Runs compilation continuously on changes.
* `yarn lint`: Lints the code base.
* `yarn test`: Runs tests.
* `yarn test --watch`: Runs tests continuously on changes.
* `yarn build`: Builds the package.
* `yarn size`: Checks the resulting bundle size.
* `yarn analyze`: Explains the bundle size.

### CI

* PRs are tested in a matrix build with Node 14, 16 and 18 on ubuntu, windows
  and macos
* Builds on `main` only build on ubuntu
* Builds on `main` will result in publication to npmjs
