"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @author chaolin.jcl 宜鑫
 * @date 2018/08/18
 * @description
 */
var fs = require("fs");
var path = require("path");
var chalk_1 = require("chalk");
var mkdirp = require("mkdirp");
var readFile = function (filePath) {
    return fs.readFileSync(filePath, 'utf-8').replace(/^\ufeff/, '');
};
exports.readFile = readFile;
var writeFile = function (filePath) {
    if (!fs.existsSync(filePath)) {
    }
    else {
        throw new Error(filePath + " existed !!!");
    }
    mkdirp.sync(path.dirname(filePath));
};
exports.writeFile = writeFile;
var isExisted = function (configFile) {
    try {
        return fs.statSync(configFile).isFile();
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
};
exports.isExisted = isExisted;
var logSuccess = function (msg) {
    console.log(chalk_1.default.black.bgGreen('SUCCESS') + ": " + msg);
};
exports.logSuccess = logSuccess;
var logError = function (msg) {
    console.log(chalk_1.default.black.bgRed('ERROR') + ": " + msg);
};
exports.logError = logError;
var convertToString = function (input) {
    if (input) {
        if (typeof input === 'string') {
            return input;
        }
        return String(input);
    }
    return '';
};
exports.convertToString = convertToString;
var toWords = function (input) {
    input = convertToString(input);
    var regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
    return input.match(regex);
};
exports.toWords = toWords;
var toCamelCase = function (inputArray) {
    var result = '';
    for (var i = 0, len = inputArray.length; i < len; i++) {
        var currentStr = inputArray[i];
        var tempStr = currentStr.toLowerCase();
        if (i !== 0) {
            tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
        }
        result += tempStr;
    }
    return result;
};
exports.toCamelCase = toCamelCase;
var toCamelCaseString = function (input) {
    var words = toWords(input);
    return toCamelCase(words);
};
exports.toCamelCaseString = toCamelCaseString;
//# sourceMappingURL=util.js.map