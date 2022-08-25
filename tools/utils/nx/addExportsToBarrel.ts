import { applyChangesToString } from '@nrwl/devkit';
import { createSourceFile, ScriptTarget } from 'typescript';
import addImport from './addImport';

export const addExportsToBarrel = (tree, { indexFilePath, modulePath }) => {
  const indexSource = tree.read(indexFilePath, 'utf-8');

  if (indexSource !== null) {
    const indexSourceFile = createSourceFile(
      indexFilePath,
      indexSource,
      ScriptTarget.Latest,
      true
    );
    const changes = applyChangesToString(
      indexSource,
      addImport(indexSourceFile, `export * from '${modulePath}';`)
    );
    tree.write(indexFilePath, changes);
  }
};
