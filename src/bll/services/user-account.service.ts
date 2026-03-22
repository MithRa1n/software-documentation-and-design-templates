import { Inject, Injectable } from '@nestjs/common';
import type { IUserAccountRepository } from '../../dal/interfaces/user-account.repository.interface';
import type { IUserRepository } from '../../dal/interfaces/user.repository.interface';
import { IUserAccountService } from '../interfaces/user-account.service.interface';
import { UserAccountModel } from '../models';
import { TOKENS } from '../../constants/injection-tokens';

@Injectable()
export class UserAccountService implements IUserAccountService {
  constructor(
    @Inject(TOKENS.USER_ACCOUNT_REPOSITORY)
    private readonly accountRepo: IUserAccountRepository,
    @Inject(TOKENS.USER_REPOSITORY)
    private readonly userRepo: IUserRepository,
  ) {}

  async createAccount(
    account: UserAccountModel,
    userId: string,
  ): Promise<UserAccountModel> {
    const user = await this.userRepo.findById(userId);
    return this.accountRepo.create({ ...account, user: user || undefined });
  }

  async findByUserId(userId: string): Promise<UserAccountModel | null> {
    return this.accountRepo.findByUserId(userId);
  }

  async updateBalance(id: string, balance: number): Promise<void> {
    return this.accountRepo.updateBalance(id, balance);
  }
}
