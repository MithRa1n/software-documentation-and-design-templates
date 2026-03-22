import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { AccountType } from './enums';

@Entity('user_accounts')
export class UserAccount {
    @PrimaryGeneratedColumn('uuid')
    accountId: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    balance: number;

    @Column({ default: 'USD' })
    currency: string;

    @Column({ type: 'enum', enum: AccountType, default: AccountType.PERSONAL })
    accountType: AccountType;

    @OneToOne(() => User, user => user.account)
    @JoinColumn()
    user: User;

    @OneToMany(() => Transaction, transaction => transaction.userAccount)
    transactions: Transaction[];
}
