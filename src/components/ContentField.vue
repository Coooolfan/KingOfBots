<template>
    <div class="container content-field">
        <div class="card" :style="{ 'background-color': computedBackgroundColor }">
            <div class="card-body">
                <slot></slot>
            </div>
            <p class="tips">{{ computedTips }}</p>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        return {
            tips: "这是一个内容区域，可以放置游戏地图、匹配按钮、结果面板等内容"
        }
    },
    computed: {
        computedBackgroundColor() {
            if (useStore().state.pk.status === "matching") return "white"
            return Number(useStore().state.user.id) === Number(useStore().state.pk.b_id) ? '#fff6f6' : "#f6f8fe";
        },
        computedTips() {
            if (useStore().state.pk.status !== "playing") return ""
            return Number(useStore().state.user.id) === Number(useStore().state.pk.b_id) ? '你是红方' : "你是蓝方";
        }
    },
};
</script>

<style scoped>
div.content-field {
    margin-top: 20px;
    margin-bottom: 20px;
}
.tips{
    text-align: center;
    font-size: xx-large;
    color: #666;
}
</style>