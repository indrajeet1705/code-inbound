import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private jwtService : JwtService
  ){}
  async canActivate(context: ExecutionContext): Promise<boolean>{
      const request =context.switchToHttp().getRequest();
      const authorization = request.headers['authorization'];
      const token = authorization?.split(' ')[1];
      if(!token){
        throw new UnauthorizedException('No token provided');
      }
      try {
        const tokenPlayload = await this.jwtService.verifyAsync(token);
        request.user = {
          email : tokenPlayload.sub,
          id: tokenPlayload.userId
        }
        return true
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }


  }
}