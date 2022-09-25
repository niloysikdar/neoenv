import { parseData } from './parse';
import fs from 'fs';

const data = fs.readFileSync('.env', 'utf8');

console.log(parseData(data));
