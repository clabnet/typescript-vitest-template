import { describe, expect, it } from 'vitest'

import getToken from '../src/keycloak-adapter'

describe('======= keycloak adapter =========', () => {
  it('it should get token from keycloak', async () => {
    const token = await getToken()
    expect(token).toBeTruthy()
    expect(token).haveOwnProperty('access_token')
  })
})
