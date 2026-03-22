import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserAccount } from './user-account.entity';
import { PaymentMethod } from './payment-method.entity';
import { TransactionStatus } from './enums';

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.PENDING })
    status: TransactionStatus;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserAccount, account => account.transactions)
    userAccount: UserAccount;

    @ManyToOne(() => PaymentMethod, method => method.transactions)
    paymentMethod: PaymentMethod;
}
