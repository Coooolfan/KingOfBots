import { createStore } from 'vuex'
import ModuleUser from './user.js'
import ModulePK from './pk.js'
export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        user: ModuleUser,
        pk: ModulePK,
    }
})
