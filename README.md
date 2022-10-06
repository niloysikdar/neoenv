# neoenv

### Supercharge your .env using `neoenv` with more advanced controls and powers ☄️🚀

Neoenv is a lightweight, zero-dependency, new-generation module for hassle-free, clean, typed and safe environment variables management for modern developers. 🔐🔥
It loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env) and automatically generates configuration object based on the keys. 🤯

Find the npm package [here](https://www.npmjs.com/package/neoenv)

<p>
  <a href="https://www.npmjs.com/package/neoenv"><img src="https://badge.fury.io/js/neoenv.svg" alt="npm version" /></a>
</p>

### Star the [GitHub repo](https://github.com/niloysikdar/neoenv) to keep the developer motivated 🥺✨

### Why neoenv? 🤔

<details>
<summary><b>Problem</b></summary>

First, let us discuss the problem which we're currently having. 🤔

We use environment variables to store sensitive information like API keys, secrets, etc. which we don't want to commit to the repository. 🤫 That's why we use a `.env` file to store these variables and load them into `process.env`. Generally, we use the [`dotenv`](https://www.npmjs.com/package/dotenv) package to load the environment variables from the `.env` file. 📦 And we use the `process.env` object to access the variables.

> `📝` A big thanks to [motdotla](https://github.com/motdotla) for creating [dotenv](https://github.com/motdotla/dotenv)

**Now that's all good for a general use case. But there are some problems with this approach!**

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

## Bugs and Features

See the [issues](https://github.com/niloysikdar/neoenv/issues) for a list of proposed features (and known issues). Feel free to raise new issues.

## License

Distributed under the Apache-2.0 License. See [LICENSE](https://github.com/niloysikdar/neoenv/blob/main/LICENSE) for more information.

## Author

### Niloy Sikdar

- [niloysikdar30@gmail.com](mailto:niloysikdar30@gmail.com)
- [GitHub](https://github.com/niloysikdar)
- [Twitter](https://twitter.com/niloysikdar_)
- [LinkedIn](https://www.linkedin.com/in/niloysikdar)