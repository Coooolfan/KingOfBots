<template>
    <div class="result-board">
        <div class="result-title" v-if="$store.state.pk.loser === 'all'">
            平局！
        </div>
        <div class="result-title"
            v-else-if="$store.state.pk.loser === 'a' && Number($store.state.pk.a_id) === Number($store.state.user.id)">
            LOSE
        </div>
        <div class="result-title"
            v-else-if="$store.state.pk.loser === 'b' && Number($store.state.pk.b_id) === Number($store.state.user.id)">
            LOSE
        </div>
        <div class="result-title" v-else>
            WIN
        </div>
        <div class=" result-btn">
            <button type="button" class="btn btn-primary btn-lg" @click="restart">再来一局</button>
        </div>

    </div>
</template>
<script>
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();

        const restart = () => {
            store.commit("updateStatus", "matching");
            store.commit("updateLoser", "");
            store.commit("updateOpponent", {
                username: "我的对手",
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
            });

        };
        return { restart }
    }
}

</script>
<style scoped>
div.result-board {
    height: 23vh;
    width: 30vw;
    background-color: rgba(50, 50, 50, 0.6);
    position: absolute;
    top: 30vh;
    left: 31vw;
    border-radius: 5px 5px 5px 5px;
}

.result-title {
    color: azure;
    font-size: xx-large;
    text-align: center;
    font-style: italic;
    padding-top: 3vh;
}

.result-btn {
    padding-top: 5vh;
    text-align: center;
}
</style>