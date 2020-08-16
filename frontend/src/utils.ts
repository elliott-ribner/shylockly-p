import pluralize from 'pluralize'

export function titleCaseWord(word: string) {
  const plural = pluralize(word)
  return plural[0].toUpperCase() + plural.slice(1)
}
