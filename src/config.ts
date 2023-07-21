/* eslint-disable no-process-env */
import dotenv from 'dotenv'
import { z } from 'zod'

console.log(`./.env.${process.env['NODE_ENV']}.local`)
dotenv.config({ path: `./.env.${process.env['NODE_ENV']}.local` })

console.log(`./.env.${process.env['NODE_ENV']}`)
dotenv.config({ path: `./.env.${process.env['NODE_ENV']}` })

const appConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  HOST: z.string().default('localhost'),
  PORT: z.string().default('5000').transform(Number),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('trace'),
  MONGO_URL: z.string().url().default('mongodb://localhost:27017'),
  MONGO_USER: z.string().default('dev'),
  MONGO_PASS: z.string().default('dev'),
  MONGO_DATABASE: z.string().default('mediaservicedb'),
  ENCRYPTION_KEY: z.string().default('t6w9z&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVm'),
  SWAGGER_SERVER_URL: z.string().url().default('http://localhost:5000'),
  PREFIX_PUBLIC: z.string().default('/public'),
  LOKI_SERVER_URL: z.string().default(''),
  SEQ_SERVER_URL: z.string().url().optional(),
  PROXY_PATH: z.string().min(1),
  DEBUG_BUNDLE: z.boolean().default(false),

  KEYCLOAK_BASE_URL: z.string(),
  KEYCLOAK_REALM: z.string(),
  KEYCLOAK_CLIENT_ID: z.string(),
  KEYCLOAK_CLIENT_SECRET: z.string(),
})

const parsed = appConfigSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', JSON.stringify(parsed.error.format(), null, 4))
  process.exit(1)
}

const env = parsed.data

export const config = {
  environment: env.NODE_ENV,
  host: env.HOST,
  port: env.PORT,
  logLevel: env.LOG_LEVEL,
  mongoUrl: env.MONGO_URL,
  mongodbUsername: env.MONGO_USER,
  mongodbPassword: env.MONGO_PASS,
  mongodbDatabaseName: env.NODE_ENV === 'test' ? `${env.MONGO_DATABASE}-test` : env.MONGO_DATABASE,
  encryptionKey: env.ENCRYPTION_KEY,
  swaggerServerUrl: env.SWAGGER_SERVER_URL,
  proxyPath: env.PROXY_PATH,
  public: env.PREFIX_PUBLIC,
  /**
   * URL address SEQ logging server
   */
  seqServerUrl: env.SEQ_SERVER_URL,
  /**
   * URL address LOKI logging server
   */
  lokiServerUrl: env.LOKI_SERVER_URL,
  /**
   * When true, it is required a bundle source to debug
   */
  debugBundle: env.DEBUG_BUNDLE,

  keycloakBaseUrl: env.KEYCLOAK_BASE_URL,
  keycloakRealm: env.KEYCLOAK_REALM,
  keycloakClientId: env.KEYCLOAK_CLIENT_ID,
  keycloakClientSecret: env.KEYCLOAK_CLIENT_SECRET,

  /**
   * Interval in seconds to check if token is valid
   */
  keycloakCheckValidToken: 120, // seconds
}

export default config

export type AppConfig = z.infer<typeof appConfigSchema>
