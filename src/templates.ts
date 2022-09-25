const esmAndTsDefault = `import { register } from 'neoenv';
register();

export const envConfig = {
`;

function esmAndTsDefaultWithPath({
  path,
  encoding,
}: {
  path: string;
  encoding: BufferEncoding;
}): string {
  return `import { register } from 'neoenv';
register({ path: '${path}', encoding: '${encoding}' });

export const envConfig = {
`;
}

export { esmAndTsDefault, esmAndTsDefaultWithPath };
