import { parser, types } from "brs";
type Function = parser.Stmt.Function;
const ValueKind = types.ValueKind;

export let noTypedFuncParams = {
    meta: {
        type: "suggestion",
        messages: {
            noTypedFuncParamsId:
                "Function signature contains strongly typed parameters. Roku can crash on type coercion if the function inputs don't match the specified types.",
        },
        docs: {
            description:
                "Function signature contains strongly typed parameters. Roku can crash on type coercion if the function inputs don't match the specified types.",
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
                node.func.parameters.forEach((param) => {
                    if (param.type.kind !== ValueKind.Dynamic) {
                        context.report({
                            loc: param.location,
                            messageId: "noTypedFuncParamsId"
                        });
                    }
                });
            },
        };
    },
};
