// usado para a tabela de expenses, incomes e investments
export interface Transaction {
    id: number,
    date: string,
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

// API getByMonth
export interface TransactionByMonth {
    expenses: never[],
    incomes: never[],
    investments: never[],
    surplus: number
    totalByMonthExpenses: number,
    totalByMonthIncomes: number,
    totalByMonthInvestments: number,
    totalByMonthExpensesFalse: number
    
}

// API getByYear
export interface TransactionByYear {
    totalExpenses: never[], 
    totalIncomes: never[],
    totalInvestments: never[],
    totalAnnualExpenses: number,
    totalAnnualIncomes: number,
    totalAnnualInvestments: number
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

// CATEGORY INTERFACES
export interface CategoryCreate {
    name: string,
    type: string
}

// TASKS INTERFACES
export interface TaskCreate {
    date: string,
    status: boolean,
    name: string,
    description: string
}
export interface Tasks {
    date: string,
    status: boolean,
    name: string,
    description: string
}

export interface Categories {
    id: number,
    name: string,
    type: string,
    user_id: number
}

// ACCOUNTS INTERFACES
export interface AccountCreate {
    name: string,
    amount: number
}