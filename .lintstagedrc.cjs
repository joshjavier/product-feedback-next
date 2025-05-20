const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

module.exports = {
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': [buildEslintCommand, 'prettier --write'],
  '*.css': 'stylelint --cache --fix',
};
