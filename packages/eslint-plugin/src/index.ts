import { rules } from "./rules";
import base from "./configs/base";
import recommended from "./configs/recommended";
import recommendedHulu from "./configs/recommended-hulu";

export = {
    rules,
    configs: {
        base,
        recommended,
        "recommended-hulu": recommendedHulu,
    },
};
