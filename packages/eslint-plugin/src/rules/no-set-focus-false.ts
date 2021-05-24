import { parser } from "brs";
type Call = parser.Expr.Call;
import { types } from "brs";

export let noSetFocusFalse = {
    meta: {
        type: "problem",
        messages: {
            noSetFocusFalseId:
                "Don't use setFocus(false). It can cause focus issues within the firmware/runtime.",
        },
        docs: {
            description:
                "Don't use setFocus(false). It can cause focus issues within the firmware/runtime.",
            category: "Possible Errors",
            recommended: true,
            url: "",
        },
        fixable: "code",
        schema: [], // no options
    },
    create: function (context: any) {
        return {
            Call: function (node: Call) {
                let name = node.callee as parser.Expr.Variable;

                if (name?.name?.text.toLowerCase() === "setfocus" && node.args.length) {
                    let arg = node.args[0] as parser.Expr.Literal;
                    if (!arg || !arg.value || !types.isBrsBoolean(arg.value)) return;
                    if (arg.value.toBoolean().valueOf()) return;
                    context.report({
                        node,
                        messageId: "noSetFocusFalseId",
                    });
                }
            },
        };
    },
};
