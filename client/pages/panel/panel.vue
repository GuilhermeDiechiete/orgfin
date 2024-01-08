<template>
    <div>
        <div v-if="screen_mobile" class="box">
            <nav class="tabs is-toggle is-fullwidth">
                <ul>
                    <li :class="{'is-active ': pageSelect === 'feed'}" @click="selectPage('feed')"><a>Feed</a></li>
                    <li :class="{'is-active': pageSelect === 'control'}" @click="selectPage('control')"><a>Controle</a></li>
                    <li :class="{'is-active': pageSelect === 'panel'}" @click="selectPage('panel')"><a>Painel</a></li>
                </ul>
            </nav>
        </div>

        <div class="columns" >
            <div v-if="pageSelect === 'feed' || screen_mobile === false" class="box column m-3 container">
                <Feed/>
            </div>

            <div v-if="pageSelect === 'control' || screen_mobile === false" class="box column m-3 container">
                <FinancialControl/>
            </div>
        
            <div v-if="pageSelect === 'panel' || screen_mobile === false" id="section" class="box column m-1">
                <Panel/>
            </div>
        </div>    
    </div>
</template>

<script lang="ts">
import Vue from 'vue'




export default Vue.extend({
   
    
    data() {
        return {

            screen_mobile: window.innerWidth <= 1200, 

            pageSelect: '', 

            // messages
            messageSuccess: '',
            messageError: ''  

        }
    },

    mounted() {
        window.addEventListener('resize', this.atualizarScreenMobile);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.atualizarScreenMobile);
    },
   
    methods: {
        atualizarScreenMobile() {
            this.screen_mobile = window.innerWidth <= 1200;
            
        },
    
        selectPage(page: string) {

            if(this.screen_mobile) {
                this.pageSelect = page
            } else {
                this.screen_mobile = false
                this.pageSelect = 'all'
            }
            
        }
    }
})



</script>