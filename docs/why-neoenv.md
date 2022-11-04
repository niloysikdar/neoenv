## Why neoenv? 🤔

## Problem

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

<br/>

## Solution

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

## Next Steps

Seems interesting and exciting?

Move to the [Installation](/README.md#installation) section to install `neoenv` in your project.

Check out the [Usage Doc](/docs/usage.md) to learn how to configure and use `neoenv` in your project.
