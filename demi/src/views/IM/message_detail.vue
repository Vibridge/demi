<template>
    <div class="detail">
        aaaa
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'message_detail',
        props: {
            message: {
                type: Object,
                required: true
            }
        },
        created(){
            console.log(this.message)
        },
        computed: {
            ...mapState({
                currentConversation: state => state.conversation.currentConversation,
                currentUserProfile: state => state.user.currentUserProfile
            }),
            isMine() {
                // console.log(this.currentUserProfile, this.currentConversation);
                return this.message.flow === 'out'
            },
        }
    }
</script>
