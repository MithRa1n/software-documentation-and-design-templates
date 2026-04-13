import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from '../entities/payment-method.entity';
import { IPaymentMethodRepository } from '../interfaces/payment-method.repository.interface';

@Injectable()
export class PaymentMethodRepository implements IPaymentMethodRepository {
    constructor(
        @InjectRepository(PaymentMethod)
        private readonly repo: Repository<PaymentMethod>,
    ) {}

    async create(method: Partial<PaymentMethod>): Promise<PaymentMethod> {
        return this.repo.save(this.repo.create(method));
    }

    async findById(id: string): Promise<PaymentMethod | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findByUserId(userId: string): Promise<PaymentMethod[]> {
        return this.repo.find({ where: { user: { id: userId } } });
    }

    async findAll(): Promise<PaymentMethod[]> {
        return this.repo.find();
    }
}
