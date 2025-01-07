import { createStore } from 'vuex'
import ModuleUser from './user.js'
import ModulePK from './pk.js'
import record from './record.js'
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
        record: record,
    }
})
