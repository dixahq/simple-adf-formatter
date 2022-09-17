/**
 * @jest-environment jsdom
 */
import { ADFEntity, formatAdf, jsxFormatter } from '../src';
import React from 'react';
import { create as render } from 'react-test-renderer';
import {
  blockquoteAdf,
  bulletListAdf,
  headingsAdf,
  inlineCodeAdf,
  linkAdf,
  orderedListAdf,
  textMarkupAdf,
} from './adf.fixtures';

describe(`JSX formatting`, () => {
  it('should support quotes', () => {
    const expectedJsx = (
      <div>
        <p>A quote follows.</p>
        <blockquote>
          <p>Honk</p>
        </blockquote>
        <p>The end.</p>
      </div>
    );
    const result = formatAdf(blockquoteAdf, jsxFormatter);
    expect(render(result as JSX.Element).toJSON()).toEqual(
      render(expectedJsx).toJSON()
    );
  });

  it('should support headings', () => {
    const expectedJsx = (
      <div>
        <h1>Heading 1</h1>
        <p>Text 1</p>
        <h2>Heading 2</h2>
        <p>Text 1.1</p>
        <h3>Heading 3</h3>
        <p>Text 1.1.1</p>
        <h4>Heading 4</h4>
        <p>Text 1.1.1.1</p>
        <p>Text 1.1.1.2</p>
        <h5>Heading 5</h5>
        <p>Text 1.1.1.1.1</p>
        <h6>Heading 6</h6>
        <p>Text 1.1.1.1.1.1</p>
      </div>
    );

    const result = formatAdf(headingsAdf, jsxFormatter);
    expect(render(result as JSX.Element).toJSON()).toEqual(
      render(expectedJsx).toJSON()
    );
  });

  it('should support text markup', () => {
    const expectedJsx = (
      <div>
        <p>
          regular
          <br />
          <i>italic</i>
          <br />
          <u>underlined</u>
          <br />
          <span style={{ textDecoration: 'line-through' }}>strikethrough</span>
          <br />
          <b>bold</b>
          <br />
          sub
          <sub>script</sub>
          <br />
          super
          <sup>script</sup>
          <br />
          <span style={{ textDecoration: 'line-through' }}>
            <b>
              <i>eve</i>
            </b>
          </span>
          <sub>
            <span style={{ textDecoration: 'line-through' }}>
              <b>
                <i>ry</i>
              </b>
            </span>
          </sub>
          <span style={{ textDecoration: 'line-through' }}>
            <b>
              <i>thi</i>
            </b>
          </span>
          <sup>
            <span style={{ textDecoration: 'line-through' }}>
              <b>
                <i>ng</i>
              </b>
            </span>
          </sup>
        </p>
      </div>
    );

    const result = formatAdf(textMarkupAdf, jsxFormatter);
    expect(render(result as JSX.Element).toJSON()).toEqual(
      render(expectedJsx).toJSON()
    );
  });

  it('should support links', () => {
    // Stop prettier from including line breaks and {' '} which changes the resulting JSX
    // prettier-ignore
    const expectedJsx = (
      <div>
        <p>Go to <a href="https://dixa.com" target="_blank" rel="noreferrer">Dixa</a>!</p>
      </div>
    );
    const result = formatAdf(linkAdf, jsxFormatter);
    expect(render(result as JSX.Element).toJSON()).toEqual(
      render(expectedJsx).toJSON()
    );
  });

  it('should support inline code', () => {
    const expectedJsx = (
      <div>
        <p>
          Hello <code>code</code>.
        </p>
      </div>
    );
    const result = formatAdf(inlineCodeAdf, jsxFormatter);
    expect(render(result as JSX.Element).toJSON()).toEqual(
      render(expectedJsx).toJSON()
    );
  });

  it('should support bullet lists', () => {
    const expectedJsx = (
      <div>
        <ul>
          <li>
            <p>one</p>
          </li>
          <li>
            <p>two</p>
          </li>
          <li>
            <p>nine</p>
          </li>
        </ul>
      </div>
    );
    const result = formatAdf(bulletListAdf, jsxFormatter);
    expect(render(result as JSX.Element).toJSON()).toEqual(
      render(expectedJsx).toJSON()
    );
  });

  it('should support numbered lists', () => {
    const expectedJsx = (
      <div>
        <ol>
          <li>
            <p>one</p>
          </li>
          <li>
            <p>two</p>
          </li>
          <li>
            <p>nine</p>
          </li>
        </ol>
      </div>
    );
    const result = formatAdf(orderedListAdf, jsxFormatter);
    expect(render(result as JSX.Element).toJSON()).toEqual(
      render(expectedJsx).toJSON()
    );
  });

  it('should support code blocks', () => {
    const adf: ADFEntity = {
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
              text: 'Hello World',
            },
          ],
        },
      ],
    };
    const expectedJsx = (
      <div>
        <p>Code follows.</p>
        <pre>
          <code>Hello World</code>
        </pre>
      </div>
    );
    const result = formatAdf(adf, jsxFormatter);
    expect(render(result as JSX.Element).toJSON()).toEqual(
      render(expectedJsx).toJSON()
    );
  });
});
