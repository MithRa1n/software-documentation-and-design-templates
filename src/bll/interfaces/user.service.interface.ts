import { UserModel } from '../models';

export interface IUserService {
  createUser(user: UserModel): Promise<UserModel>;
  findById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
}
