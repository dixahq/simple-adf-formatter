/**
 * @jest-environment jsdom
 */
import { formatAdf, jsxFormatter } from '../src';
import React from 'react';
import { create as render } from 'react-test-renderer';
import { textMarkupAdf } from './adf.fixtures';

describe(`ADF parsing`, () => {
  it('should support text markup', () => {
    const expectedJsx = (
      <div>
        <p>
          <span>regular</span>
          <br />
          <i>
            <span>italic</span>
          </i>
          <br />
          <u>
            <span>underlined</span>
          </u>
          <br />
          <span style={{ textDecoration: 'line-through' }}>
            <span>strikethrough</span>
          </span>
          <br />
          <b>
            <span>bold</span>
          </b>
          <br />
          <span>sub</span>
          <sub>
            <span>script</span>
          </sub>
          <br />
          <span>super</span>
          <sup>
            <span>script</span>
          </sup>
          <br />
          <span style={{ textDecoration: 'line-through' }}>
            <b>
              <i>
                <span>eve</span>
              </i>
            </b>
          </span>
          <sub>
            <span style={{ textDecoration: 'line-through' }}>
              <b>
                <i>
                  <span>ry</span>
                </i>
              </b>
            </span>
          </sub>
          <span style={{ textDecoration: 'line-through' }}>
            <b>
              <i>
                <span>thi</span>
              </i>
            </b>
          </span>
          <sup>
            <span style={{ textDecoration: 'line-through' }}>
              <b>
                <i>
                  <span>ng</span>
                </i>
              </b>
            </span>
          </sup>
        </p>
      </div>
    );

    const result = formatAdf(textMarkupAdf, jsxFormatter);
    expect(render(result).toJSON()).toEqual(render(expectedJsx).toJSON());
  });
});
