import { PaymentMethodModel } from '../../bll/models';

export interface IPaymentMethodController {
    findByUserId(userId: string): Promise<PaymentMethodModel[]>;
}
