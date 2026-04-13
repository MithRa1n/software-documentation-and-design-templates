import { Inject, Injectable } from '@nestjs/common';
import type { IPaymentMethodRepository } from '../../dal/interfaces/payment-method.repository.interface';
import type { IUserRepository } from '../../dal/interfaces/user.repository.interface';
import type { IPaymentMethodService } from '../interfaces/payment-method.service.interface';
import { PaymentMethodModel } from '../models';
import { TOKENS } from '../../constants/injection-tokens';

@Injectable()
export class PaymentMethodService implements IPaymentMethodService {
  constructor(
    @Inject(TOKENS.PAYMENT_METHOD_REPOSITORY)
    private readonly methodRepo: IPaymentMethodRepository,
    @Inject(TOKENS.USER_REPOSITORY)
    private readonly userRepo: IUserRepository,
  ) {}

  async createPaymentMethod(
    method: PaymentMethodModel,
    userId: string,
  ): Promise<PaymentMethodModel> {
    const user = await this.userRepo.findById(userId);
    return this.methodRepo.create({ ...method, user: user || undefined });
  }

  async findByUserId(userId: string): Promise<PaymentMethodModel[]> {
    return this.methodRepo.findByUserId(userId);
  }

  async findAll(): Promise<PaymentMethodModel[]> {
    return this.methodRepo.findAll();
  }
}
