import { findNodes } from '@nrwl/workspace/src/utilities/typescript/find-nodes';
import { SyntaxKind } from 'typescript';
import { ChangeType } from '@nrwl/devkit';

export const addImport = (source: any, statement: any): any => {
  const allImports = findNodes(source, SyntaxKind.ImportDeclaration);
  if (allImports.length > 0) {
    const lastImport = allImports[allImports.length - 1];
    return [
      {
        type: ChangeType.Insert,
        index: lastImport.end + 1,
        text: `\n${statement}\n`,
      },
    ];
  }
  return [
    {
      type: ChangeType.Insert,
      index: 0,
      text: `\n${statement}\n`,
    },
  ];
};

export default addImport;
