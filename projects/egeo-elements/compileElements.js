const fs = require('fs');
const {
   execSync
} = require('child_process');

const projects = ['egeo-library'];

projects.forEach(project => {
   const components = fs.readdirSync(`src/${project}`);

   console.log(`\nCompiling "${project}":\n`);

   components.forEach(component => compileComponent(project, component));
});

function compileComponent(project, component) {

   let blackListComponents = [];

   if (blackListComponents.indexOf(component) === -1) {
      console.log(`\t- ${component}`);
      const buildJsFiles = `ng run egeo-elements:build:production --aot --main='projects/egeo-elements/src/${project}/${component}/compile.ts'`;

      //remove polyfill if not needed
      const bundleIntoSingleFileES5 = `cat dist/tmp/runtime-es5.js dist/tmp/polyfills-es5.js  dist/tmp/main-es5.js > dist/tmp/${component}-es5.js`;
      const copyBundledComponentES5 = `cp dist/tmp/${component}-es5.js dist/components/`;

      const bundleIntoSingleFileES2015 = `cat dist/tmp/runtime-es2015.js dist/tmp/polyfills-es2015.js dist/tmp/main-es2015.js > dist/tmp/${component}-es2015.js`;
      const copyBundledComponentES2015 = `cp dist/tmp/${component}-es2015.js dist/components/`;

      execSync(`${buildJsFiles} && ${bundleIntoSingleFileES5} && ${copyBundledComponentES5} && ${bundleIntoSingleFileES2015} && ${copyBundledComponentES2015}`);
   }
}
