import { DataSource, DataSourceOptions } from 'typeorm';
import { getTypeOrmModuleOptions } from 'src/infraestructure/config/typeorm/getTypeORM.module';
import { EnvironmentConfigService } from 'src/infraestructure/config/environment-config/environment-config.service';
import { EnvironmentConfigModule } from 'src/infraestructure/config/environment-config/enviroment-config.module';
import { seedRecomendaciones } from './recomendaciones.seed'; 
import { seedTests } from './test.seed';
import { NestFactory } from '@nestjs/core';

const runSeeders = async () => {
  // Crear un módulo Nest para acceder a EnvironmentConfigService
  const appContext = await NestFactory.createApplicationContext(EnvironmentConfigModule);
  const envConfigService = appContext.get(EnvironmentConfigService);

  // Obtener opciones de configuración de TypeORM
  const dataSourceOptions = getTypeOrmModuleOptions(envConfigService) as DataSourceOptions;
  const dataSource = new DataSource(dataSourceOptions);

  // Inicializar conexión a la base de datos
  await dataSource.initialize();
  console.log('Conexión a la base de datos exitosa.');

  try {
    // Ejecutar seeders
    await seedRecomendaciones(dataSource);
    console.log('Seeders de recomendaciones ejecutados.');

    await seedTests(dataSource);
    console.log('Seeders de tests ejecutados.');
  } catch (error) {
    console.error('Error ejecutando seeders:', error);
  } finally {
    // Finalizar conexión
    await dataSource.destroy();
    console.log('Conexión cerrada y seeders completados.');
    
    // Cerrar el contexto de Nest
    await appContext.close();
  }
};

runSeeders()
  .then(() => {
    console.log('Proceso completado.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error ejecutando seeders:', err);
    process.exit(1);
  });