import { createRouter, createWebHistory } from 'vue-router'
import PKindexView from '../views/pk/PKindexView.vue'
import RecordindexView from '../views/record/RecordindexView.vue'
import RanklistindexView from '../views/ranklist/RanklistindexView.vue'
import NotFound from '../views/error/NotFound.vue'
import UserBotindexView from '../views/user/bot/UserBotindexView.vue'
import UserAccountLoginView from '../views/user/account/UserAccountLogin.vue'
import UserAccountRegView from '../views/user/account/UserAccountReg.vue'
import RecordContentView from '../views/record/RecordContentView.vue'
import store from "../store/index"
const routes = [
    {
        path: "/",
        name: "home",
        redirect: "/pk/",
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/pk/",
        name: "PKindex",
        component: PKindexView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/record/",
        name: "Recordindex",
        component: RecordindexView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/record/:recordId/",
        name: "RecordContent",
        component: RecordContentView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/ranklist/",
        name: "Ranklistindex",
        component: RanklistindexView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/user/bot/",
        name: "UserBotindex",
        component: UserBotindexView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/user/account/login/",
        name: "UserAccountLogin",
        component: UserAccountLoginView,
        meta: {
            requestAuth: false,
        }
    },
    {
        path: "/user/account/reg/",
        name: "UserAccountReg",
        component: UserAccountRegView,
        meta: {
            requestAuth: false,
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {


    let is_login = true;
    const jwt_token = localStorage.getItem("kob_token");

    if (jwt_token) {
        store.commit("updateToken", jwt_token);
        store.dispatch("getinfo", {
            success() {
            },
            error() {
                localStorage.removeItem('kob_token');
                router.push({ name: 'UserAccountLogin' });
            }
        })
    } else {
        is_login = false;
    }

    if (to.meta.requestAuth && !store.state.user.is_login) {
        if (is_login) {
            next();
        } else {
            next({ name: "UserAccountLogin" });
        }
    } else {
        next();
    }
})




export default router
