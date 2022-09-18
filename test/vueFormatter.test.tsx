/**
 * @jest-environment jsdom
 */
import { ADFEntity, formatAdf, vueFormatter } from '../src';
import {
  blockquoteAdf,
  bulletListAdf,
  codeBlockAdf,
  headingsAdf,
  inlineCodeAdf,
  linkAdf,
  orderedListAdf,
  textMarkupAdf,
} from './adf.fixtures';
import { h, VNode } from 'vue';
import { mount } from '@vue/test-utils';

describe(`Vue formatting`, () => {
  const tests: { feature: string; adf: ADFEntity; expectedComponent: VNode }[] =
    [
      {
        feature: 'quotes',
        adf: blockquoteAdf,
        expectedComponent: h('div', [
          h('p', 'A quote follows.'),
          h('blockquote', h('p', 'Honk')),
          h('p', 'The end.'),
        ]),
      },
      {
        feature: 'headings',
        adf: headingsAdf,
        expectedComponent: h('div', [
          h('h1', 'Heading 1'),
          h('p', 'Text 1'),
          h('h2', 'Heading 2'),
          h('p', 'Text 1.1'),
          h('h3', 'Heading 3'),
          h('p', 'Text 1.1.1'),
          h('h4', 'Heading 4'),
          h('p', 'Text 1.1.1.1'),
          h('p', 'Text 1.1.1.2'),
          h('h5', 'Heading 5'),
          h('p', 'Text 1.1.1.1.1'),
          h('h6', 'Heading 6'),
          h('p', 'Text 1.1.1.1.1.1'),
        ]),
      },
      {
        feature: 'text markup',
        adf: textMarkupAdf,
        expectedComponent: h('div', [
          h('p', [
            'regular',
            h('br'),
            h('i', 'italic'),
            h('br'),
            h('u', 'underlined'),
            h('br'),
            h(
              'span',
              { style: { textDecoration: 'line-through' } },
              'strikethrough'
            ),
            h('br'),
            h('b', 'bold'),
            h('br'),
            'sub',
            h('sub', 'script'),
            h('br'),
            'super',
            h('sup', 'script'),
            h('br'),
            h(
              'span',
              { style: { textDecoration: 'line-through' } },
              h('b', [h('i', 'eve')])
            ),
            h(
              'sub',
              h('span', { style: { textDecoration: 'line-through' } }, [
                h('b', [h('i', 'ry')]),
              ])
            ),
            h(
              'span',
              { style: { textDecoration: 'line-through' } },
              h('b', [h('i', 'thi')])
            ),
            h(
              'sup',
              h('span', { style: { textDecoration: 'line-through' } }, [
                h('b', [h('i', 'ng')]),
              ])
            ),
          ]),
        ]),
      },
      {
        feature: 'links',
        adf: linkAdf,
        expectedComponent: h('div', [
          h('p', [
            'Go to ',
            h(
              'a',
              { href: 'https://dixa.com', target: '_blank', rel: 'noreferrer' },
              'Dixa'
            ),
            '!',
          ]),
        ]),
      },
      {
        feature: 'inline code',
        adf: inlineCodeAdf,
        expectedComponent: h('div', h('p', ['Hello ', h('code', 'code'), '.'])),
      },
      {
        feature: 'code block',
        adf: codeBlockAdf,
        expectedComponent: h('div', [
          h('p', 'Code follows.'),
          h('pre', h('code', '10 PRINT "hah hah"\n20 GOTO 10')),
        ]),
      },
      {
        feature: 'unordered lists',
        adf: bulletListAdf,
        expectedComponent: h('div', [
          h('ul', [
            h('li', h('p', 'one')),
            h('li', h('p', 'two')),
            h('li', h('p', 'nine')),
          ]),
        ]),
      },
      {
        feature: 'ordered lists',
        adf: orderedListAdf,
        expectedComponent: h('div', [
          h('ol', [
            h('li', h('p', 'one')),
            h('li', h('p', 'two')),
            h('li', h('p', 'nine')),
          ]),
        ]),
      },
    ];

  it.each(tests)('should support $feature', (test) => {
    const wrap = (component: VNode | string) =>
      mount({
        render: () => component,
      });
    expect(wrap(formatAdf(test.adf, vueFormatter)).html()).toEqual(
      wrap(test.expectedComponent).html()
    );
  });
});
