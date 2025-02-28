<template>
    <div class="container content-field">
        <div class="card" :style="{ 'background-color': computedBackgroundColor() }">
            <div class="card-body">
                <slot></slot>
            </div>
            <p class="tips">{{ computedTips() }}</p>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const computedBackgroundColor = () => {
            if (store.state.pk.status === "matching") return "white"
            return Number(store.state.user.id) === Number(store.state.pk.b_id) ? '#fff6f6' : "#f6f8fe";
        }

        const computedTips = () => {
            if (store.state.pk.status !== "playing") return ""
            return Number(store.state.user.id) === Number(store.state.pk.b_id) ? '你是红方' : "你是蓝方";
        }

        return {
            computedBackgroundColor,
            computedTips,
        }
    }
};
</script>

<style scoped>
div.content-field {
    margin-top: 20px;
    margin-bottom: 20px;
}

.tips {
    text-align: center;
    font-size: xx-large;
    color: #666;
}
</style>