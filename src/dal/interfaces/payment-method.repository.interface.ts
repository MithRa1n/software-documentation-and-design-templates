import { PaymentMethod } from '../entities/payment-method.entity';

export interface IPaymentMethodRepository {
  create(method: Partial<PaymentMethod>): Promise<PaymentMethod>;
  findById(id: string): Promise<PaymentMethod | null>;
  findByUserId(userId: string): Promise<PaymentMethod[]>;
  findAll(): Promise<PaymentMethod[]>;
}
