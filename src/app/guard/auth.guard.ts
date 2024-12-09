import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractToken(request);

        if (!token) {
            throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED);
        }

        try {
            const decoded = this.jwtService.verify(token);
            (request as any).user = decoded;
            return true;
        } catch (error) {
            throw new HttpException('Token inválido o expirado', HttpStatus.UNAUTHORIZED);
        }
    }

    private extractToken(request: Request): string | null {
        const authHeader = request.headers['authorization'];
        if (!authHeader) return null;

        const [, token] = authHeader.split(' ');
        return token || null;
    }
}
