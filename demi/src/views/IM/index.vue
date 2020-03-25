<template>
    <div class="im_wrap">
        <div
                class="loading"
                v-loading="showLoading"
                element-loading-text="正在拼命初始化..."
                element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <div class="chat-wrapper">
                <el-row>
                    <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="9">
                        <side-bar/>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="14" :lg="14" :xl="15">
                        <current-conversation :work_label="work_label"/>
                    </el-col>
                </el-row>
            </div>
            <image-previewer/>
        </div>

    </div>

</template>

<script>
    import {mapState} from 'vuex'
    import CurrentConversation from './conversation/current-conversation'
    import SideBar from './layout/side-bar'
    import ImagePreviewer from './message/image-previewer.vue'
    import http from '../../libs/http';

    export default {
        title: 'TIMSDK DEMO',
        data(){
            return{
                work_label:null
            }
        },
        components: {
            // Login,
            SideBar,
            CurrentConversation,
            ImagePreviewer
        },

        computed: {
            ...mapState({
                currentUserProfile: state => state.user.currentUserProfile,
                currentConversation: state => state.conversation.currentConversation,
                isLogin: state => state.user.isLogin,
                isSDKReady: state => state.user.isSDKReady
            }),
            // 是否显示 Loading 状态
            showLoading() {
                return !this.isSDKReady
            }
        },

        mounted() {
            this.apiGet('/labels?id=967').then((res) => {
                this.work_label = res
            });
        },
        mixins:[http]

    }
</script>

<style lang="stylus" type="text/stylus">
    .im_wrap
        overflow hidden
        margin 0
        font-family "Microsoft YaHei", "微软雅黑", "MicrosoftJhengHei", "Lantinghei SC", "Open Sans", Arial, "Hiragino Sans GB", "STHeiti", "WenQuanYi Micro Hei", SimSun, sans-serif
        // font-family  "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif
        // text-shadow: $regular 0 0 0.05em
        background-color rgba(245,245,247,1)
        -ms-scroll-chaining: chained;
        -ms-overflow-style: none;
        -ms-content-zooming: zoom;
        -ms-scroll-rails: none;
        -ms-content-zoom-limit-min: 100%;
        -ms-content-zoom-limit-max: 500%;
        -ms-scroll-snap-type: proximity;
        -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
        -ms-overflow-style: none;
        overflow: auto;

        div
            box-sizing border-box

            &::before
            &::after
                box-sizing border-box

    /*#wrapper {
      display: flex;
      justify-content: center;
      padding-top: 100px;
    }*/
    // TODO filter mac chrome 会有问题，下次修改可以去掉
    /*
    .bg
      position absolute
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      background url('/assets/image/bg.jpg') no-repeat 0 0
      background-size cover
      // filter blur(67px)
    */

    .loading {
        width: 100vw;
        display: flex;
        justify-content: center;
    }

    .text-ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .chat-wrapper
        margin-top: 8vh
        width $width
        height $height
        max-width 1280px
        border: 1px solid rgba(230, 230, 230, 1);

    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width: 3px;
        height: 3px;
    }

    /* 滚动槽 */
    ::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.1);
    }
</style>
