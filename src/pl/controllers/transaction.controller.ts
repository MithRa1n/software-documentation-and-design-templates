import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Render,
  Redirect,
  Res,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import type { Response } from 'express';
import type { ITransactionService } from '../../bll/interfaces/transaction.service.interface';
import type { IUserAccountService } from '../../bll/interfaces/user-account.service.interface';
import type { IPaymentMethodService } from '../../bll/interfaces/payment-method.service.interface';
import { TransactionStatus } from '../../dal/entities/enums';
import { TOKENS } from '../../constants/injection-tokens';

@Controller()
export class TransactionController {
  constructor(
    @Inject(TOKENS.TRANSACTION_SERVICE)
    private readonly transactionService: ITransactionService,
    @Inject(TOKENS.USER_ACCOUNT_SERVICE)
    private readonly userAccountService: IUserAccountService,
    @Inject(TOKENS.PAYMENT_METHOD_SERVICE)
    private readonly paymentMethodService: IPaymentMethodService,
  ) {}

  @Get()
  @Redirect('/transactions', 302)
  root() {
    return;
  }

  @Get('transactions')
  @Render('transactions/index')
  async index(@Query('status') status?: string) {
    const statusEnum =
      status && Object.values(TransactionStatus).includes(status as TransactionStatus)
        ? (status as TransactionStatus)
        : undefined;
    const transactions = statusEnum
      ? await this.transactionService.findByStatus(statusEnum)
      : await this.transactionService.findAll();
    return {
      title: 'Transactions',
      transactions,
      statuses: Object.values(TransactionStatus),
      selectedStatus: statusEnum ?? '',
    };
  }

  @Get('transactions/new')
  @Render('transactions/create')
  async newForm() {
    const [accounts, methods] = await Promise.all([
      this.userAccountService.findAll(),
      this.paymentMethodService.findAll(),
    ]);
    return {
      title: 'New Transaction',
      statuses: Object.values(TransactionStatus),
      accounts,
      methods,
    };
  }

  @Get('transactions/:id')
  @Render('transactions/show')
  async show(@Param('id') id: string) {
    const transaction = await this.transactionService.findById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction ${id} not found`);
    }
    return { title: 'Transaction Details', transaction };
  }

  @Get('transactions/:id/edit')
  @Render('transactions/edit')
  async editForm(@Param('id') id: string) {
    const transaction = await this.transactionService.findById(id);
    if (!transaction) {
      throw new NotFoundException(`Transaction ${id} not found`);
    }
    return {
      title: 'Edit Transaction',
      transaction,
      statuses: Object.values(TransactionStatus),
    };
  }

  @Post('transactions')
  async create(
    @Body() body: { amount: string; status: TransactionStatus; userAccountId: string; paymentMethodId: string },
    @Res() res: Response,
  ) {
    await this.transactionService.createTransaction(
      { amount: parseFloat(body.amount), status: body.status },
      body.userAccountId,
      body.paymentMethodId,
    );
    res.redirect('/transactions');
  }

  @Post('transactions/:id/update')
  async update(
    @Param('id') id: string,
    @Body() body: { amount: string; status: TransactionStatus },
    @Res() res: Response,
  ) {
    await this.transactionService.update(id, {
      amount: parseFloat(body.amount),
      status: body.status,
    });
    res.redirect(`/transactions/${id}`);
  }

  @Post('transactions/:id/delete')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.transactionService.delete(id);
    res.redirect('/transactions');
  }
}
