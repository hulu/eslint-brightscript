import { noIsValid } from "./no-is-valid";
import { noSetFocusFalse } from "./no-set-focus-false";
import { onKeyEventBooleanReturnType } from "./onkeyevent-boolean-return-type";
import { noUnsafeConditions } from "./no-unsafe-conditions";
import { noTypedFuncParams } from "./no-typed-func-params";
import { commentStyle } from "./comment-style";

export let rules = {
    "no-is-valid": noIsValid,
    "no-set-focus-false": noSetFocusFalse,
    "onkeyevent-boolean-return-type": onKeyEventBooleanReturnType,
    "no-unsafe-conditions": noUnsafeConditions,
    "no-typed-func-params": noTypedFuncParams,
    "comment-style": commentStyle,
};
