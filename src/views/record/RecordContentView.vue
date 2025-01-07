<template>
    <ContentField>
        <PlayGround></PlayGround>
    </ContentField>
</template>

<script>
import ContentField from '../../components/ContentField.vue';
import PlayGround from '../../components/PlayGround.vue';
import MatchGround from '../../components/MatchGround.vue';
import ResultBoard from '../../components/ResultBoard.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
export default {
    components: {
        ContentField,
        PlayGround,
        MatchGround,
        ResultBoard
    },
    setup() {
    }
}
</script>
<style scoped></style>