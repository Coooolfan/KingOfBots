<template>
    <ContentField>
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <div class="card">
                        <div class="card-body">
                            <img :src="$store.state.user.photo" class="avater" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="card">
                        <div class="card-header">
                            <span class="my-bot">我的Bot</span>
                            <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal"
                                data-bs-target="#add-bot-btn">新建Bot</button>

                            <div class="modal fade " id="add-bot-btn" data-bs-backdrop="static" data-bs-keyboard="false"
                                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">新建Bot</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="mb-3">
                                                <label for="bot-title" class="form-label">Bot名称</label>
                                                <input v-model="add_modal.title" type="text" class="form-control"
                                                    id="bot-title" placeholder="输入新建bot的名称">
                                            </div>
                                            <div class="mb-3">
                                                <label for="bot-desc" class="form-label">Bot描述</label>
                                                <input v-model="add_modal.desc" type="text" class="form-control"
                                                    id="bot-desc" placeholder="输入新建bot的描述">
                                            </div>
                                            <div class="mb-3">
                                                <label for="bot-context" class="form-label">Bot代码</label>
                                                <textarea v-model="add_modal.content" class="form-control"
                                                    id="bot-context" rows="8"></textarea>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <span class="add-modal-msg"> {{ add_modal.msg }}</span>
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">取消</button>
                                            <button type="button" class="btn btn-primary" @click="add_bot">提交</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div class="card-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>名称</th>
                                        <th>创建时间</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="bot in bots" :key="bot.id">
                                        <td>{{ bot.title }}</td>
                                        <td>{{ convertToLocaleTime(bot.createtime) }}</td>
                                        <td>
                                            <button type="button" class="btn btn-secondary edit_btu"
                                                data-bs-toggle="modal"
                                                :data-bs-target="'#update-bot-btn-' + bot.id">编辑</button>

                                            <div class="modal fade " :id="'update-bot-btn-' + bot.id"
                                                data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                                                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div class="modal-dialog modal-xl">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="staticBackdropLabel">编辑Bot
                                                            </h1>
                                                            <button type="button" class="btn-close"
                                                                data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="mb-3">
                                                                <label for="bot-title" class="form-label">Bot名称</label>
                                                                <input v-model="bot.title" type="text"
                                                                    class="form-control" id="bot-title"
                                                                    placeholder="输入编辑后bot的名称">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="bot-desc" class="form-label">Bot描述</label>
                                                                <input v-model="bot.description" type="text"
                                                                    class="form-control" id="bot-desc"
                                                                    placeholder="输入编辑后bot的描述">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="bot-context"
                                                                    class="form-label">Bot代码</label>
                                                                <textarea v-model="bot.content" class="form-control"
                                                                    id="bot-context" rows="8"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <span class="add-modal-msg"> {{ add_modal.msg }}</span>
                                                            <button type="button" class="btn btn-secondary"
                                                                data-bs-dismiss="modal">取消</button>
                                                            <button type="button" class="btn btn-primary"
                                                                @click="update_bot(bot)">提交</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <button type="button" class="btn btn-danger"
                                                @click="remove_bot(bot.id)">删除</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from '../../../components/ContentField.vue';
import { ref, reactive } from 'vue'
import $ from 'jquery'
import { useStore } from 'vuex';
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
export default {
    components: {
        ContentField
    },
    methods: {
        convertToLocaleTime(utcDateTime) {
            let date = new Date(utcDateTime + 'Z');
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();

            let pad = function (num) {
                return num < 10 ? '0' + num : num;
            };

            return year + '-' + pad(month) + '-' + pad(day) + ' ' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        }
    },
    setup() {

        const store = useStore();

        let bots = ref([]);
        const add_modal = reactive({
            title: "",
            desc: "",
            content: "",
            msg: "",
        })
        let modal_msg = ref("123");

        const refresh_bots = () => {
            $.ajax({
                url: "http://localhost:8080/user/bot/getlist/",
                type: "get",
                contentType: 'application/json',
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    bots.value = resp;
                    console.log();

                },
            })
        };
        const add_bot = () => {
            add_modal.msg = "提交中……",
                $.ajax({
                    url: "http://localhost:8080/user/bot/add/",
                    type: "POST",
                    contentType: 'application/json',
                    headers: {
                        Authorization: "Bearer " + store.state.user.token,
                    },
                    data: JSON.stringify({
                        title: add_modal.title,
                        desc: add_modal.desc,
                        content: add_modal.content,
                    }),

                    success(resp) {
                        if (resp.msg === "success") {
                            add_modal.content = "";
                            add_modal.title = "";
                            add_modal.desc = "";
                            refresh_bots();
                            add_modal.msg = "";
                            Modal.getInstance('#add-bot-btn').hide();
                        } else {
                            add_modal.msg = resp.msg;
                        }
                    },
                })
        };
        const remove_bot = (bot_id) => {
            $.ajax({
                url: "http://localhost:8080/user/bot/remove/",
                type: "POST",
                contentType: 'application/json',
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                data: JSON.stringify({
                    bot_id: bot_id,
                }),

                success(resp) {
                    refresh_bots();
                    if (resp.msg === "success") {
                    } else {
                    }
                },
            })
        };
        const update_bot = (bot) => {
            add_modal.msg = "提交中……",
                $.ajax({
                    url: "http://localhost:8080/user/bot/update/",
                    type: "POST",
                    contentType: 'application/json',
                    headers: {
                        Authorization: "Bearer " + store.state.user.token,
                    },
                    data: JSON.stringify({
                        bot_id: bot.id,
                        title: bot.title,
                        desc: bot.desc,
                        content: bot.content,
                    }),
                    success(resp) {
                        console.log(resp);
                        if (resp.msg === "success") {
                            add_modal.content = "";
                            add_modal.title = "";
                            add_modal.desc = "";
                            refresh_bots();
                            add_modal.msg = "";
                            Modal.getInstance('#update-bot-btn-' + bot.id).hide();
                        } else {
                            add_modal.msg = resp.msg;
                        }
                    },
                })
        };
        refresh_bots();
        return {
            bots, modal_msg, add_bot, add_modal, remove_bot, update_bot
        }
    }
}
</script>
<style scoped>
.avater {
    width: 100%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.my-bot {
    font-size: 1.2rem;
}

.edit_btu {
    margin-right: 1rem;
}

.add-modal-msg {
    color: red;
}
</style>