import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { PaymentStatus, PaymentMethodType } from './enums';

@Entity('payment_methods')
export class PaymentMethod {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    isDefault: boolean;

    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING_VERIFICATION })
    status: PaymentStatus;

    @Column({ type: 'enum', enum: PaymentMethodType })
    type: PaymentMethodType;

    @CreateDateColumn()
    addedAt: Date;

    @ManyToOne(() => User, user => user.paymentMethods)
    user: User;

    @OneToMany(() => Transaction, transaction => transaction.paymentMethod)
    transactions: Transaction[];
}
