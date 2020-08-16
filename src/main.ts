import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { AppModule } from './AppModule'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT)
}

bootstrap()

const AWS_KEY = 'fefkfkkfkfk' // fake key - testing gitleaks
