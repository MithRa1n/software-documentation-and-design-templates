import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../dal/interfaces/user.repository.interface';
import { IUserService } from '../interfaces/user.service.interface';
import { UserModel } from '../models';
import { TOKENS } from '../../constants/injection-tokens';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(TOKENS.USER_REPOSITORY)
    private readonly userRepo: IUserRepository,
  ) {}

  async createUser(user: UserModel): Promise<UserModel> {
    return this.userRepo.create(user);
  }

  async findById(id: string): Promise<UserModel | null> {
    return this.userRepo.findById(id);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.userRepo.findByEmail(email);
  }
}
