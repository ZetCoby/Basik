import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }), ConfigService],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
