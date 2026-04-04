import { UserModel } from '../../bll/models';

export interface IUserController {
    findById(id: string): Promise<UserModel | null>;
    findByEmail(email: string): Promise<UserModel | null>;
}
