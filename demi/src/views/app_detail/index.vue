<template>
    <div class="detail_wrap">
        <div class="first">
            <div class="first-main">
                <div class="step">
                    <img src="../../assets/img/detail_3.png" alt="">
                </div>
                <div class="e-w-m">
                    <img src="../../assets/img/wx.png" alt="">
                    <p>扫二维码下载得米APP</p>
                </div>
                <div class="index">
                    <img src="../../assets/img/detail_5.png" alt="">
                </div>
                <div class="note">
                    <p>聚天下之英才而用之</p>
                    <p>Gather the talent of the world</p>
                </div>
            </div>
        </div>
        <div class="second">
            <div class="second-main">
                <div class="left"><img src="../../assets/img/detail_1.png" alt=""></div>
                <div class="right"><img src="../../assets/img/detail_6.png" alt=""></div>
            </div>
        </div>
        <div class="third">
            <div class="third-main">
                <p>
                    Video interview allows direct<br/>
                    face-to-face communication with candidates from afar
                </p>
                <div class="middle">
                    <div class="left">
                        <img src="../../assets/img/detail_8.png" alt="">
                        <p class="one">
                            1.为了使人才与优质企业互动更高效，得米为你提供相应的视频简历、
                            视频面试、对口专业招聘专场等模式对个人用户进行人才筛选</p>
                        <p class="two">
                            2.得米为企业和求职者精准对接，视频简历能让企业更立体了解求职者，
                            视频面试可以突破时间和地域，使企业招人更高效
                        </p>
                        <p class="three">
                            3.得米特有任务广场系统供企业发布短需求工种，并配有人才评价系统、
                            钱包结算系统等功能。能有效为企业降低用人、试错成本，拓宽市场渠道.
                        </p>
                    </div>
                    <div class="right">
                        <img src="../../assets/img/detail_4.png" alt="">
                    </div>
                </div>
                <div class="bottom">
                    <img src="../../assets/img/detail_7.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index'
    }
</script>

<style lang="less">
    .detail_wrap{
        width: 100%;
        height: 100%;
        .first{
            width: 100%;
            height:1080px;
            background:rgba(36,191,255,1);
            .first-main{
                width: 1050px;
                height: 90%;
                margin: 0 auto;
                background-image: url('../../assets/img/detail_9.png');
                background-size: 100%;
                position: relative;
                .step{
                    position: absolute;
                    top:108px;
                    left: 70px;
                    img{
                        width: 228px;
                    }
                }
                .e-w-m{
                    position: absolute;
                    top: 400px;
                    left: 222px;
                    img{
                        width: 164px;
                        margin-bottom: 30px;
                    }
                    p{
                        width:140px;
                        font-size:14px;
                        color:rgba(255,255,255,1);
                        margin: 0 auto;
                    }
                }
                .index{
                    position: absolute;
                    top: 209px;
                    right: 61px;
                    img{
                        width: 487px;
                    }
                }
                .note{
                    position: absolute;
                    left:50%;
                    transform: translateX(-50%);
                    top: 907px;
                    p:nth-child(1){
                        font-size:22px;
                        color:rgba(255,255,255,1);
                        margin-bottom: 12px;
                    }
                    p:nth-child(2){
                        font-size:12px;
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }
        .second{
            width: 100%;
            height:1080px;
            .second-main{
                width: 963px;
                margin: 37px auto;
                display: flex;
                justify-content: center;
                .left{
                    align-self: center;
                    img{
                        width: 835px;
                    }
                }
                .right{
                    align-self: flex-end;
                    img{
                        width: 37px;
                    }
                }


            }
        }
        .third{
            width: 100%;
            height: 1080px;
            .third-main{
                width: 963px;
                margin: 0 auto;
                text-align: right;
                p{
                    font-size:12px;
                    color:rgba(179,179,179,1);
                    line-height:20px;
                }
                .middle{
                    display: flex;
                    justify-content: space-between;
                    text-align: left;
                    margin-top: 50px;
                    margin-bottom: 157px;
                    .left{
                        width: 596px;
                        align-self: center;
                        img{
                            width: 210px;
                            margin-bottom: 50px;
                        }
                        .one, .two, .three{
                            font-size:16px;
                            color:rgba(153,153,153,1);
                            margin-bottom: 56px;
                        }
                    }
                    .right{
                        align-self: center;
                        width: 302px;
                        img{
                            width: 302px;
                        }
                    }
                }
                .bottom{
                    img{
                        width: 211px;
                    }
                }
            }
        }
    }
</style>