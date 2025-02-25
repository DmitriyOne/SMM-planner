import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard'
import { RolesAuthGuard } from './auth/guard/roles-auth.guard'

@Module({
  imports: [PrismaModule, PostsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesAuthGuard,
    },
  ],
})
export class AppModule {}
