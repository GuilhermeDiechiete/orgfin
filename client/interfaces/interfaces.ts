

export interface Transaction {
    date: Date,
    type: string,
    description: string,
    amount: number,
    installment: number,
    total_installments: number,
    category: string,
    account: string,
    destiny: string,
    status: boolean

}

export interface Category {
    id: number,
    name: string,
    type: string,
    user_id: number
}

export interface Account {
    id: number,
    name: string,
    amount: string,
    user_id: number
}

export interface UserRegister {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}