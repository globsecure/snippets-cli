/*
 * @author chaolin.jcl 宜鑫
 * @date 2018/08/18
 * @description
 */
/**
 * Generate Templates
 * @param tmpl
 * @param target
 */
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

import { readFile, isExisted, logSuccess, logError, toCamelCase } from './util';

const generateTmpl = (
  tmpl: string,
  name: string,
  target: string,
  filename?: string,
  suffix?: string
) => {
  const tmplPath = path.resolve(tmpl);
  const tmplFileName = path.basename(tmpl);
  const fileExt = tmplFileName.substring(
    tmplFileName.indexOf('.'),
    tmplFileName.lastIndexOf('.')
  );
  if (!isExisted(tmplPath)) {
    logError(`no such template file ${tmpl}`);
    return false;
  }

  if (filename === null) {
    filename = name;
  }

  filename = `${filename}${suffix}`;

  const tmplContent = readFile(tmplPath);
  // {{  }} 替换掉
  var result = tmplContent.replace(/\{\{(.*?)\}\}/g, name);

  const outputFile = path.resolve(target, `${filename}${fileExt}`);
  if (isExisted(outputFile)) {
    // create dir if not existed
    logError(`${target} file existed`);
    return false;
  }
  try {
    mkdirp.sync(path.dirname(outputFile));
    fs.writeFileSync(outputFile, result, 'utf-8');
  } catch (e) {
    logError(`${name} ${e} `);
    return false;
  }
  logSuccess(`${name} generated in `);
  return true;
};

export { generateTmpl };
