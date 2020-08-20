import { parser, lexer } from "brs";
type IfStmt = parser.Stmt.If;
type ElseIfStmt = parser.Stmt.ElseIf;
type BlockStmt = parser.Stmt.Block;
type Expression = parser.Expr.Expression;
let lexeme = lexer.Lexeme;

export let noUnsafeConditions = {
    meta: {
        type: "problem",
        messages: {
            noUnsafeConditionsId:
                "Variables in conditon expressions should be explicity compared to a value.",
        },
        docs: {
            description:
                "Variables in conditon expressions should be explicity compared to a value.",
            category: "Possible Errors",
            recommended: true,
            url: "",
        },
        fixable: "code",
        schema: [], // no options
    },
    create(context: any) {
        let inCondition = false;

        function inBinaryExpression(node: any) {
            return node.parent?.type === "Binary"
        }

        function isBooleanBinaryExpression(node: any) {
            return node.token.kind === lexeme.And ||
                node.token.kind === lexeme.Or;
        }

        function reportIfUnsafeExpression(node: Expression) {
            if (!inCondition) return;

            let parentType = node.parent?.type || "";
            if (
                parentType === "DottedGet" ||
                parentType === "IndexedGet" ||
                parentType === "Call"
            ) {
                return null; // defer validation to parent node
            }

            if (inBinaryExpression(node)) {
                if (!isBooleanBinaryExpression(node.parent)) {
                    return null; // safer
                }
            }

            returnContextReport(context, node);
        }

        return {
            If(node: IfStmt) { inCondition = true; },
            "If:exit": (node: any) => { inCondition = false; },

            ElseIf(node: ElseIfStmt) { inCondition = true; },
            "ElseIf:exit": (node: any) => {inCondition = false; },

            Block(node: BlockStmt) { inCondition = false; },

            Variable(node: Expression) {
                return reportIfUnsafeExpression(node);
            },

            DottedGet(node: Expression) {
                return reportIfUnsafeExpression(node);
            },

            IndexedGet(node: Expression) {
                return reportIfUnsafeExpression(node);
            },

            Call(node: Expression) {
                return reportIfUnsafeExpression(node);
            },
        };
    },
};

function returnContextReport(context: any, node: parser.Expr.Expression) {
    return context.report({
        node,
        messageId: "noUnsafeConditionsId",
    });
}
