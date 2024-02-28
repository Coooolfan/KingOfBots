<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'PKindex' }">King of Bots</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :class="route_name == 'PKindex' ? 'nav-link active' : 'nav-link'" aria-current="page"
                            :to="{ name: 'PKindex' }">对战</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_name == 'Recordindex' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'Recordindex' }">对局列表</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_name == 'Ranklistindex' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'Ranklistindex' }">排行榜</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="$store.state.user.is_login">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            {{ $store.state.user.username }}
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link class="dropdown-item" :to="{ name: 'UserBotindex' }">我的bot</router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#" @click="logout">退出登录</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <li>
                        <router-link class="nav-link" :to="{ name: 'UserAccountLogin' }">登陆</router-link>
                    </li>
                    <li>
                        <router-link class="nav-link" :to="{ name: 'UserAccountReg' }">注册</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
    name: 'NavBar',
    data() {
        return {

        }
    },
    computed: {
        route_name() {
            return useRoute().name;
        }
    },
    setup() {
        const store = useStore();
        const logout = () => {
            store.dispatch("logout");
        }
        return {
            logout
        }
    }

}

</script>

<style scoped></style>