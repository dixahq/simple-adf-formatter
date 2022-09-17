import { formatAdf, markdownFormatter } from '../src';
import {
  blockquoteAdf,
  inlineCodeAdf,
  headingsAdf,
  textMarkupAdf,
  linkAdf,
  codeBlockAdf,
  tablesAdf,
  largerAdf,
  bulletListAdf,
  orderedListAdf,
} from './adf.fixtures';
describe(`ADF parsing`, () => {
  it('should support quotes', () => {
    const expectedMarkdown = `A quote follows.
> Honk

The end.
`;
    expect(formatAdf(blockquoteAdf, markdownFormatter)).toBe(expectedMarkdown);
  });
  it('should support headings', () => {
    const expectedMarkdown = `
# Heading 1

Text 1

## Heading 2

Text 1.1

### Heading 3

Text 1.1.1

#### Heading 4

Text 1.1.1.1
Text 1.1.1.2

##### Heading 5

Text 1.1.1.1.1

###### Heading 6

Text 1.1.1.1.1.1
`;
    const result = formatAdf(headingsAdf, markdownFormatter);
    expect(result).toBe(expectedMarkdown);
  });

  it('should support text markup', () => {
    const expectedMarkdown = `regular
*italic*
<u>underlined</u>
~~strikethrough~~
**bold**
sub<sub>script</sub>
super<sup>script</sup>
~~***eve***~~<sub>~~***ry***~~</sub>~~***thi***~~<sup>~~***ng***~~</sup>
`;
    const result = formatAdf(textMarkupAdf, markdownFormatter);
    expect(result).toBe(expectedMarkdown);
  });

  it('should support links', () => {
    const expectedMarkdown = 'Go to [Dixa](https://dixa.com)!\n';
    expect(formatAdf(linkAdf, markdownFormatter)).toBe(expectedMarkdown);
  });

  it('should support inline code', () => {
    const expectedMarkdown = 'Hello `code`.\n';
    expect(formatAdf(inlineCodeAdf, markdownFormatter)).toBe(expectedMarkdown);
  });

  it('should support bullet lists', () => {
    const expectedMarkdown = `
- one
- two
- nine
`;
    expect(formatAdf(bulletListAdf, markdownFormatter)).toBe(expectedMarkdown);
  });

  it('should support numbered lists', () => {
    const expectedMarkdown = `
1. one
1. two
1. nine
`;
    expect(formatAdf(orderedListAdf, markdownFormatter)).toBe(expectedMarkdown);
  });

  it('should support code blocks', () => {
    const expectedMarkdown =
      'Code follows.\n\n```\n10 PRINT "hah hah"\n20 GOTO 10\n```\n';

    expect(formatAdf(codeBlockAdf, markdownFormatter)).toBe(expectedMarkdown);
  });

  it('should support tables', () => {
    const expectedMarkdown = `<table>
<tr>
  <th>A
  <th>B
<tr>
  <td>A:1
  <td>B:1
<tr>
  <td>A:2
  <td>B:2
</table>
`;

    const result = formatAdf(tablesAdf, markdownFormatter);
    expect(result).toBe(expectedMarkdown);
  });

  it('should transform larger documents correctly', () => {
    const result = formatAdf(largerAdf, markdownFormatter);
    const expectedMarkdown = `
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

Inline \`code\` and

\`\`\`typescript
// a code block
(code) => 'blocks'
\`\`\`
`;
    expect(result).toBe(expectedMarkdown);
  });
});
