import { describe, expect, it } from 'vitest'

import { sumMultiply } from '../src/index'

describe('sum', () => {
  it('sum return a number', async () => {
    const actual = typeof sumMultiply(1, 2)
    const expected = 'number'
    expect(actual).toEqual(expected)
  })

  it('sum return a sumMultiply of 2 number ( 2 + 3 ) * 2 = 10', async () => {
    const actual = sumMultiply(2, 3)
    const expected = 10
    expect(actual).toEqual(expected)
  })
})
