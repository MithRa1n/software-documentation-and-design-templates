import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { UserAccount } from './user-account.entity';
import { PaymentMethod } from './payment-method.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => UserAccount, account => account.user)
    account: UserAccount;

    @OneToMany(() => PaymentMethod, method => method.user)
    paymentMethods: PaymentMethod[];
}
