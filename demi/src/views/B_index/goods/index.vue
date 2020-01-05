<template>
    <div>
        <store></store>
    </div>

</template>

<script>
    import store from '../../../components/store'
    export default {
        name: 'index',
        components:{store},
        data(){
            return{
                store:false
            }
        }
    }
</script>

<style lang="stylus">

</style>
