import { parser, types } from "brs";
type Function = parser.Stmt.Function;
const ValueKind = types.ValueKind;

export let onKeyEventBooleanReturnType = {
    meta: {
        type: "problem",
        messages: {
            onKeyEventBooleanReturnTypeId: "onKeyEvent function should return a boolean type.",
        },
        docs: {
            description: "onKeyEvent function should return a boolean type.",
            category: "Possible Errors",
            recommended: true,
            url: "",
        },
        fixable: "code",
        schema: [], // no options
    },
    create: function (context: any) {
        return {
            Stmt_Function: function (node: Function) {
                if (
                    node.name.text.toLowerCase() === "onkeyevent" &&
                    node.func.returns !== ValueKind.Boolean
                ) {
                    context.report({
                        node,
                        messageId: "onKeyEventBooleanReturnTypeId",
                    });
                }
            },
        };
    },
};
