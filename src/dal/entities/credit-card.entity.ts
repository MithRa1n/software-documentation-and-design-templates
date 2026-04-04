import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';
import { PaymentMethod } from './payment-method.entity';

@Entity('credit_cards')
export class CreditCard {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    maskedCardNumber: string;

    @Column()
    cardHolderName: string;

    @Column()
    expirationMonth: number;

    @Column()
    expirationYear: number;

    @Column()
    paymentToken: string;

    @OneToOne(() => PaymentMethod)
    @JoinColumn()
    paymentMethod: PaymentMethod;

    @ManyToOne(() => Country, country => country.creditCards)
    country: Country;
}
