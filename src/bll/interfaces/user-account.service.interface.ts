import { UserAccountModel } from '../models';

export interface IUserAccountService {
  createAccount(
    account: UserAccountModel,
    userId: string,
  ): Promise<UserAccountModel>;
  findByUserId(userId: string): Promise<UserAccountModel | null>;
  findAll(): Promise<UserAccountModel[]>;
  updateBalance(id: string, balance: number): Promise<void>;
}
