import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    forwardRef(() => UserModule),  
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async( configService :ConfigService)=>({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject:[ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule, AuthService]
})
export class AuthModule {}
