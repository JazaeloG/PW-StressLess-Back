
import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsuarioModule } from './usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/infraestructure/controllers/auth.controller';
import { JwtConstants } from 'src/shared/constants/jwt.constant';
import { AuthUseCase } from 'src/core/use-cases/auth.use-case';
import { AuthRepositoryImpl } from 'src/infraestructure/repositories/auth.repository';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [
    AuthUseCase,
    AuthService,
    {
      provide: 'AuthRepository',
      useClass: AuthRepositoryImpl,
    }
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    AuthUseCase,
  ],
})
export class AuthModule {}
