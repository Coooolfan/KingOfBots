<template>
    <div class="matchgroud">
        <div class="row">
            <div class="col-6">
                <div class="userphoto">
                    <img :src="$store.state.user.photo" alt="">
                </div>
                <div class="username">{{ $store.state.user.username }}</div>
            </div>
            <div class="col-6">
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


export default {
    setup() {
        const store = useStore();
        let match_btn_info = ref("开始匹配");
        const click_match_btn = () => {
            if (match_btn_info.value === "开始匹配") {
                match_btn_info.value = "取消";
                store.state.pk.socket.send(JSON.stringify({
                    event: "start-matching",
                }));
            } else {
                match_btn_info.value = "开始匹配"
                store.state.pk.socket.send(JSON.stringify({
                    event: "stop-matching",
                }));

            }
        }
        return {
            match_btn_info,
            click_match_btn
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
</style>