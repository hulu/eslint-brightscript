const rule = require("../dist/rules/").rules["no-set-focus-false"];
const RuleTester = require("eslint").RuleTester;

test('no-set-focus-false defined', () => {
    expect(rule !== undefined);
});

let tester = new RuleTester({
    parser: require.resolve('@hulu/eslint-parser-brightscript')
})

tester.run('no-set-focus-false', rule, {
    valid: [
        {
            code: "setFocus(true)\nsomeOtherFunction(false)\nm.fooBar(false)"
        }
    ],
    invalid: [
        {
            code: "setFocus(false)",
            errors: [{ messageId: "noSetFocusFalseId" }]
        }
    ]
});
