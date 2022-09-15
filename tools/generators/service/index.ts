import { Tree, formatFiles, names, getProjects, generateFiles, joinPathFragments, installPackagesTask } from '@nrwl/devkit';
import { addExportsToBarrel } from '../../utils/nx/addExportsToBarrel';

const normalizeOptions = (tree: Tree, schema: any) => {
  const extraNames = names(schema.name);
  const projects = getProjects(tree);
  const project = projects.get('client');
  const { sourceRoot, projectType } = project;

  return {
    ...schema,
    ...extraNames,
    sourceRoot,
    projectType,
    modulePath: `./lib/${extraNames.propertyName}Service/${extraNames.propertyName}.service`,
    indexFilePath: `${project.sourceRoot}/services/index.ts`,
    filesPath: `${project.sourceRoot}/services/lib`,
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
