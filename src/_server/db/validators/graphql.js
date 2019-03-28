
/* SEE: http://facebook.github.io/graphql/June2018/#sec-Names
 *
 * GraphQL Documents are full of named things:
 * operations, fields, arguments, types, directives,
 * fragments, and variables. All names must follow the
 * same grammatical form.
 */
export const namesRegex = /^[_A-Za-z][_0-9A-Za-z]{0,39}$/
