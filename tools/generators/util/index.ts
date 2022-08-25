import { Tree, formatFiles, names, getProjects, generateFiles, joinPathFragments, installPackagesTask } from '@nrwl/devkit';
import { addExportsToBarrel } from '../../utils';

const normalizeOptions = (tree: Tree, schema: any) => {
  const extraNames = names(schema.name);
  const projects = getProjects(tree);
  const isUtilLib = schema.lib === 'utils';
  const project = projects.get(schema.lib);
  const { sourceRoot, projectType } = project;
  const indexFileDirPath = isUtilLib ? project.sourceRoot : `${project.sourceRoot}/utils`;

  return {
    ...schema,
    ...extraNames,
    sourceRoot,
    projectType,
    modulePath: `./lib/${extraNames.propertyName}/${extraNames.propertyName}`,
    indexFilePath: `${indexFileDirPath}/index.ts`,
    filesPath: `${indexFileDirPath}/lib`,
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
