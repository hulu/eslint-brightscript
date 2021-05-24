const rule = require("../dist/rules").rules["onkeyevent-boolean-return-type"];
const RuleTester = require("eslint").RuleTester;

test("no-non-onkeyevent-boolean-return-type defined", () => {
    expect(rule !== undefined);
});

let tester = new RuleTester({
    parser: require.resolve("@hulu/eslint-parser-brightscript"),
});

tester.run("no-non-onkeyevent-boolean-return-type", rule, {
    valid: [
        {
            code: `function onKeyEvent(key as string, press as boolean) as boolean 
                    return true
                end function`,
        },
    ],
    invalid: [
        {
            code: `function onKeyEvent(key as string, press as boolean) as dynamic 
                    return true
                end function`,
            errors: [{ messageId: "onKeyEventBooleanReturnTypeId" }],
        },
        {
            code: `function onKeyEvent(key as string, press as boolean)
                    return true
                end function`,
            errors: [{ messageId: "onKeyEventBooleanReturnTypeId" }],
        },
        {
            code: `function onKeyEvent(key as string, press as boolean) as object
                    return true
                end function`,
            errors: [{ messageId: "onKeyEventBooleanReturnTypeId" }],
        },
    ],
});
