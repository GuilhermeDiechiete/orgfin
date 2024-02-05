import { defineStore } from "pinia";

const api = 'http://localhost:4000/transaction';



export const useTransactionStore = defineStore('transaction', {
    
    state: () => {
        return {
            date: '',
            type: '',
            description: '',
            amount: '',
            installment: '',
            max_installment: '',
            category: '',
            account: '',
            destiny: '',
            message: ref(''), 
            };
    },
    
    getters: {
        getMessage: (state) => state.message
    },
    
    actions: {
        async create(data: any) {
            try {
                const response = await $fetch(api, {
                method: 'POST',
                body: {
                    date: data.date,
                    type: data.type,
                    description: data.description,
                    amount: data.amount,
                    installment: data.installment,
                    max_installment: data.max_installment,
                    category: data.category,
                    account: data.account,
                    destiny: data.destiny
                }
            });
                this.message = String(response);
                setTimeout(() => {
                    this.message = '';
                  }, 1000);

            } catch (error) {
                this.message = String(error);
                setTimeout(() => {
                    this.message = '';
                  }, 1000);
            }
            
        },
    
    },
   
});