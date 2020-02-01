/*
 * @author chaolin.jcl 宜鑫
 * @date 2018/08/18
 * @description
 */
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import * as mkdirp from 'mkdirp';

const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf-8').replace(/^\ufeff/, '');
};

const writeFile = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
  } else {
    throw new Error(`${filePath} existed !!!`);
  }
  mkdirp.sync(path.dirname(filePath));
};

const isExisted = (configFile: string) => {
  try {
    return fs.statSync(configFile).isFile();
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
};

const logSuccess = (msg: string) => {
  console.log(`${chalk.black.bgGreen('SUCCESS')}: ${msg}`);
};

const logError = (msg: string) => {
  console.log(`${chalk.black.bgRed('ERROR')}: ${msg}`);
};

const convertToString = input => {
  if (input) {
    if (typeof input === 'string') {
      return input;
    }

    return String(input);
  }
  return '';
};

const toWords = input => {
  input = convertToString(input);
  var regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
  return input.match(regex);
};

const toCamelCase = inputArray => {
  let result = '';

  for (let i = 0, len = inputArray.length; i < len; i++) {
    const currentStr = inputArray[i];

    let tempStr = currentStr.toLowerCase();

    if (i !== 0) {
      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
    }

    result += tempStr;
  }
  return result;
};

const toCamelCaseString = input => {
  const words = toWords(input);
  return toCamelCase(words);
};

export {
  readFile,
  writeFile,
  isExisted,
  logSuccess,
  logError,
  convertToString,
  toWords,
  toCamelCase,
  toCamelCaseString
};
