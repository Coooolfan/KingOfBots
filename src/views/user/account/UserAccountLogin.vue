<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="username" class="form-control" id="username"
                            aria-describedby="emailHelp" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class="msg">{{ msg }}</div>
                    <!-- <div class="mb-3">
                        <label for="repeatPassword" class="form-label">确认密码</label>
                        <input type="password" class="form-control" id="repeatPassword" placeholder="请重复密码">
                    </div> -->
                    <button type="submit" class="btn btn-primary">登陆</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '../../../components/ContentField.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import router from '../../../router/index'

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let username = ref('')
        let password = ref('')
        let msg = ref('')

        const login = () => {
            msg.value = "";
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success(resp) {
                    store.dispatch("getinfo", {
                        success(resp) {
                            msg.value = resp.msg;
                            router.push({ name: "PKindex" });
                        },
                        error(resp) {
                            console.log(resp);
                        }
                    })

                },
                error(resp) {
                    msg.value = resp.msg;
                    console.log(resp);
                },
            })
        }
        return {
            username, password, msg, login,
        }

    }
}
</script>
<style scoped>
button {
    width: 100%;
}

.msg {
    color: red;
}
</style>