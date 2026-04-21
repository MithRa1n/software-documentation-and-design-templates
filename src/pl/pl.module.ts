import { Module } from '@nestjs/common';
import { BllModule } from '../bll/bll.module';
import { TransactionController } from './controllers/transaction.controller';

@Module({
  imports: [BllModule],
  controllers: [TransactionController],
})
export class PlModule {}
