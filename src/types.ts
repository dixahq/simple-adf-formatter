export type ADFNodeType =
  | 'doc'
  | 'blockquote'
  | 'bulletList'
  | 'codeBlock'
  | 'emoji'
  | 'hardBreak'
  | 'heading'
  | 'inlineCard'
  | 'listItem'
  | 'mediaGroup'
  | 'mediaSingle'
  | 'mention'
  | 'orderedList'
  | 'panel'
  | 'paragraph'
  | 'rule'
  | 'table'
  | 'tableCell'
  | 'tableHeader'
  | 'tableRow'
  | 'text';

export type ADFMarkType =
  | 'code'
  | 'em'
  | 'link'
  | 'strike'
  | 'strong'
  | 'subsup'
  | 'textColor'
  | 'underline';

export interface ADFEntityMark {
  type: ADFMarkType;
  attrs?: {
    [name: string]: string;
  };
}

export interface ADFEntity {
  type: ADFNodeType;
  attrs?: {
    [name: string]: unknown;
  };
  content?: Array<ADFEntity>;
  marks?: Array<ADFEntityMark>;
  text?: string;
  [key: string]: any;
}

export type MarkMapper<T> = (
  mark: ADFEntityMark,
  next: () => T,
  parent: ADFEntity,
  nodeIdx: number,
  markIdx: number,
) => T;
export type NodeMapper<T> = (node: ADFEntity, processChildren: () => T[], siblingIdx: number) => T;
export type Formatter<T> = {
  default: NodeMapper<T>;
  nodes: {
    [nodeType in ADFNodeType]?: NodeMapper<T>;
  };
  marks: {
    [nodeType in ADFNodeType]?: {
      [markType in ADFMarkType]?: MarkMapper<T>;
    };
  };
};
