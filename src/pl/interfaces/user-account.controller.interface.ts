import { UserAccountModel } from '../../bll/models';

export interface IUserAccountController {
  findByUserId(userId: string): Promise<UserAccountModel | null>;
}
