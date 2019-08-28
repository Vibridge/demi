export default {
    state: {
        loading: true,
        initialize: true,
    },

    mutations: {
        initialize(state, status){
            state.initialize = status;
        },
        loading(state, status){
            if(state.initialize && !status){
                state.initialize = false;
            }
            state.loading = status;
        },

    },
}
