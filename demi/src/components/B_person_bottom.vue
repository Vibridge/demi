<template>
    <div class="all_bottom">
        <div class="all_bottom_content">
            <div>
                <img src="../assets/img/DEMI@2x.png" alt="">
                <p>服务热线：02031148487</p>
                <p>企业邮箱：1154880471@qq.com</p>
            </div>
            <div>
                <p style="color: #4d4d4d;font-size: 14px;margin-bottom: 21px">服务支持</p>
                <p>得米VIP服务</p>
                <p>人才搜索</p>
                <p>得米APP</p>
            </div>
            <div>
                <p style="color: #4d4d4d;font-size: 14px;margin-bottom: 21px">意见服务</p>
                <p>意见反馈</p>
                <p @click="dialogVisible = true">用户服务协议</p>
            </div>
            <div>
                <img src="../assets/img/download.png" alt="">
                <p>得米APP</p>
            </div>
        </div>
        <div class="all_bottom_copy">
            <span style="margin-right: 61px">@2019得米快找网  京ICP备14023790号-2</span>
            <span style="margin-right: 58px">京公网安备 11010802024043号</span>
            <span>电子营业执照</span>
        </div>
        <el-dialog
                title="得米服务协议"
                :visible.sync="dialogVisible"
                width="1000px"
                :before-close="handleClose">
            <XieYi></XieYi>
        </el-dialog>
    </div>

</template>

<script>
    import XieYi from './xieyi'
    export default {
        name: 'B_person_bottom',
        components:{
            XieYi
        },
        data(){
            return{
                dialogVisible:false
            }
        }
    }
</script>

<style type="text/less" lang="less">
    .all_bottom {
        width: 100%;
        height: 220px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.03);
        p{
            cursor: pointer;
        }
        .all_bottom_content {
            width: 1000px;
            height: 176px;
            margin: 32px auto 0 auto;
            padding-top: 24px;
            display: flex;
            box-sizing: border-box;

            div {
                height: 100%;
                color: #999999;
                font-size: 12px;
                text-align: left;
            }

            div:nth-child(1) {
                margin-top: 8px;
                font-size: 13px;
                margin-right: 169px;

                img {
                    width: 88px;
                    margin-bottom: 22px;
                    display: block;
                }

                p {
                    margin-bottom: 14px;
                }
            }

            div:nth-child(2) {
                margin-top: 15px;
                margin-right: 195px;

                p {
                    margin-bottom: 14px;
                }
            }

            div:nth-child(3) {
                margin-top: 15px;
                margin-right: 193px;

                p {
                    margin-bottom: 14px;
                }
            }

            div:nth-child(4) {
                text-align: center;

                img {
                    width: 102px;
                    margin-bottom: 14px;
                }

                p {
                    font-size: 14px;
                }
            }
        }

        .all_bottom_copy {
            width: 1000px;
            height: 43px;
            border-top: 1px solid #E6E6E6;
            font-size: 12px;
            color: #999999;
            text-align: center;
            padding-top: 14px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 1);
            margin: 0 auto;
        }
    }
</style>
