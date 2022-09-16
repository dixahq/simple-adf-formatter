# Simple ADF Formatter

A light-weight parser and formatter framework for converting Atlassian Document Format to arbitrary outputs.

## ⏱️ Quickstart

## 📖 Usage

### 📦 Installation

### 🎨 Writing formatters

### Examples

#### JSX

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

## 🔧 Development

* `yarn start`: Runs compilation continuously on changes.
* `yarn lint`: Lints the code base.
* `yarn test`: Runs tests.
* `yarn test --watch`: Runs tests continuously on changes.
* `yarn build`: Builds the package.
* `yarn size`: Checks the resulting bundle size.
* `yarn analyze`: Explains the bundle size.
