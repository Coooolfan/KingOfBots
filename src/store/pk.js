import $ from 'jquery'
export default {
    state: {
        status: "matching",// matching 表示匹配阶段， playing 表示游戏中
        scoket: null,
        opponent_username: "",
        opponent_photo: "",
        gamemap: null

    },
    getters: {
    },
    mutations: {
        updateSocket(state, socket) {
            state.socket = socket;
        },
        updateOpponent(state, opponent) {
            state.opponent_username = opponent.username;
            state.opponent_photo = opponent.photo;
        },
        updateStatus(state, status) {
            state.status = status;
        },
        updateGamemap(state, gamemap) {
            state.gamemap = gamemap;
        },
    },
    actions: {

    },
    modules: {
    }
}