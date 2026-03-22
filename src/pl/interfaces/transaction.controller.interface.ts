import { TransactionModel } from '../../bll/models';

export interface ITransactionController {
    findByUserAccountId(userAccountId: string): Promise<TransactionModel[]>;
}
