import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { PaymentMethod } from './payment-method.entity';

@Entity('bank_accounts')
export class BankAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    iban: string;

    @Column()
    bankName: string;

    @Column()
    swiftCode: string;

    @OneToOne(() => PaymentMethod)
    @JoinColumn()
    paymentMethod: PaymentMethod;
}
