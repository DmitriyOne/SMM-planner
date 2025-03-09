import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesAuthGuard } from './auth/guard/roles-auth.guard'
import { ConfigModule } from '@nestjs/config'
import { validateConfig } from './common/configs/validate.config'
import { TagsModule } from './tags/tags.module'
import { CommentsModule } from './comments/comments.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerConfigService } from './common/configs/throttler.config'
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard'
import { getEnvFilePath } from './utils/env.utils'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: getEnvFilePath(),
      isGlobal: true,
      validate: validateConfig,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfigService,
    }),
    PrismaModule,
    PostsModule,
    UsersModule,
    AuthModule,
    TagsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
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
