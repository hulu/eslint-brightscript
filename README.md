# ESLint Plugin BrightScript
---

### Getting Started

### Installation
Install eslint if you haven't already:
```
$ yarn add -D eslint
$ npm i --save-dev eslint
```

Make sure you have `@hulu/eslint-parser-brightscript` installed:
```
$ yarn add -D @hulu/eslint-parser-brightscript
$ npm i --save-dev @hulu/eslint-parser-brightscript
```

Then install the plugin:

```
$ yarn add -D @hulu/eslint-plugin-brightscript
$ npm i --save-dev @hulu/eslint-plugin-brightscript
```

### Usage
Add the following to your .eslintrc to use the recommended rules.
```
{
    "plugins": ["@hulu/eslint-plugin-brightscript"],
    "extends": ["plugin:@hulu/eslint-plugin-brightscript/recommended"]
}
```

You can also ignore the recommended config by including the `@hulu/eslint-parser-brightscript`
and adding specific rules manually.

```
{
  "parser": "@hulu/eslint-parser-brightscript",
  "plugins": ["@hulu/eslint-plugin-brightscript"],
  "rules": {
    "@hulu/eslint-plugin-brightscript/rule-name": "error"
  }
}
```



