const rule = require("../dist/rules/").rules["no-is-valid"];
const RuleTester = require("eslint").RuleTester;

test('no-is-valid defined', () => {
    expect(rule !== undefined);
});

let tester = new RuleTester({
    parser: require.resolve('@hulu/eslint-parser-brightscript')
});

tester.run('no-is-valid', rule, {
    valid: [
        {
            code: "x = invalid",
        }
    ],
    invalid: [
        {
            code: "a = isValid(false)",
            errors: [{ messageId: "noIsValidId" }]
        }
    ]
});
