# Projects setup

## Step -1

1. in terminal `npm init -y`
2. npm i express cors mongoose
3. npm install typescript --save-dev
4. npm i dotenv
5. tsc -init

## Step -2

in tsconfig.json ---> rootdir will be src and outdir will be dist folder

## step -3

in package.json file make a script for compli ts file in js`"build": "tsc -w",`

## step -4

move app.listen from app to server

```
const mongoose = require("mongoose");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

```

## step-5

make file `in src/app/config/index.ts`

```
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};


```

## step-6

export app from app.ts
and import in server.ts
and inside main function always use try catch to not crush the server. `In synchronous code express by default handle error but not handle in async code`

```
import app from "./app";
import config from "./app/config";

import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(config.MONGO_URI as string);
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
}

```

## step-7

### setup eslint and prettier

in tsconfing.json include bellow lines
for more details `https://blog.logrocket.com/linting-typescript-eslint-prettier/`
"include": ["src"], // which files to compile
"exclude": ["node_modules"], // which files to skip

### install elslint :

#### step 1:

`npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev`

#### step 2:

`npx eslint --init`

and there will ask some questions to install eslint

1. How would you like to use ESLint?
2. What type of modules does your project use?
3. Which framework does your project use?
4. Does your project use TypeScript?
5. Where does your code run?
6. How would you like to define a style for your project?

#### step-2 rules :

in elsintrc.json

```"rules": {
"@typescript-eslint/no-unused-vars": "error",
// to enforce using type for object type definitions, can be type or interface
"@typescript-eslint/consistent-type-definitions": ["error", "type"],

},
```

#### step 3 :

make a file in root directory called
`.eslintignore`
inside the file include this two folder "node_modules
dist"

#### step 4:

in package.json include lint
this will find all error

````// package.json
{
  // ...
  "scripts": {
    "lint": "eslint src --ignore-path .eslintignore --ext .js,.ts"
   },
  // ...
}```
````

and this command for manually find errors: `npm run lint --fix`

set only one of them in script in package.json file
run this command to fix these error manually `npx elsint src --fix`
or you can make a script this !!
to fix these error use : `lint:fix: "npx eslint src --fix"` or `"lint:fix": "npx eslint src --ignore-path .eslintignore --ext .ts --fix",`

#### step 5: eslint rule setup ->

inclue these rules and for `no-undef : error" 
in the rules use 
"globals": {
"process": "readonly"
}`
after use that in index.ts error will go from proccess(process is a global variable)

```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-unused-vars": "error",
    "no-unused-expressions": "error",
    "prefer-const": "error",
    "no-extra-semi": "error",
    "no-undef": "error",
    "no-console": "warn"
  },
  "globals": {
  "process": "readonly"
  }
}
```

Eslint setup done!

## step -8: Prettier

#### step-1:

    `npm install --save-dev prettier`

after install make a root file called .prettierrc.json

```
// .prettierrc.json
{
  "semi": false, // Specify if you want to print semicolons at the end of statements
  "singleQuote": true, // If you want to use single quotes
  "arrowParens": "avoid", // Include parenthesis around a sole arrow function parameter
}
```

#### step-2:

use this command in terminal to formate code : `npx prettier --write src/index.ts`
and make a script to formate code in package.json : `   "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",`

1. paste this in setting.json
   `// settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  ...
}`

#### step-3: Avoiding conflicts when working with ESLint and Prettier

1. npm install --save-dev eslint-config-prettier

````// .eslintrc
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
  },
  "plugins": ["@typescript-eslint"],
  // HERE
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],

  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },

  "env": {
    "browser": true,
    "es2021": true
  }
}```
````

2. make a script in package.json for formate code : `"prettier:fix": "npx prettier --write src",`
   `Setup done`

#### step-9:

make a .gitignore file
past them into .gitgonre file these
`node_modules
dist
.env
`
