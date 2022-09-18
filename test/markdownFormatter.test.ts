import { ADFEntity, formatAdf, markdownFormatter } from '../src';
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
describe(`Markdown formatting`, () => {
  const tests: { feature: string; adf: ADFEntity; expectedMd: string }[] = [
    {
      feature: 'quotes',
      adf: blockquoteAdf,
      // Prevent prettier from messing up multiline strings
      // prettier-ignore
      expectedMd: `A quote follows.
> Honk

The end.
`,
    },
    {
      feature: 'headings',
      adf: headingsAdf,
      // Prevent prettier from messing up multiline strings
      // prettier-ignore
      expectedMd: `
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
`,
    },
    {
      feature: 'text markup',
      adf: textMarkupAdf,
      // Prevent prettier from messing up multiline strings
      // prettier-ignore
      expectedMd: `regular
*italic*
<u>underlined</u>
~~strikethrough~~
**bold**
sub<sub>script</sub>
super<sup>script</sup>
~~***eve***~~<sub>~~***ry***~~</sub>~~***thi***~~<sup>~~***ng***~~</sup>
`,
    },
    {
      feature: 'links',
      adf: linkAdf,
      expectedMd: 'Go to [Dixa](https://dixa.com)!\n',
    },
    {
      feature: 'inline code',
      adf: inlineCodeAdf,
      expectedMd: 'Hello `code`.\n',
    },
    {
      feature: 'unordered lists',
      adf: bulletListAdf,
      // Prevent prettier from messing up multiline strings
      // prettier-ignore
      expectedMd:`
- one
- two
- nine
`,
    },
    {
      feature: 'ordered lists',
      adf: orderedListAdf,
      // Prevent prettier from messing up multiline strings
      // prettier-ignore
      expectedMd:`
1. one
1. two
1. nine
`,
    },
    {
      feature: 'code blocks',
      adf: codeBlockAdf,
      expectedMd: 'Code follows.\n\n```\n10 PRINT "hah hah"\n20 GOTO 10\n```\n',
    },
    {
      feature: 'tables',
      adf: tablesAdf,
      // Prevent prettier from messing up multiline strings
      // prettier-ignore
      expectedMd:  `<table>
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
`,
    },
    {
      feature: 'larger documents',
      adf: largerAdf,
      // Prevent prettier from messing up multiline strings
      // prettier-ignore
      expectedMd: `
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
`,
    },
  ];

  it.each(tests)('should support $feature', (test) => {
    const result = formatAdf(test.adf, markdownFormatter);
    expect(result).toEqual(test.expectedMd);
  });
});
