import { parser } from "brs";
type Call = parser.Expr.Call;

export let noIsValid = {
    meta: {
        type: "problem",
        messages: {
            noIsValidId: "Do not use isValid check."
        },
        docs: {
            description: "isValid() is slow. Use operator <> instead. ie 'x <> invalid'.",
            category: "Possible Errors",
            recommended: true,
            url: ""
        },
        fixable: "code",
        schema: [] // no options
    },
    create: function(context: any) {
        return {
            Call: function(node: Call) {
                let name = node.callee as parser.Expr.Variable;

                if (name?.name?.text.toLowerCase() === "isvalid") {
                    context.report({
                        node,
                        messageId: "noIsValidId"
                    });
                }
            }
        }
    }
}
