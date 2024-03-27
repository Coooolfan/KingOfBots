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
                photo:"https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
            })
            socket = new WebSocket(socketUrl);
            socket.onopen = () => {

            }
            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                console.log(data);
            }

            socket.onclose = () => {
                console.log("closed!!!");
            }
        });

        onUnmounted(() => {
            socket.close();
        })
    }
}
</script>
<style scoped></style>