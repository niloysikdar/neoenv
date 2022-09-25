#!/usr/bin/env node

import { join, resolve } from 'path';
import { homedir } from 'os';
import { readFileSync, writeFileSync } from 'fs';
import { esmAndTsDefault } from './templates';
import { parseData } from './parse';

type Args = { [key: string]: string | boolean };

type ArgsSchema = {
  path?: string;
  encoding?: BufferEncoding;
  out?: string;
  ts?: boolean;
  js?: boolean;
  esm?: boolean;
  cjs?: boolean;
  debug?: boolean;
};

function _getArgs(): ArgsSchema {
  const args: string[] = process.argv.slice(2);

  const initial: Args = {};

  return args.reduce((acc: Args, arg: string) => {
    const [key, value] = arg.split('=');
    const newKey = key.replace(/[-]/g, '');
    acc[newKey] = value || true;
    return acc;
  }, initial);
}

function _resolveHome(envPath: string) {
  return envPath[0] === '~' ? join(homedir(), envPath.slice(1)) : envPath;
}

function _generate({
  path,
  encoding = 'utf8',
  out,
  ts,
  js,
  esm,
  cjs,
  debug = false,
}: ArgsSchema) {
  const dotenvPath = path ? _resolveHome(path) : resolve(process.cwd(), '.env');

  const defaultOutFile = 'env.config.' + (ts ? 'ts' : 'js');

  const outPath = out
    ? _resolveHome(out)
    : resolve(process.cwd(), defaultOutFile);

  const envData = readFileSync(dotenvPath, { encoding });
  const parsedData = parseData(envData);

  let envConfig = '';
  let finalConfig = '';

  if (ts) {
    for (const finalKey in parsedData) {
      debug && console.log(`Generating for: ${finalKey}`);
      envConfig =
        envConfig + `  ${finalKey}: process.env.${finalKey} as string,\n`;
    }

    finalConfig = esmAndTsDefault + envConfig + '};\n';
  } else if (js) {
    console.log(esm, cjs);
  }

  writeFileSync(outPath, finalConfig);
  debug &&
    console.log(
      `${out ? out : defaultOutFile} has been generated successfully`,
    );
}

_generate(_getArgs());
