import { Tree, formatFiles, names, getProjects, generateFiles, joinPathFragments, installPackagesTask } from '@nrwl/devkit';
import { addExportsToBarrel } from '../../utils';

const normalizeOptions = (tree: Tree, schema: any) => {
  const extraNames = names(schema.name);
  const projects = getProjects(tree);
  const project = projects.get(schema.lib);
  const { sourceRoot, projectType } = project;
  const moduleName = `use${extraNames.className}`;

  return {
    ...schema,
    ...extraNames,
    sourceRoot,
    projectType,
    moduleName,
    modulePath: `./lib/${moduleName}/${moduleName}`,
    indexFilePath: `${project.sourceRoot}${schema.lib === 'client' ? '/hooks' : ''}/index.ts`,
    filesPath: `${project.sourceRoot}${schema.lib === 'client' ? '/hooks' : ''}/lib`,
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
