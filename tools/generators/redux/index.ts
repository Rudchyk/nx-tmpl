import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  joinPathFragments,
  names,
  getProjects,
  readJson,
  applyChangesToString,
  ChangeType,
} from '@nrwl/devkit';
import { createSourceFile, ScriptTarget, SyntaxKind } from 'typescript';
import { findNodes } from '@nrwl/workspace/src/utilities/typescript/find-nodes';

const addImport = (source: any, statement: any): any => {
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

const normalizeOptions = (tree: Tree, schema: any) => {
  const extraNames = names(schema.name);
  const projects = getProjects(tree);
  const project = projects.get(schema.project);

  if (!project) {
    console.error(`${project} does not exist`);

    return;
  }

  const { sourceRoot, projectType } = project;

  return {
    ...schema,
    ...extraNames,
    sourceRoot,
    projectType,
    indexFilePath: `${project.sourceRoot}/store/slices/index.ts`,
    reducersFilePath: `${project.sourceRoot}/store/reducers.ts`,
    modulePath: `./lib/${extraNames.name}.slice`,
    filesPath: `${project.sourceRoot}/store/slices/lib`,
    directory: '',
  };
};

const addExportsToBarrel = (tree, { indexFilePath, modulePath }) => {
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

const addStoreConfiguration = (tree, options) => {
  const { reducersFilePath } = options;
  const reducersSource = tree.read(reducersFilePath, 'utf-8');
  const names = {
    constant: `${options.constantName}_KEY`,
    state: `${options.className}State`,
    reducer: `${options.propertyName}Reducer`,
  };
  const indicators = {
    defaultImports: `// default-imports`,
    imports: `// imports`,
    state: `// state`,
    reducer: `// reducers`,
  };

  if (reducersSource !== null) {
    const importsStr = `${names.constant},\n  ${names.state},\n  ${names.reducer},\n  ${indicators.imports}`;
    const defaultImportsStr = `import {\n${importsStr}\n} from './slices';`;
    const stateStr = `[${names.constant}]: ${names.state},\n  ${indicators.state}`;
    const reducerStr = `[${names.constant}]: ${names.reducer},\n  ${indicators.reducer}`;
    const changes = reducersSource
      .replace(indicators.imports, importsStr)
      .replace(indicators.state, stateStr)
      .replace(indicators.reducer, reducerStr)
      .replace(indicators.defaultImports, defaultImportsStr);
    tree.write(reducersFilePath, changes);
  }
};

export default async function (tree: Tree, schema: any) {
  const options = normalizeOptions(tree, schema);
  await generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    options.filesPath,
    { ...options, tmpl: '' }
  );
  await addExportsToBarrel(tree, options);
  await addStoreConfiguration(tree, options);
  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
