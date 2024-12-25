import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HistoryItemModule } from './history-item/history-item.module';

@Module({
  imports: [ConfigModule.forRoot(), HistoryItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
