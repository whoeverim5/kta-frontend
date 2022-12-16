module.exports = {
  printWidth: 80, // 一行80字符

  tabWidth: 2, // 2个空格的缩进符

  useTabs: false, // 不使用缩进符

  semi: true, // 分号

  singleQuote: true, // 单引号

  quoteProps: 'as-needed', // 对象的Key仅在需要的时候加引号

  jsxSingleQuote: true, // jsx使用单引号

  trailingComma: 'es5', // 尾随逗号

  bracketSpacing: true, // 大括号内首位加空格

  arrowParens: 'always', // 箭头函数需要括号

  rangeStart: 0, // 格式化整个文件
  rangeEnd: Infinity,

  requirePragma: false, // 不要在文件开头写@Prettier

  insertPragma: false, // 不要在文件开头插入@Prettier

  proseWrap: 'never', // 默认的折行标准

  htmlWhitespaceSensitivity: 'css', // 根据样式决定html要不要折行

  endOfLine: 'lf', // 换行符'lf'
};
