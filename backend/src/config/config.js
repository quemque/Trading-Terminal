const { z } = require('zod')
const path = require('path')

require('dotenv').config({
   path: path.join(__dirname, '../../.env'),
})

const envSchema = z.object({
   PORT: z.string().default('3000'),

   API_URL: z.string().url().default('https://api.coingecko.com/api/v3'),
   API_KEY: z.string().min(1, 'API_KEY is required'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
   console.error('❌ Invalid environment variables:')
   console.error(_env.error.format())
   process.exit(1)
}

const config = {
   port: parseInt(_env.data.PORT, 10),
   api: {
      url: _env.data.API_URL,
      key: _env.data.API_KEY,
   },
}

module.exports = config
