// @fileoverview getTemplateVarList
// goes through all of the files in templateWebApp and lists the \{\{vars}}

import fs         from 'node:fs';
import path       from 'node:path';
import {readFile} from 'node:fs/promises';

// goes through the template and finds all {{}} varas
async function findTemplateVars(projectDir) {
  let varSet = new Set();  // sets only add unique elements

  let fileList = getAllFiles(projectDir);

  let fileCount = fileList.length;
  // console.log(`there are ${fileCount} files`);

  // now go through each file and look for template vars

  // negating is faster since there is no look ahead
  const regExp = /{{([^}]+)}}/ig;
  for (let i=0; i<fileCount; ++i) {
    let fileName = fileList[i];
    let matchList = await findInFile(fileName, regExp);
    if (matchList != null) {
      for (let j = 0; j < matchList.length; ++j) {
        varSet.add(matchList[j]);
      }
    }
  }


   // convert set to reverse-sorted array
  let varList = [...varSet].toSorted().toReversed();
  return varList;
}

function getAllFiles(dirPath, listOfFiles=[]) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (file !== '.git') {
      const fullPath = path.join(dirPath, file);

      let stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        listOfFiles = getAllFiles(fullPath, listOfFiles);
      } else if (stat.isFile()) {
        listOfFiles.push(fullPath);
      }
    }
  });

  return listOfFiles;
}


async function findInFile(fileName, regExp) {
  try {
    // specifying 'utf8' returns a string instead of a Buffer
    const data = await readFile(fileName, 'utf8');
    const matchList = [...data.matchAll(regExp)];
    const resultList = matchList.map(m => m[1]);
    // console.log(fileName, 'matches:', resultList);
    return resultList;
  } catch (err) {
    console.error('Error reading file:', err.message);
  }
}


// main entry point for the projectMaker app
async function main() {
  let projectDir = path.resolve('../..');

  console.log(`template variables in ${projectDir}:`);
  let varList = await findTemplateVars(projectDir);

  console.log('  \{\{' + varList.join('}}\n  \{\{') + '}}');
}

main();
