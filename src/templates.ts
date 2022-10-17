type WithPath = {
  path: string;
  encoding: BufferEncoding;
};

const esmAndTsDefault = `import { register } from 'neoenv';
register();

export const envConfig = Object.freeze({
`;

function esmAndTsDefaultWithPath({ path, encoding }: WithPath): string {
  return `import { register } from 'neoenv';
register({ path: '${path}', encoding: '${encoding}' });

export const envConfig = Object.freeze({
`;
}

const cjsDefault = `const { register } = require('neoenv');
register();

exports.envConfig = Object.freeze({
`;

function cjsDefaultWithPath({ path, encoding }: WithPath): string {
  return `const { register } = require('neoenv');
register({ path: '${path}', encoding: '${encoding}' });

exports.envConfig = Object.freeze({
`;
}

export {
  esmAndTsDefault,
  esmAndTsDefaultWithPath,
  cjsDefault,
  cjsDefaultWithPath,
};
