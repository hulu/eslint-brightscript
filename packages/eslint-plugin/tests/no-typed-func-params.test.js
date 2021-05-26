const rule = require("../dist/rules").rules["no-typed-func-params"];
const RuleTester = require("eslint").RuleTester;

test("no-typed-func-params defined", () => {
    expect(rule !== undefined);
});

let tester = new RuleTester({
    parser: require.resolve("@hulu/eslint-parser-brightscript"),
});

tester.run("no-typed-func-params", rule, {
    valid: [
        {
            code: `
                sub processInput(input) 
                end sub
            `,
        },
        {
            code: `
                sub processDynamicInput(input as dynamic) 
                end sub
            `,
        },
    ],
    invalid: [
        {
            code: `
                sub processString(str as string)
                end sub
            `,
            errors: [{ messageId: "noTypedFuncParamsId" }],
        },
        {
            code: `
                sub processObject(obj as object)
                end sub
            `,
            errors: [{ messageId: "noTypedFuncParamsId" }],
        },
        {
            code: `
                sub processBoolean(bool as boolean)
                end sub
            `,
            errors: [{ messageId: "noTypedFuncParamsId" }],
        },
        {
            code: `
                sub processInt(int as integer)
                end sub
            `,
            errors: [{ messageId: "noTypedFuncParamsId" }],
        },
        {
            code: `
                sub processLongInt(longint as longinteger)
                end sub
            `,
            errors: [{ messageId: "noTypedFuncParamsId" }],
        },
        {
            code: `
                sub processDouble(doub as double)
                end sub
            `,
            errors: [{ messageId: "noTypedFuncParamsId" }],
        },
        {
            code: `
                sub processFloat(flt as float)
                end sub
            `,
            errors: [{ messageId: "noTypedFuncParamsId" }],
        },
    ],
});
