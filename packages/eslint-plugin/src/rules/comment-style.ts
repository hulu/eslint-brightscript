import type * as eslint from "eslint";
import type * as brs from "brs";

/**
 * Enforces consistent use of comment starters, e.g. `'` vs `rem`.
 * Unless explicitly configured, defaults to ensure comments begin with a single apostrophe (').
 */
export const commentStyle: eslint.Rule.RuleModule = {
    meta: {
        type: "layout",
        docs: {
            description: "enforce a particular style for all comments",
            category: "Stylistic Issues",
            recommended: true,
        },
        fixable: "whitespace",
        schema: [{ enum: ["'", "rem", "Rem", "REM"] }],
        messages: {
            commentStyle: `Comments must begin with "{{ starter }}"`,
        },
    },
    create(context: eslint.Rule.RuleContext): eslint.Rule.RuleListener {
        const sourceCode = context.getSourceCode();
        const comments = sourceCode.getAllComments() as brs.lexer.Comment[];
        // defaults to ' if not configured
        const preferredStarter = (context.options[0] as string) ?? "'";

        return {
            "Program:exit"() {
                comments.forEach((comment) => {
                    if (comment.starter !== preferredStarter) {
                        context.report({
                            loc: comment.loc,
                            messageId: "commentStyle",
                            data: {
                                starter: preferredStarter,
                            },
                            fix(fixer) {
                                return fixer.replaceTextRange(
                                    [comment.range[0], comment.range[0] + comment.starter.length],
                                    preferredStarter
                                );
                            },
                        });
                    }
                });
            },
        };
    },
};
