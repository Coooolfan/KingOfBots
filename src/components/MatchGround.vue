<template>
    <div class="matchgroud">
        <div class="row">
            <div class="col-4">
                <div class="userphoto">
                    <img :src="$store.state.user.photo" alt="">
                </div>
                <div class="username">{{ $store.state.user.username }}</div>
            </div>
            <div class="col-4">
                <select class="form-select bot-selector" aria-label="Default select example" v-model="select_bot">
                    <option selected value="-1">亲自上阵</option>
                    <option v-for="bot in bots" :value="bot.id">{{ bot.title + " (" + bot.language + ")" }}</option>
                </select>
            </div>
            <div class="col-4">
                <div class="userphoto">
                    <img :src="$store.state.pk.opponent_photo" alt="">
                </div>
                <div class="username">{{ $store.state.pk.opponent_username }}</div>
            </div>
            <div class="col-12 btn-div">
                <button type="button" class="btn btn-primary btn-lg" :onclick="click_match_btn">{{ match_btn_info
                    }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex';
import $ from 'jquery';

export default {
    setup() {
        const store = useStore();
        let bots = ref([]);
        let match_btn_info = ref("开始匹配");
        const select_bot = ref(-1);
        const click_match_btn = () => {
            if (match_btn_info.value === "开始匹配") {
                console.log(select_bot.value);
                match_btn_info.value = "取消";
                store.state.pk.socket.send(JSON.stringify({
                    event: "start-matching",
                    bot_id: select_bot.value
                }));
            } else {
                match_btn_info.value = "开始匹配"
                store.state.pk.socket.send(JSON.stringify({
                    event: "stop-matching",
                }));
                
            }
        }
        const refresh_bots = () => {
            $.ajax({
                url: "/api/user/bot/getlist/",
                type: "get",
                contentType: 'application/json',
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    for (let bot of resp) {
                        if (bot.status !== "uncompile") {
                            bots.value.push(bot);
                        }
                    }
                },
            })
        };
        refresh_bots();
        return {
            match_btn_info,
            click_match_btn,
            bots, select_bot
        }
    }
}
</script>

<style scoped>
.matchgroud {
    width: 60vw;
    height: 70vh;
    margin: 40px auto;
}

div.userphoto {
    margin-top: 5vh;
    text-align: center;

}

div.userphoto>img {
    width: 25vh;
    border-radius: 50%;
    border: 2px solid black;
}

div.username {
    text-align: center;
    font-weight: bolder;
    margin-top: 5vh;
}

.btn-div {
    margin-top: 4vh;
    text-align: center;
}

.btn-div>button {
    width: 8rem;
}

.bot-selector {
    margin-top: 20vh;
    width: 100%;
    text-align: center;
}
</style>