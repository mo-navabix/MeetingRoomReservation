import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AuthorizationService } from '../authorization/authorization.service';

async function seedRbac() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const authorizationService = app.get(AuthorizationService);
    await authorizationService.seedRbac();
    console.log('RBAC seed completed successfully.');
  } finally {
    await app.close();
  }
}

seedRbac().catch((error) => {
  console.error('RBAC seed failed:', error);
  process.exit(1);
});
