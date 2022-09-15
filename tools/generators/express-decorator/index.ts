import { Tree, formatFiles, names, getProjects, generateFiles, joinPathFragments, installPackagesTask } from '@nrwl/devkit';
import { camelCase } from 'lodash';
import { addExportsToBarrel } from '../../utils/nx/addExportsToBarrel';

const normalizeOptions = (tree: Tree, schema: any) => {
  const extraNames = names(schema.name);
  const projects = getProjects(tree);
  const project: any = projects.get('api');
  const { sourceRoot, projectType } = project;
  const fullName = `${extraNames.propertyName}.decorator`;
  const folderName = 'decorators';

  return {
    ...schema,
    ...extraNames,
    sourceRoot,
    projectType,
    fullName,
    moduleName: camelCase(fullName),
    modulePath: `./lib/${fullName}`,
    indexFilePath: `${project.sourceRoot}/${folderName}/index.ts`,
    filesPath: `${project.sourceRoot}/${folderName}/lib`,
  };
};

export default async function (tree: Tree, schema: any) {
  const options = normalizeOptions(tree, schema);

  await generateFiles(tree, joinPathFragments(__dirname, './files'), options.filesPath, { ...options, tmpl: '' });
  await addExportsToBarrel(tree, options);
  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
