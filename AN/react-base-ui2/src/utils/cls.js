/**
 * Copy from react-aaui
 * Tag function for class template strings.
 */
export default (template, ...expressions) =>
  template
    .reduce((accumulator, part, i) => accumulator + expressions[i - 1] + part)
    .replace(/\s+/g, ' ')
    .trim();
