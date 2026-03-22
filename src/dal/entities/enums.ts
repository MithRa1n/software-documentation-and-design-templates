export enum AccountType {
    PERSONAL = 'PERSONAL',
    BUSINESS = 'BUSINESS',
}

export enum PaymentStatus {
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    DECLINED = 'DECLINED',
    PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

export enum PaymentMethodType {
    CREDIT_CARD = 'CREDIT_CARD',
    BANK_ACCOUNT = 'BANK_ACCOUNT',
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}
