# neoenv

### Supercharge your .env using `neoenv` with more advanced controls and powers ☄️🚀

Neoenv is a lightweight, zero-dependency, new-generation module for hassle-free, clean, typed and safe environment variables management for modern developers. 🔐🔥
It loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env) and automatically generates a configuration object based on the keys with a single command. 🤯
Now, you'll be able to access the environment variables based on your `.env` file in a type-safe way with some nice IntelliSense and autocomplete. 🤩
And guess what? It supports both JavaScript and TypeScript. 🎉

Check the [Configuration section](#configuration-options-and-flagsarguments) for more details on how to configure and use it according to your needs of the project. 🤓

Find the npm package [here](https://www.npmjs.com/package/neoenv)

<p>
  <a href="https://www.npmjs.com/package/neoenv"><img src="https://badge.fury.io/js/neoenv.svg" alt="npm version" /></a>
</p>

#### Star the [GitHub repo](https://github.com/niloysikdar/neoenv) to keep the developer motivated 🥺✨

## Why neoenv? 🤔

<details>
<summary><b>Problem</b></summary>

First, let us discuss the problem which we're currently having. 🤔

We use environment variables to store sensitive information like API keys, secrets, etc. which we don't want to commit to the repository. 🤫 That's why we use a `.env` file to store these variables and load them into `process.env`. Generally, we use the [`dotenv`](https://www.npmjs.com/package/dotenv) package to load the environment variables from the `.env` file. 📦 And we use the `process.env` object to access the variables.

> `📝` A big thanks to [Scott Motte](https://github.com/motdotla) for creating [dotenv](https://www.npmjs.com/package/dotenv)

**Now that's all good for a general and simple use case. But there are some problems with this approach!**

We don't get any IntelliSense or autocomplete based on the keys already available inside the `.env` file (even in TypeScript). We have to type the keys to access the variables manually. Because that's how it works, it injects the keys and values from the `.env` to `process.env` only after calling some specific function (for `dotenv`, it is `config()`) during runtime.

<p align="left">
<img src="https://i.imgur.com/X9m93hk.png" height="120px" />
<img src="https://i.imgur.com/fVDqKqJ.png" height="120px" />
</p>

That means if we have a small typo in the key name, we won't be able to access the variable and it will return `undefined`. Also, if we try to access any variable with a key which is not present in the `.env` file, it will also return `undefined`. 🤦‍♂️
And sometimes it can break the whole application and we have to spend hours to find the bug. 😱😫

Take this example:

```ts
import mongoose from 'mongoose';

try {
  await mongoose.connect(String(process.env.MANGODB_URI));
} catch (error) {
  console.error(error);
}
```

Here, we have mistakenly typed `MANGODB_URI` instead of `MONGODB_URI`, and guess what? We won't be able to connect to the database with the `undefined` value and we'll have to spend hours to find the bug (doing console.log and checking the value here is a good way to debug) until we find the typo.

**What if we want to use the environment variables in a type-safe way with some nice IntelliSense and autocomplete?**

</details>

<details>
<summary><b>Solution</b></summary>

Introducing **`neoenv`** ☄️🚀

Neoenv will load the environment variables from the `.env` file into `process.env` and automatically generate a configuration object based on the keys with a single command. 🤯

Now, you'll be able to access the environment variables based on your `.env` file in a type-safe way with some nice IntelliSense and autocomplete. 🤩

And guess what? It supports both JavaScript and TypeScript. 🎉

<p align="left">
<img src="https://i.imgur.com/RLZxSop.png" height="160px" />
<img src="https://i.imgur.com/ivRsMb5.png" height="160px" />
</p>

Also, if you're using TypeScript and if you have a typo in the key name which isn't present in the `.env` file, you'll get a type error. If you hover over the error, you'll get the list of keys which are present in the `.env` file with some suggestions and quick fixes.

<p align="left">
<img src="https://i.imgur.com/wq9qVTi.png" height="130px" />
<img src="https://i.imgur.com/4Ml1Q1A.png" height="150px" />
</p>

</details>

## Installation

**Using npm**

```bash
npm i neoenv
```

or

```bash
npm install --save neoenv
```

**Using Yarn**

```bash
yarn add neoenv
```

## Usage

If you've installed `neoenv` globally, you can use the `neoenv` command directly from the root of any project to generate the js/ts configuration file from the `.env` file. But you still need to install `neoenv` as a dependency in your project.

So, the recommended way is to install `neoenv` as a dependency and use the `neoenv` command from the `package.json` scripts.

After installing `neoenv` as a dependency, add a script to your `package.json` file to generate the config file using the `neoenv` command.

```json
{
  "scripts": {
    "gen:env": "neoenv --ts"
  }
}
```

This will generate an `env.ts` file in the root of your project. You can also use the `--js` flag to generate an `env.js` file.

```json
{
  "scripts": {
    "gen:env": "neoenv --js"
  }
}
```

Neoenv follows `Singleton Design Pattern`. Now, you can import the `envConfig` object from the generated file and use it to access the environment variables across your whole application in a type-safe way with some nice IntelliSense and autocomplete. 🤩

Your generated file (`env.ts`) will look something like this (depending on the keys you have in your `.env` file):

```ts
// Don't edit this generated file manually, it will be overwritten by neoenv
import { register } from 'neoenv';
register();

export const envConfig = {
  MONGODB_URI: String(process.env.MONGODB_URI),
  GITHUB_CLIENT_ID: String(process.env.GITHUB_CLIENT_ID),
  CLOUDINARY_API_KEY: String(process.env.CLOUDINARY_API_KEY),
  JWT_SECRET: String(process.env.JWT_SECRET),
};
```

Neoenv will handle everything from loading the environment variables from the `.env` file to generating the configuration object based on the keys available in the `.env` file automatically so that you don't have to do anything manually with copy-paste and you can safely focus on building your application. 🚀

_You can also add the command to your `pre` hook (`prestart` for `start`, `predev` for `dev`) to generate the config file automatically before running your application after doing some changes in the `.env` file._

```json
{
  "scripts": {
    "prestart": "neoenv --js",
    "start": "node index.js"
  }
}
```

or

```json
{
  "scripts": {
    "prestart": "yarn gen:env",
    "start": "node index.js",
    "gen:env": "neoenv --js"
  }
}
```

or

```json
{
  "scripts": {
    "predev": "neoenv --js",
    "dev": "nodemon index.js"
  }
}
```

> **Note:** If you're using [nodemon](https://www.npmjs.com/package/nodemon) to run your application in development mode or using normal `node` (ex: `node index.js` or `node server.js`) with `start` command, you need to stop and restart the server after doing some changes in the `.env` file so that neoenv can load those new changes and generate the updated config file automatically.

## Configuration, Options, and Flags/Arguments

You can configure `neoenv` by passing the options/flags/arguments to the `neoenv` command.

#### `--ts` or `-ts` or `ts`

Specifis that you're using TypeScript for the project and the generated config file should be in TypeScript.

```json
{
  "scripts": {
    "gen:env": "neoenv --ts"
  }
}
```

#### `--js` or `-js` or `js`

Specifis that you're using JavaScript for the project and the generated config file should be in JavaScript.

```json
{
  "scripts": {
    "gen:env": "neoenv --js"
  }
}
```

> **Note:** If you don't specify the `--ts` or `--js` flag, `neoenv` will generate the config file in TypeScript by default.

#### `--esm` or `-esm` or `esm`

Specifis that you're using ECMAScript Module (import/export) or ESM syntax for the project and the generated config file should be in ECMAScript Module (import/export) syntax.

**Note:** This flag is only applicable if you're using JavaScript for the project.

```json
{
  "scripts": {
    "gen:env": "neoenv --js --esm"
  }
}
```

#### `--cjs` or `-cjs` or `cjs`

Specifis that you're using CommonJS Module (require/module.exports) or CJS syntax for the project and the generated config file should be in CommonJS Module (require/module.exports) syntax.

**Note:** This flag is only applicable if you're using JavaScript for the project.

```json
{
  "scripts": {
    "gen:env": "neoenv --js --cjs"
  }
}
```

> **Note:** If you don't specify the `--esm` or `--cjs` flag while using JavaScript with the `--js` flag, `neoenv` will generate the config file in CommonJS Module (require/module.exports) syntax by default. Also the `--esm` and `--cjs` flags won't work if you're using TypeScript with the `--ts` flag.

#### `--encoding` or `-encoding` or `encoding`

Optional flag to specify the encoding of the `.env` file. By default, `neoenv` will use `utf8` encoding.

```json
{
  "scripts": {
    "gen:env": "neoenv --encoding utf8"
  }
}
```

#### `--path` or `-path` or `path`

You can specify the path of the `.env` file using the optional `--path` or `-path` or `path` flag/argument. By default, `neoenv` will look for the `.env` file in the root of the project.

```json
{
  "scripts": {
    "gen:env": "neoenv --path .env.local"
  }
}
```

#### `--out` or `-out` or `out`

You can specify the path of the generated config file using the optional `--out` or `-out` or `out` flag/argument. By default, `neoenv` will generate the config file in the root of the project and the file name will be `env.ts` or `env.js` depending on the language you're using.

```json
{
  "scripts": {
    "gen:env": "neoenv --ts --out src/config/env.config.ts"
  }
}
```

> **Note:** If you want to generate the config file in a different directory other than the root of the project, you need to specify the `--out` flag/argument with the full path of the generated config file and the directory should already exist that means you need to create the directory first and then run the `neoenv` command.

#### `--debug` or `-debug` or `debug`

If you want to see the logs in the console, you can enable the debug mode using the optional `--debug` or `-debug` or `debug` flag/argument. By default, `neoenv` will not log anything in the console.

```json
{
  "scripts": {
    "gen:env": "neoenv --debug"
  }
}
```

So an overall example of the `neoenv` command with all the flags/arguments will look like this:

```json
{
  "scripts": {
    "gen:env": "neoenv --js --esm --encoding utf8 --path .env.local --out src/config/env.config.ts --debug"
  }
}
```

## Bugs and Features

See the [issues](https://github.com/niloysikdar/neoenv/issues) for a list of proposed features (and known issues). Feel free to raise new issues.

## License

Distributed under the Apache-2.0 License. See [LICENSE](https://github.com/niloysikdar/neoenv/blob/main/LICENSE) for more information.

## Author

**Niloy Sikdar**

- [niloysikdar30@gmail.com](mailto:niloysikdar30@gmail.com)
- [GitHub](https://github.com/niloysikdar)
- [Twitter](https://twitter.com/niloysikdar_)
- [LinkedIn](https://www.linkedin.com/in/niloysikdar)

I hope you liked this package and found it useful. Star the [GitHub repo](https://github.com/niloysikdar/neoenv) if you liked it 🙏
Feel free to open an issue or create a pull request if you have any questions, suggestions or feedback. 🙌
