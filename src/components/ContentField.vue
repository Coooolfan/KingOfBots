<template>
    <div class="container content-field">
        <div class="card" :style="{ 'background-color': computedBackgroundColor }">
            <div class="card-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    computed: {
        computedBackgroundColor() {
            if (useStore().state.pk.status === "matching") return "white"
            return Number(useStore().state.user.id) === Number(useStore().state.pk.b_id) ? '#fff6f6' : "#f6f8fe";
        },
    },
};
</script>

<style scoped>
div.content-field {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>