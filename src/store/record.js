export default {
    state: {
        isRecord: false,
        a_step: "",
        b_step: "",
        record_loser:"",
    },
    getters: {
    },
    mutations: {
        updateIsRecord(state, isRecord) {
            state.isRecord = isRecord;
        },
        updateStep(state, { a_step, b_step }) {
            state.a_step = a_step;
            state.b_step = b_step;
        },
        updateRecordLoser(state, record_loser) {
            state.record_loser = record_loser;
        }
    },
    actions: {

    },
    modules: {
    }
}