import * as inquery from 'inquirer';
import * as os from 'os';

import { generateTmpl } from './generate';
import { loadConfigFile, getConfigFromDir } from './getConfig';
import { logError } from './util';

module.exports = () => {
  const cfg = getConfigFromDir(process.cwd()) || getConfigFromDir(os.homedir());
  if (!cfg) {
    logError('Please write a .snippetrc / .snippetrc.json');
    return false;
  }

  const cfgs = loadConfigFile(cfg);

  const choices = Object.keys(cfgs.snippets)
    .filter(c => cfgs.snippets[c].type !== 'scaffolding')
    .map(c => ({
      name: cfgs.snippets[c].name,
      type: cfgs.snippets[c].type,
      value: c
    }));

  const promptConfigs = [
    {
      name: 'scaffolding',
      type: 'confirm',
      message: 'Do you want to create a scaffolding?'
    },
    {
      name: 'name',
      type: 'input',
      message: 'Please input your name for scaffolding',
      when: value => {
        if (value.scaffolding === true) return true;
        return false;
      },
      validate: value => {
        const match = value.match(/^[_a-zA-Z][_a-zA-Z0-9]*$/);
        return match ? true : 'Please input right name';
      }
    },
    {
      name: 'snippet',
      type: 'list',
      message: 'Please choose your snippet you want to generate',
      when: value => {
        if (value.scaffolding === false) return true;
        return false;
      },
      choices
    },
    {
      name: 'filename',
      type: 'input',
      message: 'Please input your template filename',
      when: value => {
        if (value.scaffolding === false) return true;
        return false;
      },
      validate: value => {
        const match = value.match(/^[_.a-zA-Z][_.a-zA-Z0-9]*$/);
        return match ? true : 'Please input right file name';
      }
    },
    {
      name: 'name',
      type: 'input',
      message: 'Please input your template variable replace ( {{}} )',
      when: value => {
        if (value.scaffolding === false) return true;
        return false;
      },
      validate: value => {
        const match = value.match(/^[_a-zA-Z][_a-zA-Z0-9]*$/);
        return match ? true : 'Please input right variable name';
      }
    }
  ];

  inquery
    .prompt(promptConfigs)
    .then(({ scaffolding, snippet, name, filename }) => {
      if (scaffolding) {
        snippet = 'scaffolding';
      }
      const { templates, type } = cfgs.snippets[snippet];
      if (type === 'scaffolding') {
        Object.keys(templates).map(key => {
          const template = templates[key];
          generateTmpl(
            template.snippet,
            name,
            template.target,
            null,
            template.suffix
          );
        });
      } else {
        const { template, target } = cfgs.snippets[snippet];
        generateTmpl(template, name, target, filename);
      }
    });
};
