<template>
    <div class="store_wrap">
        <div v-if="!store">
            <store></store>
        </div>
    </div>
</template>

<script>
    import http from '../../../libs/http'
    import store from '../../../components/store'
    export default {
        name: "index",
        components:{store},
        data(){
            return{
                store:false,
            }
        },
        mounted() {
            this.apiGet('/api/user/info').then((res) => {
                if(res.type === 2){
                    if(res.shop){
                        this.store = true;
                        if(this.store){
                            this.$router.push({
                                name: "create_task",
                            });
                        }
                    }
                }else{
                    this.$message({
                        showClose: true,
                        message: '该网站目前只对企业用户开放，请在APP切换身份，请见谅！',
                        duration: 1000
                    });
                    this.$router.push({
                        name: "login"
                    });
                }
            })
        },
        mixins:[http]
    }
</script>

<style scoped>

</style>