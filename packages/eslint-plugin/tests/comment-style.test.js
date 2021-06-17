const rule = require("../dist/rules/").rules["comment-style"];
const RuleTester = require("eslint").RuleTester;

test("comment-style defined", () => {
    expect(rule !== undefined);
});

let tester = new RuleTester({
    parser: require.resolve("@hulu/eslint-parser-brightscript"),
});

tester.run("comment-style", rule, {
    valid: [
        {
            code: "' lorem ipsum",
            options: ["'"],
        },
        {
            code: "rem lorem ipsum",
            options: ["rem"],
        },
        {
            code: "Rem lorem ipsum",
            options: ["Rem"],
        },
        {
            code: "REM lorem ipsum",
            options: ["REM"],
        },
    ],
    invalid: [
        ...["rem", "Rem", "REM"].map((comment) => ({
            code: `${comment} should start with '`,
            options: ["'"],
            output: `' should start with '`,
            errors: [{ messageId: "commentStyle" }],
        })),
        ...["'", "Rem", "REM"].map((comment) => ({
            code: `${comment} should start with rem`,
            options: ["rem"],
            output: "rem should start with rem",
            errors: [{ messageId: "commentStyle" }],
        })),
        ...["'", "rem", "REM"].map((comment) => ({
            code: `${comment} should start with Rem`,
            options: ["Rem"],
            output: "Rem should start with Rem",
            errors: [{ messageId: "commentStyle" }],
        })),
        ...["'", "rem", "Rem"].map((comment) => ({
            code: `${comment} should start with REM`,
            options: ["REM"],
            output: "REM should start with REM",
            errors: [{ messageId: "commentStyle" }],
        })),
    ],
});
