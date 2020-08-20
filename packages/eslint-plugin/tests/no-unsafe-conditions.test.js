const rule = require("../dist/rules").rules["no-unsafe-conditions"];
const RuleTester = require("eslint").RuleTester;

test("no-unsafe-conditions defined", () => {
    expect(rule !== undefined);
});

let tester = new RuleTester({
    parser: require.resolve('@hulu/eslint-parser-brightscript')
});

tester.run("no-unsafe-conditions", rule, {
    valid: [
        // With variables and compound expressions start
        {
            code: `
                if blah = invalid then
                end if
            `,
        },
        {
            code: `
                if blah = invalid or foo = false then
                end if
            `,
        },
        {
            code: `
                if blah = invalid and foo = false then
                end if
            `,
        },
        {
            code: `
                if blah = invalid then
                else if foo = invalid then
                end if
            `,
        },
        {
            code: `
                if blah = invalid and (foo = 3 or barf <> invalid) then
                end if
            `,
        },
        // With variables and compound expressions end

        // handles nested conditions
        {
            code: `
                if blah = true then
                    a = 3
                    if foo = 3 then
                    end if
                end if
            `,
        },
        // Unary
        {
            code: `
                if not (blah = true) then
                end if
            `,
        },

        // DottedGet
        {
            code: `
                if obj.blah = true then
                end if
            `,
        },

        // IndexedGet
        {
            code: `
                if obj[0] = true then
                end if
            `,
        },

        // Call
        {
            code: `
                if someFunc() = true then
                end if
            `,
        },
        {
            code: `
                if blah.someFunc() = true then
                end if
            `,
        },
        {
            code: `
                if blah.foo().someFunc() = true then
                end if
            `,
        },
        {
            code: `
                if blah["someFunc"]() = true then
                end if
            `,
        },
    ],
    invalid: [
        {
            // With variables and compound expressions start
            code: `
                if blah then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },
        {
            code: `
                if blah = invalid or foo then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },
        {
            code: `
                if blah = invalid and foo then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },
        {
            code: `
                if blah = invalid then
                else if foo then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },
        {
            code: `
                if blah = invalid and (foo = 3 or barf) then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },
        // With variables and compound expressions end

        // It handles multiple errors within a single condition
        {
            code: `
                if blah and (foo or barf) then
                end if
            `,
            errors: [
                { messageId: "noUnsafeConditionsId" },
                { messageId: "noUnsafeConditionsId" },
                { messageId: "noUnsafeConditionsId" },
            ],
        },

        // reports nested unsafe conditions
        {
            code: `
                if blah then
                    if bar then
                    end if
                end if
            `,
            errors: [
                { messageId: "noUnsafeConditionsId" },
                { messageId: "noUnsafeConditionsId" }
            ],
        },

        // Unary
        {
            code: `
                if not blah then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },
        {
            code: `
                if not blah.bar then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },
        {
            code: `
                if not blah[bar] then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },

        // DottedGet
        {
            code: `
                if obj.blah then
                    a = obj.blah
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },

        // IndexedGet
        {
            code: `
                if obj[0] then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },

        // Call
        {
            code: `
                if someFunc() then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },
        {
            code: `
                if blah.someFunc() then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },
        {
            code: `
                if blah.someFunc().AnotherFunc() then
                end if
            `,
            errors: [{ messageId: "noUnsafeConditionsId" }],
        },

        // stress test
        {
            code: `
                if blah or some.other.Func() and obj[0].this or barf.barf.barf then
                else if barf["barf"]().what = true and not (not (oneMoreError)) then
                    a = (dontReportMe = please)
                end if
            `,
            errors: [
                { messageId: "noUnsafeConditionsId" },
                { messageId: "noUnsafeConditionsId" },
                { messageId: "noUnsafeConditionsId" },
                { messageId: "noUnsafeConditionsId" },
                { messageId: "noUnsafeConditionsId" },
            ],
        },

    ],
});
