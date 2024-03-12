import $ from 'jquery'
export default {
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },
        updateToken(state, token) {
            state.token = token;
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.is_login = false;
            state.token = "";
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "http://127.0.0.1:8080/user/account/token/",
                type: "post",
                contentType: 'application/json',
                data: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
                success(resp) {
                    if (resp.msg === "success") {
                        localStorage.setItem("kob_token", resp.token);
                        context.commit("updateToken", resp.token);
                        // success和error为回调函数，用于展示msg信息
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                    console.log(resp);
                }
            })
        },
        getinfo(context, data) {
            $.ajax({
                url: "http://127.0.0.1:8080/user/account/info/",
                type: "get",
                contentType: 'application/json',
                headers: {
                    Authorization: "Bearer " + context.state.token,
                },
                success(resp) {
                    if (resp.msg === "success") {
                        context.commit("updateUser", {
                            ...resp,
                            is_login: true,
                        })
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                }
            })
        },
        logout(context) {
            localStorage.removeItem("kob_token");
            context.commit("logout");
        }
    },
    modules: {
    }
}