const lineRegExp = new RegExp(
  /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm,
);

const quoteRegExp = new RegExp(/["'`]/g);

type result = { [key: string]: string };

function parseData(data: string): result {
  const res: result = {};

  const modifiedData = data.replace(/\r\n?/gm, '\n');

  let match: RegExpExecArray | null;

  while ((match = lineRegExp.exec(modifiedData))) {
    const key = match[1].trim();
    let val = match[2].trim() || '';

    if (quoteRegExp.test(val)) {
      val = val.replace(quoteRegExp, '');
    }

    res[key] = val;
  }

  return res;
}

export { parseData };
