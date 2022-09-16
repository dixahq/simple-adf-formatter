import { ADFEntity } from '../dist';
import { formatAdf, jsxFormatter } from '../src';
import React from 'react';
//import { create as render } from 'react-test-renderer';


describe(`ADF parsing`, () => {
  it('should support text markup', () => {
    const adf: ADFEntity = {
      version: 1,
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'regular',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'italic',
              marks: [
                {
                  type: 'em',
                },
              ],
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'underlined',
              marks: [
                {
                  type: 'underline',
                },
              ],
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'bold',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'sub',
            },
            {
              type: 'text',
              text: 'script',
              marks: [
                {
                  type: 'subsup',
                  attrs: {
                    type: 'sub',
                  },
                },
              ],
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'super',
            },
            {
              type: 'text',
              text: 'script',
              marks: [
                {
                  type: 'subsup',
                  attrs: {
                    type: 'sup',
                  },
                },
              ],
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'eve',
              marks: [
                {
                  type: 'em',
                },
                {
                  type: 'strong',
                },
              ],
            },
            {
              type: 'text',
              text: 'ry',
              marks: [
                {
                  type: 'em',
                },
                {
                  type: 'strong',
                },
                {
                  type: 'subsup',
                  attrs: {
                    type: 'sub',
                  },
                },
              ],
            },
            {
              type: 'text',
              text: 'thi',
              marks: [
                {
                  type: 'em',
                },
                {
                  type: 'strong',
                },
              ],
            },
            {
              type: 'text',
              text: 'ng',
              marks: [
                {
                  type: 'em',
                },
                {
                  type: 'strong',
                },
                {
                  type: 'subsup',
                  attrs: {
                    type: 'sup',
                  },
                },
              ],
            },
          ],
        },
      ],
    };
    const expectedJsx = (<div>
      <p>
        <span>regular</span>
        <br />
        <i><span>italic</span></i>
        <br />
        <u><span>underlined</span></u>
        <br />
        <b><span>bold</span></b>
        <br />
        <span>sub</span>
        <sub><span>script</span></sub>
        <br />
        <span>super</span>
        <sup><span>script</span></sup>
        <br />
        <b><i><span>eve</span></i></b>
        <sub><b><i><span>ry</span></i></b></sub>
        <b><i><span>thi</span></i></b>
        <sup><b><i><span>ng</span></i></b></sup>
      </p>
      <>FAIL</>
    </div>)
    
   
    const result = formatAdf(adf, jsxFormatter);
    expect(result).toEqual(expectedJsx);
  });

 
});
