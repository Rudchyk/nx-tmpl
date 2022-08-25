import {
  Tree,
  formatFiles,
  names,
  getProjects,
  generateFiles,
  joinPathFragments,
  installPackagesTask,
} from '@nrwl/devkit';
import { camelCase } from 'lodash';

const normalizeOptions = (tree: Tree, schema: any) => {
  const extraNames = names(schema.name);
  const projects = getProjects(tree);
  const project = projects.get('api');
  const { sourceRoot, projectType } = project;
  const fullName = `${extraNames.propertyName}.route`;
  const folderName = 'routes';

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

const addRouteConfiguration = (tree, options) => {
  const { indexFilePath, modulePath } = options;
  console.log(indexFilePath);

  const indexSource = tree.read(indexFilePath, 'utf-8');
  const indicator = `// import`;

  if (indexSource !== null) {
    const importStr = `import '${modulePath}';\n${indicator}`;
    const changes = indexSource.replace(indicator, importStr);
    tree.write(indexFilePath, changes);
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
  await addRouteConfiguration(tree, options);
  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
