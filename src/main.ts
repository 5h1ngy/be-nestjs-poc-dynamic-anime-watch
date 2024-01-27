// Import necessary modules from Nest.js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Define an asynchronous function named bootstrap to start the Nest.js application
async function bootstrap() {
  // Create an instance of the Nest application
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin Resource Sharing (CORS) for the application
  // In this case, it allows requests from all origins and disables credentials
  app.enableCors({
    credentials: false
  });

  // Start the application and make it listen on port 4002
  await app.listen(4002);
}

// Call the bootstrap function to start the application
bootstrap();
