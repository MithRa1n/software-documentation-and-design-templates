import { PaymentMethodModel } from '../models';

export interface IPaymentMethodService {
  createPaymentMethod(
    method: PaymentMethodModel,
    userId: string,
  ): Promise<PaymentMethodModel>;
  findByUserId(userId: string): Promise<PaymentMethodModel[]>;
  findAll(): Promise<PaymentMethodModel[]>;
}
