"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquery = require("inquirer");
var os = require("os");
var generate_1 = require("./generate");
var getConfig_1 = require("./getConfig");
var util_1 = require("./util");
module.exports = function () {
    var cfg = getConfig_1.getConfigFromDir(process.cwd()) || getConfig_1.getConfigFromDir(os.homedir());
    if (!cfg) {
        util_1.logError('Please write a .snippetrc / .snippetrc.json');
        return false;
    }
    var cfgs = getConfig_1.loadConfigFile(cfg);
    var choices = Object.keys(cfgs.snippets)
        .filter(function (c) { return cfgs.snippets[c].type !== 'scaffolding'; })
        .map(function (c) { return ({
        name: cfgs.snippets[c].name,
        type: cfgs.snippets[c].type,
        value: c
    }); });
    var promptConfigs = [
        {
            name: 'scaffolding',
            type: 'confirm',
            message: 'Do you want to create a scaffolding?'
        },
        {
            name: 'name',
            type: 'input',
            message: 'Please input your name for scaffolding',
            when: function (value) {
                if (value.scaffolding === true)
                    return true;
                return false;
            },
            validate: function (value) {
                var match = value.match(/^[_a-zA-Z][_a-zA-Z0-9]*$/);
                return match ? true : 'Please input right name';
            }
        },
        {
            name: 'snippet',
            type: 'list',
            message: 'Please choose your snippet you want to generate',
            when: function (value) {
                if (value.scaffolding === false)
                    return true;
                return false;
            },
            choices: choices
        },
        {
            name: 'filename',
            type: 'input',
            message: 'Please input your template filename',
            when: function (value) {
                if (value.scaffolding === false)
                    return true;
                return false;
            },
            validate: function (value) {
                var match = value.match(/^[_.a-zA-Z][_.a-zA-Z0-9]*$/);
                return match ? true : 'Please input right file name';
            }
        },
        {
            name: 'name',
            type: 'input',
            message: 'Please input your template variable replace ( {{}} )',
            when: function (value) {
                if (value.scaffolding === false)
                    return true;
                return false;
            },
            validate: function (value) {
                var match = value.match(/^[_a-zA-Z][_a-zA-Z0-9]*$/);
                return match ? true : 'Please input right variable name';
            }
        }
    ];
    inquery
        .prompt(promptConfigs)
        .then(function (_a) {
        var scaffolding = _a.scaffolding, snippet = _a.snippet, name = _a.name, filename = _a.filename;
        if (scaffolding) {
            snippet = 'scaffolding';
        }
        var _b = cfgs.snippets[snippet], templates = _b.templates, type = _b.type;
        if (type === 'scaffolding') {
            Object.keys(templates).map(function (key) {
                var template = templates[key];
                generate_1.generateTmpl(template.snippet, name, template.target, null, template.suffix);
            });
        }
        else {
            var _c = cfgs.snippets[snippet], template = _c.template, target = _c.target;
            generate_1.generateTmpl(template, name, target, filename, null);
        }
    });
};
//# sourceMappingURL=cli.js.map