import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';
import { parseData } from './parse';

type registerOptions = {
  path?: string;
  encoding?: BufferEncoding;
};

function _resolveHome(envPath: string) {
  return envPath[0] === '~' ? join(homedir(), envPath.slice(1)) : envPath;
}

function register({ path, encoding = 'utf8' }: registerOptions = {}) {
  const dotenvPath = path ? _resolveHome(path) : resolve(process.cwd(), '.env');

  try {
    const envData = readFileSync(dotenvPath, { encoding });
    const parsedData = parseData(envData);

    for (const [key, value] of Object.entries(parsedData)) {
      process.env[key] = value;
    }
  } catch (error) {
    console.error(error);
  }
}

export { register };
