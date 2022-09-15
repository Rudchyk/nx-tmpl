import { Tree, formatFiles, names, getProjects, generateFiles, joinPathFragments, installPackagesTask } from '@nrwl/devkit';
import { addExportsToBarrel } from '../../utils/nx/addExportsToBarrel';

const normalizeOptions = (tree: Tree, schema: any) => {
  const extraNames = names(schema.name);
  const projects = getProjects(tree);
  const project: any = projects.get('client');
  const { sourceRoot, projectType } = project;
  const moduleName = `${extraNames.className}Form`;

  return {
    ...schema,
    ...extraNames,
    sourceRoot,
    projectType,
    moduleName,
    modulePath: `./lib/${moduleName}/${moduleName}`,
    indexFilePath: `${project.sourceRoot}/forms/index.ts`,
    filesPath: `${project.sourceRoot}/forms/lib`,
    enumName: `${moduleName}InputsEnum`,
    enumPath: `libs/constants/src/lib/Forms.enums.ts`,
    interfaceName: `${moduleName}Inputs`,
    interfacePath: `libs/interfaces/src/lib/Forms.interface.ts`,
  };
};

const addFormsEnumConfiguration = (tree, options) => {
  const { enumPath, enumName } = options;
  const enumSource = tree.read(enumPath, 'utf-8');

  if (enumSource !== null) {
    const enumStr = `
export enum ${enumName} {
  TEXT = 'text',
}
`.trim();
    const changes = `${enumSource}\n${enumStr}`;
    tree.write(enumPath, changes);
  }
};

const addFormsInterfaceConfiguration = (tree, options) => {
  const { interfacePath, interfaceName, enumName } = options;
  const interfaceSource = tree.read(interfacePath, 'utf-8');
  const enumIndicator = '// enum';

  if (interfaceSource !== null) {
    const enumStr = `${enumIndicator}\n ${enumName},\n  `;
    const interfaceStr = `
export interface ${interfaceName} {
  [${enumName}.TEXT]: string;
}`.trim();
    let changes = interfaceSource.replace(enumIndicator, enumStr);
    changes = `${changes}\n ${interfaceStr}`;
    tree.write(interfacePath, changes);
  }
};

export default async function (tree: Tree, schema: any) {
  const options = normalizeOptions(tree, schema);

  await generateFiles(tree, joinPathFragments(__dirname, './files'), options.filesPath, { ...options, tmpl: '' });
  await addExportsToBarrel(tree, options);
  await addFormsEnumConfiguration(tree, options);
  await addFormsInterfaceConfiguration(tree, options);
  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
