import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../script.js', import.meta.url), 'utf8');

const required = ['<title>', 'meta name="description"', 'id="programs"', 'id="reviews"', 'id="contacts"'];
const missing = required.filter((token) => !html.includes(token));

if (missing.length) throw new Error(`Missing required markup: ${missing.join(', ')}`);
if (!css.includes('@media (max-width: 760px)')) throw new Error('Mobile breakpoint is missing');
new Function(js);

console.log('HTML structure, responsive CSS and JavaScript syntax: OK');
