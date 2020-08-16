# Failed Payments Frontend

This is a front end application built using webpack and featuring react.

NOTE: These instructions pertain only to the frontend (client) app. See ../readme.me for full
dev instructions.

## Development

#### Getting running

After cloning the project, run `yarn install` to install all dependencies.

To build the app, run `yarn run build:dev`. This will produce a JS bundle and entry point html file in ./dist.
This HTML file imports the JS bundle and can be opened in the browser.

For easier development, webpack dev server has been set up. To use this, run `yarn run run:dev`, which will
build the bundle and HTML file as before, but will build it in memory, serve it at localhost, and open your
browser automatically. Any changes made to any files will cause this to rerun and update the app running in
your browser. 

NOTE: As the dev server builds it bundle in memory, don't expect to see anything in the ./dsist folder updated (until you run build:dev again).

Running build:dev is usually not necessary when developing but will allow you to see the final bundle to diagnose errors.

#### Getting pretty

This project uses eslint + eslint-typescript plugin to enforce code style. This used to be done using tslint, but that is being
deprecated in favor of eslint, which is now designed to fully handle javascript *and* typescript. The main purpose of eslint is 
to enforce code style to prevent bugs and crufty code. It's completely customizable and depends only on the rules you specify. For 
example, one common rule is 'no console.logs'. Rules range from trivial ones designed to keep out messy code (such as that one) to
more sophisticated ones designed to catch subtle bugs, like disallowing 'await' inside a loop, requiring that a getter function have
a return statement, etc. The rules for eslint can be found in .eslintrc.js

This project also uses another formatting tool called 'prettier'. Prettier's job is more on the aesthetic side of things, such as default
indent size, ordering of import statements, presence of semicolons, etc. Like eslint, prettier can be customized by specifying desired rules,
and this is done in .prettierrc

How does these interact? Eslint can be thought of as running the show and invoking prettier in the background. When eslint is run, it runs
through its list of rules, which includes a special rule that in turn invokes prettier. The result is that all of the rules in .eslintrc and 
.prettierrc are enforced, but you only need to run eslint to make this happen.

In both tools, certain rule violations can be automatically fixed by said tool. For example, an line indented 3 spaces instead of 2 will be
autofixed when the linter is run with a certain flag. Other rules get reported but require human intervention to fix.

The included vscode configuration sets up syntax highlighting based on these two linters, and also applies the autofixers upon save.

The result of all that complicated set up is simple:
- Anything that violates a lint rule will be highlighted red in the IDE (yellow for warnings)
- Upon save, any fixable violations will be fixed automatically

To manually run the linters on the command line to see all errors in one place, simple run `yarn run lint`

Configuring rules is an on-going process. I've started us off with some (allegedly sensible) defaults, but we will certainly add and remove
them to fit our convention and dev style. 

If you need to disable a rule for a certain line or file (only do this if you are sure we shouldn't just disable the rule altogether), here
is the syntax for that:


file: `/* eslint-disable no-console */`

line `// eslint-disable-next-line no-console `

TODO: consider adding the eslint webpack plugin. The above behavior would be identical, but webpack would not allow you to build
a bundle until you've resolved all linter errors

## Ecosystem

- IDE
  - vscode
- Package management
  - yarn 
- Build tools
  - Webpack
  - Webpack dev server
- Language
  - Typescript
  - Typescript with jsx
- Linting/formatting
  - eslint
  - prettier
- Key libraries
  - UI
    - evergreen ui
