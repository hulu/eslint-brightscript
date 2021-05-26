import { parser, lexer, preprocessor } from "brs";

export function parseForESLint(code: string, options: object): object {
    return {
        ast: parse(code, options),
        services: function () {
            console.log("@hulu/eslint-parser-brightscript invoked");
        },
        scopeManager: null,
        visitorKeys: null,
    };
}

export function parse(code: string, options: any): object {
    let manifest = preprocessor.getManifestSync(process.cwd());
    let scanResults = lexer.Lexer.scan(code, options.filePath);
    let pp = new preprocessor.Preprocessor();
    let preprocessorResults = pp.preprocess(scanResults.tokens, manifest);
    let ast = parser.Parser.parse(preprocessorResults.processedTokens).statements;

    return {
        type: "Program",
        sourceType: "script",
        body: ast,
        tokens: [],
        comments: [],
        loc: [],
        parent: null,
        range: [],
    };
}
