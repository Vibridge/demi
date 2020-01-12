<template>
    <div>
        <store></store>
    </div>

</template>

<script>
    import store from '../../../components/store'
    import http from '../../../libs/http'

    export default {
        name: 'index',
        components:{store},
        data(){
            return{

            }
        },
        mounted() {
            this.apiGet('/api/user/info').then((res) => {
                if(res.type === 2){
                    if(res.shop){
                        this.$router.push({
                            name: 'create_goods',
                        });
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

<style lang="stylus">

</style>
