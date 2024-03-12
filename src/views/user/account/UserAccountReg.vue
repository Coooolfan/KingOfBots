<template>
    <ContentField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="username" class="form-control" id="username"
                            aria-describedby="emailHelp" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="请输入密码">
                    </div>
                    <div class="mb-3">
                        <label for="repeatPassword" class="form-label">确认密码</label>
                        <input v-model="repeatPassword" type="password" class="form-control" id="repeatPassword"
                            placeholder="请重复密码">
                    </div>
                    <div class="msg">{{ msg }}</div>
                    <button type="submit" class="btn btn-primary">注册</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '../../../components/ContentField.vue';
import { ref } from 'vue'
import { useStore } from 'vuex';
import router from '../../../router/index';
import $ from 'jquery'
export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let repeatPassword = ref('');
        let msg = ref('');

        const register = () => {

            if (username.value === "") {
                msg.value = "用户名不能为空";
                return;
            } else if (password.value !== repeatPassword.value) {
                msg.value = "密码不一致";
                return;
            }

            $.ajax({
                url: "http://127.0.0.1:8080/user/account/register/",
                type: "post",
                contentType: 'application/json',
                data: JSON.stringify({
                    username: username.value,
                    password: password.value,
                }),
                success(resp) {
                    if (resp.msg === "success") {
                        router.push({ name: "UserAccountLogin" });
                    } else {
                        msg.value = resp.msg;
                    }
                }
            })
        }

        return {
            username, password, repeatPassword, msg, register,
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