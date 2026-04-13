import { UserAccount } from '../entities/user-account.entity';

export interface IUserAccountRepository {
  create(account: Partial<UserAccount>): Promise<UserAccount>;
  findById(id: string): Promise<UserAccount | null>;
  findByUserId(userId: string): Promise<UserAccount | null>;
  findAll(): Promise<UserAccount[]>;
  updateBalance(id: string, balance: number): Promise<void>;
}
