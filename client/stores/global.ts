import { defineStore } from "pinia";

const d = new Date().getDate(); // Obter o dia do mês
const m = new Date().getMonth() + 1; // Obter o mês atual e adicionar 1 (os meses começam do zero)
const y = new Date().getFullYear(); // Obter o ano atual

export const useGlobalStore = defineStore('global', {

  state: () => {
    return {
      tableSelected: ref('expense'),
      dataISO: ref(`${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`),

      
    }

  

    
      
    }
  }
  
);

