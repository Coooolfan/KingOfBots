<template>
    <div class="GameMap" ref="parent">
        <canvas ref="canvas" tabindex="0"></canvas>
    </div>
</template>

<script>
import { GameMap } from '../assets/scripts/GameMap';
import { ref, onMounted } from 'vue';
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        let parent = ref(null);
        let canvas = ref(null);
        onMounted(() => {
            store.commit(
                "updateGameObj",
                new GameMap(canvas.value.getContext('2d'), parent.value, store)
            );

        })
        return {
            parent,
            canvas
        }
    }
}
</script>
<style scoped>
.GameMap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>