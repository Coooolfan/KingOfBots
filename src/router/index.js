import { createRouter, createWebHistory } from 'vue-router'
import PKindexView from '../views/pk/PKindexView.vue'
import RecordindexView from '../views/record/RecordindexView.vue'
import RanklistindexView from '../views/ranklist/RanklistindexView.vue'
import NotFound from '../views/error/NotFound.vue'
import UserBotindexView from '../views/user/bot/UserBotindexView.vue'
const routes = [
    {
        path: "/pk/",
        name: "PKindex",
        component: PKindexView,
    },
    {
        path: "/record/",
        name: "Recordindex",
        component: RecordindexView,
    },
    {
        path: "/ranklist/",
        name: "Ranklistindex",
        component: RanklistindexView,
    },
    {
        path: "/user/bot/",
        name: "UserBotindex",
        component: UserBotindexView,
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

export default router
