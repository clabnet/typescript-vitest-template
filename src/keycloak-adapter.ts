import axios from 'axios'
import config from './config'

const getToken = async () => {
  const url = config.keycloakBaseUrl
  const realm = config.keycloakRealm

  const tokenEndpoint = `${url}/keycloak/realms/${realm}/protocol/openid-connect/token`

  const response = await axios.post(
    tokenEndpoint,
    {
      grant_type: 'client_credentials',
      client_id: config.keycloakClientId,
      client_secret: config.keycloakClientSecret,
    },
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    }
  )

  return response.data
}

export default getToken
