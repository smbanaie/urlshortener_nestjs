import { application } from './application';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import configuration = require('ormconfig');

// import * as dotenv from 'dotenv';
import 'dotenv/config';

// dotenv.config();

const APP_VERSION = process.env.npm_package_version;

async function bootstrap() {
  const app = await application();

  const options = new DocumentBuilder()
  .setTitle("URL Shortener Demo")
  .setDescription(`Yektanet Hiring Process - Software Eng. Skill Assesment`)
  .setVersion(APP_VERSION)
  .build();
const document = SwaggerModule.createDocument(app, options);
// Set Home URL on swagger gui.
SwaggerModule.setup('/', app, document);
  app.listen(process.env.PORT);

}

bootstrap();
