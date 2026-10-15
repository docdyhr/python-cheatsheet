import { describe, expect, it } from 'vitest'
import { slugify } from '../scripts/slugify'

// Expected values were produced by `string(s).slugify()` (string@3.3.3), the
// implementation this helper replaces, so heading anchors stay unchanged.
const cases: Array<[string, string]> = [
  ['Args und Kwargs', 'args-und-kwargs'],
  ['Args 和 Kwargs', 'args-kwargs'],
  ['Args и Kwargs', 'args-kwargs'],
  ['Args と Kwargs', 'args-kwargs'],
  ['Args 및 Kwargs', 'args-kwargs'],
  ['Le mot-clé end', 'le-mot-cle-end'],
  ['Comprensión de listas', 'comprension-de-listas'],
  ['Añadir condicionales', 'anadir-condicionales'],
  ['Funções Embutidas do Python', 'funcoes-embutidas-do-python'],
  ['Hinzufügen von Bedingungen', 'hinzufugen-von-bedingungen'],
  ['Straße & Maße', 'strasse-masse'],
  ['Œuvre Ærø Łódź', 'oeuvre-aero-lodz'],
  ['Python 中的列表', 'python'],
  ['Списки в Python', 'python'],
  ['列表', ''],
  ['  leading and trailing  ', 'leading-and-trailing'],
  ['-Leading dash', 'leading-dash'],
  ['snake_case__and   spaces', 'snake-case-and-spaces'],
  ['The print() Function', 'the-print-function'],
  ['f-strings: formatting', 'f-strings-formatting'],
  ['100% done?!', '100-done'],
  ['Ünïcödé — dash', 'unicode-dash'],
  ['Vendredi 13 août', 'vendredi-13-aout'],
]

describe('slugify', () => {
  it.each(cases)('slugifies %j as %j', (input, expected) => {
    expect(slugify(input)).toBe(expected)
  })
})
