import { Tree, formatFiles, names, getProjects, generateFiles, joinPathFragments, installPackagesTask } from '@nrwl/devkit';
import { camelCase, capitalize } from 'lodash';
import { addExportsToBarrel } from '../../utils';

const normalizeOptions = (tree: Tree, schema: any) => {
  const extraNames = names(schema.name);
  const projects = getProjects(tree);
  const project = projects.get('constants');
  const { sourceRoot, projectType } = project;
  const isEnum = schema.type === 'enum';
  const fullName = `${isEnum ? extraNames.className : extraNames.propertyName}.${schema.type}`;

  return {
    ...schema,
    ...extraNames,
    sourceRoot,
    projectType,
    fullName,
    enumName: `${extraNames.className}Enum`,
    modulePath: `./lib/${fullName}`,
    indexFilePath: `${project.sourceRoot}/index.ts`,
    filesPath: `${project.sourceRoot}/lib`,
  };
};

export default async function (tree: Tree, schema: any) {
  const options = normalizeOptions(tree, schema);

  await generateFiles(tree, joinPathFragments(__dirname, `./files-${options.type}`), options.filesPath, { ...options, tmpl: '' });
  await addExportsToBarrel(tree, options);
  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
