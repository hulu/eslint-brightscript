# ESLint Plugin BrightScript
---

### Getting Started

### Installation
Install eslint if you haven't already:
```
$ yarn add -D eslint
$ npm i --save-dev eslint
```

Then install the parser and plugin:

```
$ yarn add -D @hulu/eslint-parser-brightscript @hulu/eslint-plugin-brightscript
$ npm i --save-dev @hulu/eslint-parser-brightscript @hulu/eslint-plugin-brightscript
```

### Usage
Add the following to your .eslintrc to use the recommended rules.

```json
{
    "plugins": ["@hulu/eslint-plugin-brightscript"],
    "extends": ["plugin:@hulu/eslint-plugin-brightscript/recommended"]
}
```

You can also ignore the recommended config by including the `@hulu/eslint-parser-brightscript` parser and
`@hulu/eslint-plugin-brightscript` plugin and adding specific rules manually:

```json
{
  "parser": "@hulu/eslint-parser-brightscript",
  "plugins": ["@hulu/eslint-plugin-brightscript"],
  "rules": {
    "@hulu/brightscript/rule-name": "error"
  }
}
```



