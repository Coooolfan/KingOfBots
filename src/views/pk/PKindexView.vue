<template>
    <ContentField>
        <PlayGround v-if="$store.state.pk.status === 'playing'"></PlayGround>
        <MatchGround v-if="$store.state.pk.status === 'matching'"></MatchGround>
    </ContentField>
</template>

<script>
import ContentField from '../../components/ContentField.vue';
import PlayGround from '../../components/PlayGround.vue';
import MatchGround from '../../components/MatchGround.vue'
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
export default {
    components: {
        ContentField,
        PlayGround,
        MatchGround
    },
    setup() {
        const store = useStore();
        const socketUrl = `ws://localhost:8080/websocket/${store.state.user.token}/`;
        let socket = null;
        onMounted(() => {
            store.commit("updateOpponent", {
                username: "我的对手",
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
            })
            socket = new WebSocket(socketUrl);
            socket.onopen = () => {
                console.log("connected!");
                store.commit("updateSocket", socket);

            }
            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.event === "start-matching") {  // 匹配成功
                    store.commit("updateOpponent", {
                        username: data.opponent_username,
                        photo: data.opponent_photo,
                    });
                    store.commit("updateStatus", "playing");
                    store.commit("updateGame", data.game);
                } else if (data.event === "move") {
                    const game = store.state.pk.gameObj;
                    const [snake0, snake1] = game.snakes
                    snake0.set_dirction(data.a_direction);
                    snake1.set_dirction(data.b_direction);
                } else if (data.event === "result") {
                    const game = store.state.pk.gameObj;
                    const [snake0, snake1] = game.snakes;
                    if (data.loser === "all" || data.loser === "a") {
                        snake0.status = "die";
                    }
                    if (data.loser === "all" || data.loser === "b") {
                        snake1.status = "die";
                    }
                }

            }

            socket.onclose = () => {
                console.log("closed!!!");
            }
        });

        onUnmounted(() => {
            socket.close();
            store.commit("updateStatus", "matching");
        })
    }
}
</script>
<style scoped></style>