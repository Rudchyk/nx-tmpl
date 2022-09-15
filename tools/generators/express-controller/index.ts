import { Tree, formatFiles, names, getProjects, generateFiles, joinPathFragments, installPackagesTask } from '@nrwl/devkit';
import { capitalize, camelCase } from 'lodash';
import { addExportsToBarrel } from '../../utils/nx/addExportsToBarrel';

const normalizeOptions = (tree: Tree, schema: any) => {
  const extraNames = names(schema.name);
  const projects = getProjects(tree);
  const project: any = projects.get('api');
  const { sourceRoot, projectType } = project;
  const fullName = `${extraNames.propertyName}${capitalize(schema.group)}.controller`;
  const fileGroup = `${schema.group || 'common'}`;
  const folderName = 'controllers';

  return {
    ...schema,
    ...extraNames,
    sourceRoot,
    projectType,
    fullName,
    fileGroup,
    moduleName: camelCase(fullName),
    modulePath: `./lib/${fileGroup}/${fullName}`,
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
