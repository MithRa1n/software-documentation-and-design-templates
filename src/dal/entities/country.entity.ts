import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CreditCard } from './credit-card.entity';

@Entity('countries')
export class Country {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    isoCode: string;

    @Column()
    name: string;

    @Column()
    currency: string;

    @OneToMany(() => CreditCard, card => card.country)
    creditCards: CreditCard[];
}
