import Vue from 'vue'
import Router from 'vue-router'
import CreateTransaction from './views/CreateTransaction.vue'
import ConfirmTransaction from './views/ConfirmTransaction.vue'
import RetrieveTransactions from './views/Transactions.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateTransaction',
      component: CreateTransaction
    },
    {
      path: '/ConfirmTransaction',
      name: 'ConfirmTransactions',
      component: ConfirmTransaction
    },
    {
      path: '/Transactions',
      name: 'Transactions',
      component: RetrieveTransactions
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
