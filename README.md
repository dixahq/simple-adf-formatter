# Simple ADF Formatter

A light-weight parser and formatter framework for converting [Atlassian Document
Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/) to arbitrary outputs.

While Atlassian provides utilities for building and traversing documents (`@atlaskit/adf-utils`), I
couldn't find a library that allows for simply rendering ADF within an
application running in the browser.

## 🎨 Design Goals

* Make it trivial to render ADF documents into arbitrary formats.
* Small runtime size: `simple-adf-formatter`'s size is `< 10kB`. Atlassian's [adf-utils](https://www.npmjs.com/package/@atlaskit/adf-utils) weighs > 550kB.
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
    formatters produce. You can create `strings`,  Markdown, HTML, React or JSX
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

### 📦 Installation

### 👩🏾‍🎨 Writing formatters

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

### Examples

## 🔧 Development

* `yarn start`: Runs tests continuously.
* `yarn lint`: Lints the code base.
* `yarn test`: Runs tests.
* `yarn build`: Builds the package.
* `yarn size`: Checks the resulting bundle size.
* `yarn analyze`: Explains the bundle size.
