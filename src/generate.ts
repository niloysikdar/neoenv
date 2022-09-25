#!/usr/bin/env node

type Args = { [key: string]: string | boolean };

function _getArgs(): Args {
  const args: string[] = process.argv.slice(2);

  const initial: Args = {};

  return args.reduce((acc: Args, arg: string) => {
    const [key, value] = arg.split('=');
    const newKey = key.replace(/[-]/g, '');
    acc[newKey] = value || true;
    return acc;
  }, initial);
}

const args = _getArgs();
console.log(args.js);
