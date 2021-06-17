"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.parseForESLint = void 0;
const brs_1 = require("brs");
function parseForESLint(code, options) {
    return {
        ast: parse(code, options),
        services: function () {
            console.log("@hulu/eslint-parser-brightscript invoked");
        },
        scopeManager: null,
        visitorKeys: null,
    };
}
exports.parseForESLint = parseForESLint;
function parse(code, options) {
    let manifest = brs_1.preprocessor.getManifestSync(process.cwd());
    let scanResults = brs_1.lexer.Lexer.scan(code, options.filePath);
    let pp = new brs_1.preprocessor.Preprocessor();
    let preprocessorResults = pp.preprocess(scanResults.tokens, manifest);
    let ast = brs_1.parser.Parser.parse(preprocessorResults.processedTokens).statements;
    return {
        type: "Program",
        sourceType: "script",
        body: ast,
        tokens: [],
        comments: scanResults.comments,
        loc: [],
        parent: null,
        range: [],
    };
}
exports.parse = parse;
