<template>
    <div class="detail_wrap">
        <swiper :options="swiperOption">
            <swiper-slide>
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
            </swiper-slide>
            <swiper-slide>
                <div class="second">
                    <div class="second-main">
                        <div class="second-left"><img src="../../assets/img/detail_1.png" alt=""></div>
                        <div class="second-right"><img src="../../assets/img/detail_6.png" alt=""></div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
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
            </swiper-slide>
            <div class="swiper-pagination"></div>
        </swiper>

    </div>
</template>

<script>
    // import Swiper from '../../../node_modules/swiper/js/swiper.esm.bundle';
    export default {
        name: 'index',
        data() {
            return {
                swiperOption: {
                    direction : 'vertical',
                    mousewheelControl:true,
                    height : window.innerHeight,
                    pagination: '.swiper-pagination',
                    paginationClickable :true,
                    speed:700,
                }
            }
        },
    }
</script>

<style lang="less">
   /* .swiper-container{
        position: relative;
        overflow: hidden;
        .swiper-pagination{
            right: 10px;
            !*top: 50%;*!
            -webkit-transform: translate3d(0,-50%,0);
            -moz-transform: translate3d(0,-50%,0);
            -o-transform: translate(0,-50%);
            -ms-transform: translate3d(0,-50%,0);
            transform: translate3d(0,-50%,0);
            display: flex;
            flex-direction: column;
            .swiper-pagination-bullet{
                margin: 5px 0;

            }
        }
    }*/
    /*@media screen and (max-width: 800px) {
        .detail_wrap {
            width: 100%;
            height: 100%;
            overflow-y: hidden;

            .first {
                width: 100%;
                height: 100%;
                background: rgba(36, 191, 255, 1);

                .first-main {
                    width: 438px;
                    height: 100%;
                    margin: 0 auto;
                    background-image: url('../../assets/img/detail_9.png');
                    background-size: 100%;
                    position: relative;

                    .step {
                        position: absolute;
                        top: 45px;
                        left: 29px;
                        width: 95px;

                        img {
                            width: 100%;
                        }
                    }

                    .e-w-m {
                        position: absolute;
                        top: 167px;
                        left: 93px;
                        width: 68px;

                        img {
                            width: 100%;
                            margin-bottom: 13px;
                        }

                        p {
                            font-size: 6px;
                            color: rgba(255, 255, 255, 1);
                            margin: 0 auto;
                        }
                    }

                    .index {
                        position: absolute;
                        top: 87px;
                        right: 25px;
                        width: 203px;

                        img {
                            width: 100%;
                        }
                    }

                    .note {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 378px;

                        p:nth-child(1) {
                            font-size: 9px;
                            color: rgba(255, 255, 255, 1);
                            margin-bottom: 5px;
                        }

                        p:nth-child(2) {
                            font-size: 5px;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }

            .second {
                width: 100%;
                height: 450px;

                .second-main {
                    width: 393px;
                    margin: 15px auto;
                    display: flex;
                    justify-content: center;

                    .left {
                        align-self: center;

                        img {
                            width: 348px;
                        }
                    }

                    .right {
                        align-self: flex-end;

                        img {
                            width: 15px;
                        }
                    }


                }
            }

            .third {
                width: 100%;
                height: 450px;

                .third-main {
                    width: 393px;
                    margin: 15px auto;
                    text-align: right;

                    p {
                        font-size: 5px;
                        color: rgba(179, 179, 179, 1);
                        line-height: 8px;
                    }

                    .middle {
                        display: flex;
                        justify-content: space-between;
                        text-align: left;
                        margin-top: 21px;
                        margin-bottom: 65px;

                        .left {
                            width: 248px;
                            align-self: center;

                            img {
                                width: 88px;
                                margin-bottom: 21px;
                            }

                            .one, .two, .three {
                                font-size: 8px;
                                color: rgba(153, 153, 153, 1);
                                margin-bottom: 23px;
                                line-height:13px;
                            }
                        }

                        .right {
                            align-self: center;
                            width: 126px;

                            img {
                                width: 126px;
                            }
                        }
                    }

                    .bottom {
                        img {
                            width: 88px;
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 800px) and (max-width: 1280px) {
        .detail_wrap {
            width: 100%;
            height: 100%;
            overflow-y: hidden;

            .first {
                width: 100%;
                height: 100%;
                background: rgba(36, 191, 255, 1);

                .first-main {
                    width: 438px;
                    height: 450px;
                    margin: 0 auto;
                    background-image: url('../../assets/img/detail_9.png');
                    background-size: 100%;
                    position: relative;

                    .step {
                        position: absolute;
                        top: 45px;
                        left: 29px;
                        width: 95px;

                        img {
                            width: 100%;
                        }
                    }

                    .e-w-m {
                        position: absolute;
                        top: 167px;
                        left: 93px;
                        width: 68px;

                        img {
                            width: 100%;
                            margin-bottom: 13px;
                        }

                        p {
                            font-size: 6px;
                            color: rgba(255, 255, 255, 1);
                            margin: 0 auto;
                        }
                    }

                    .index {
                        position: absolute;
                        top: 87px;
                        right: 25px;
                        width: 203px;

                        img {
                            width: 100%;
                        }
                    }

                    .note {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 378px;

                        p:nth-child(1) {
                            font-size: 9px;
                            color: rgba(255, 255, 255, 1);
                            margin-bottom: 5px;
                        }

                        p:nth-child(2) {
                            font-size: 5px;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }

            .second {
                width: 100%;
                height: 450px;

                .second-main {
                    width: 393px;
                    margin: 15px auto;
                    display: flex;
                    justify-content: center;

                    .left {
                        align-self: center;

                        img {
                            width: 348px;
                        }
                    }

                    .right {
                        align-self: flex-end;

                        img {
                            width: 15px;
                        }
                    }


                }
            }

            .third {
                width: 100%;
                height: 450px;

                .third-main {
                    width: 393px;
                    margin: 15px auto;
                    text-align: right;

                    p {
                        font-size: 5px;
                        color: rgba(179, 179, 179, 1);
                        line-height: 8px;
                    }

                    .middle {
                        display: flex;
                        justify-content: space-between;
                        text-align: left;
                        margin-top: 21px;
                        margin-bottom: 65px;

                        .left {
                            width: 248px;
                            align-self: center;

                            img {
                                width: 88px;
                                margin-bottom: 21px;
                            }

                            .one, .two, .three {
                                font-size: 8px;
                                color: rgba(153, 153, 153, 1);
                                margin-bottom: 23px;
                                line-height:13px;
                            }
                        }

                        .right {
                            align-self: center;
                            width: 126px;

                            img {
                                width: 126px;
                            }
                        }
                    }

                    .bottom {
                        img {
                            width: 88px;
                        }
                    }
                }
            }
        }
    }
    !*@media screen and (min-width: 800px) and (max-width: 1280px) {
        .detail_wrap {
            width: 100%;
            height: 100%;
            overflow-y: hidden;

            .first {
                width: 100%;
                height: 100%;
                background: rgba(36, 191, 255, 1);

                .first-main {
                    width: 701px;
                    height: 720px;
                    margin: 0 auto;
                    background-image: url('../../assets/img/detail_9.png');
                    background-size: 100%;
                    position: relative;

                    .step {
                        position: absolute;
                        top: 72px;
                        left: 47px;
                        width: 152px;

                        img {
                            width: 100%;
                        }
                    }

                    .e-w-m {
                        position: absolute;
                        top: 267px;
                        left: 148px;
                        width: 109px;

                        img {
                            width: 100%;
                            margin-bottom: 20px;
                        }

                        p {
                            font-size: 9px;
                            color: rgba(255, 255, 255, 1);
                            margin: 0 auto;
                        }
                    }

                    .index {
                        position: absolute;
                        top: 139px;
                        right: 41px;
                        width: 325px;

                        img {
                            width: 100%;
                        }
                    }

                    .note {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 605px;

                        p:nth-child(1) {
                            font-size: 9px;
                            color: rgba(255, 255, 255, 1);
                            margin-bottom: 8px;
                        }

                        p:nth-child(2) {
                            font-size: 8px;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }

            .second {
                width: 100%;
                height: 720px;

                .second-main {
                    width: 629px;
                    margin: 25px auto;
                    display: flex;
                    justify-content: center;

                    .left {
                        align-self: center;

                        img {
                            width: 557px;
                        }
                    }

                    .right {
                        align-self: flex-end;

                        img {
                            width: 25px;
                        }
                    }


                }
            }

            .third {
                width: 100%;
                height: 720px;

                .third-main {
                    width: 629px;
                    margin: 25px auto;
                    text-align: right;

                    p {
                        font-size: 8px;
                        color: rgba(179, 179, 179, 1);
                        line-height: 13px;
                    }

                    .middle {
                        display: flex;
                        justify-content: space-between;
                        text-align: left;
                        margin-top: 33px;
                        margin-bottom: 105px;

                        .left {
                            width: 397px;
                            align-self: center;

                            img {
                                width: 140px;
                                margin-bottom: 33px;
                            }

                            .one, .two, .three {
                                font-size: 12px;
                                color: rgba(153, 153, 153, 1);
                                margin-bottom: 37px;
                                line-height:21px;
                            }
                        }

                        .right {
                            align-self: center;
                            width: 201px;

                            img {
                                width: 100%;
                            }
                        }
                    }

                    .bottom {
                        img {
                            width: 141px;
                        }
                    }
                }
            }
        }
    }*!

    @media screen and (min-width: 1280px) and (max-width: 1440px) {
        .detail_wrap {
            width: 100%;
            height: 100%;
            overflow-y: hidden;

            .first {
                width: 100%;
                height: 100%;
                background: rgba(36, 191, 255, 1);

                .first-main {
                    width: 701px;
                    height: 720px;
                    margin: 0 auto;
                    background-image: url('../../assets/img/detail_9.png');
                    background-size: 100%;
                    position: relative;

                    .step {
                        position: absolute;
                        top: 72px;
                        left: 47px;
                        width: 152px;

                        img {
                            width: 100%;
                        }
                    }

                    .e-w-m {
                        position: absolute;
                        top: 267px;
                        left: 148px;
                        width: 109px;

                        img {
                            width: 100%;
                            margin-bottom: 20px;
                        }

                        p {
                            font-size: 9px;
                            color: rgba(255, 255, 255, 1);
                            margin: 0 auto;
                        }
                    }

                    .index {
                        position: absolute;
                        top: 139px;
                        right: 41px;
                        width: 325px;

                        img {
                            width: 100%;
                        }
                    }

                    .note {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 605px;

                        p:nth-child(1) {
                            font-size: 9px;
                            color: rgba(255, 255, 255, 1);
                            margin-bottom: 8px;
                        }

                        p:nth-child(2) {
                            font-size: 8px;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }

            .second {
                width: 100%;
                height: 720px;

                .second-main {
                    width: 629px;
                    margin: 25px auto;
                    display: flex;
                    justify-content: center;

                    .left {
                        align-self: center;

                        img {
                            width: 557px;
                        }
                    }

                    .right {
                        align-self: flex-end;

                        img {
                            width: 25px;
                        }
                    }


                }
            }

            .third {
                width: 100%;
                height: 720px;

                .third-main {
                    width: 629px;
                    margin: 25px auto;
                    text-align: right;

                    p {
                        font-size: 8px;
                        color: rgba(179, 179, 179, 1);
                        line-height: 13px;
                    }

                    .middle {
                        display: flex;
                        justify-content: space-between;
                        text-align: left;
                        margin-top: 33px;
                        margin-bottom: 105px;

                        .left {
                            width: 397px;
                            align-self: center;

                            img {
                                width: 140px;
                                margin-bottom: 33px;
                            }

                            .one, .two, .three {
                                font-size: 12px;
                                color: rgba(153, 153, 153, 1);
                                margin-bottom: 37px;
                                line-height:21px;
                            }
                        }

                        .right {
                            align-self: center;
                            width: 201px;

                            img {
                                width: 100%;
                            }
                        }
                    }

                    .bottom {
                        img {
                            width: 141px;
                        }
                    }
                }
            }
        }
    }

    @media screen and (min-width: 1440px) and (max-width: 1600px) {
        .detail_wrap {
            width: 100%;
            height: 100%;
            overflow-y: hidden;

            .first {
                width: 100%;
                height: 810px;
                background: rgba(36, 191, 255, 1);

                .first-main {
                    width: 789px;
                    height: 100%;
                    margin: 0 auto;
                    background-image: url('../../assets/img/detail_9.png');
                    background-size: 100%;
                    position: relative;

                    .step {
                        position: absolute;
                        top: 81px;
                        left: 53px;
                        width: 171px;

                        img {
                            width: 100%;
                        }
                    }

                    .e-w-m {
                        position: absolute;
                        top: 300px;
                        left: 167px;
                        width: 123px;

                        img {
                            width: 100%;
                            margin-bottom: 23px;
                        }

                        p {
                            font-size: 11px;
                            color: rgba(255, 255, 255, 1);
                            margin: 0 auto;
                        }
                    }

                    .index {
                        position: absolute;
                        top: 157px;
                        right: 46px;
                        width: 365px;

                        img {
                            width: 100%;
                        }
                    }

                    .note {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 680px;

                        p:nth-child(1) {
                            font-size: 17px;
                            color: rgba(255, 255, 255, 1);
                            margin-bottom: 9px;
                        }

                        p:nth-child(2) {
                            font-size: 9px;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }

            .second {
                width: 100%;
                height: 860px;

                .second-main {
                    width: 709px;
                    margin: 28px auto;
                    display: flex;
                    justify-content: center;

                    .left {
                        align-self: center;

                        img {
                            width: 626px;
                        }
                    }

                    .right {
                        align-self: flex-end;

                        img {
                            width: 28px;
                        }
                    }


                }
            }

            .third {
                width: 100%;
                height: 810px;

                .third-main {
                    width: 709px;
                    margin: 28px auto;
                    text-align: right;

                    p {
                        font-size: 9px;
                        color: rgba(179, 179, 179, 1);
                        line-height: 15px;
                    }

                    .middle {
                        display: flex;
                        justify-content: space-between;
                        text-align: left;
                        margin-top: 38px;
                        margin-bottom: 118px;

                        .left {
                            width: 447px;
                            align-self: center;

                            img {
                                width: 158px;
                                margin-bottom: 38px;
                            }

                            .one, .two, .three {
                                font-size: 14px;
                                color: rgba(153, 153, 153, 1);
                                margin-bottom: 42px;
                                line-height:23px;
                            }
                        }

                        .right {
                            align-self: center;
                            width: 227px;

                            img {
                                width: 100%;
                            }
                        }
                    }

                    .bottom {
                        img {
                            width: 158px;
                        }
                    }
                }
            }
        }

    }

    @media screen and (min-width: 1600px) and (max-width: 1920px) {
        .detail_wrap {
            width: 100%;
            height: 100%;
            overflow-y: hidden;

            .first {
                width: 100%;
                height: 100%;
                background: rgba(36, 191, 255, 1);

                .first-main {
                    width: 877px;
                    height: 900px;
                    margin: 0 auto;
                    background-image: url('../../assets/img/detail_9.png');
                    background-size: 100%;
                    position: relative;

                    .step {
                        position: absolute;
                        top: 90px;
                        left: 58px;
                        width: 190px;

                        img {
                            width: 100%;
                        }
                    }

                    .e-w-m {
                        position: absolute;
                        top: 333px;
                        left: 185px;
                        width: 137px;

                        img {
                            width: 100%;
                            margin-bottom: 25px;
                        }

                        p {
                            font-size: 12px;
                            color: rgba(255, 255, 255, 1);
                            margin: 0 auto;
                        }
                    }

                    .index {
                        position: absolute;
                        top: 174px;
                        right: 51px;
                        width: 406px;

                        img {
                            width: 100%;
                        }
                    }

                    .note {
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        top: 756px;

                        p:nth-child(1) {
                            font-size: 18px;
                            color: rgba(255, 255, 255, 1);
                            margin-bottom: 10px;
                        }

                        p:nth-child(2) {
                            font-size: 10px;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }

            .second {
                width: 100%;
                height: 900px;

                .second-main {
                    width: 787px;
                    margin: 32px auto;
                    display: flex;
                    justify-content: center;

                    .left {
                        align-self: center;

                        img {
                            width: 696px;
                        }
                    }

                    .right {
                        align-self: flex-end;

                        img {
                            width: 31px;
                        }
                    }


                }
            }

            .third {
                width: 100%;
                height: 900px;

                .third-main {
                    width: 787px;
                    margin: 32px auto;
                    text-align: right;

                    p {
                        font-size: 10px;
                        color: rgba(179, 179, 179, 1);
                        line-height: 16px;
                    }

                    .middle {
                        display: flex;
                        justify-content: space-between;
                        text-align: left;
                        margin-top: 42px;
                        margin-bottom: 131px;

                        .left {
                            width: 497px;
                            align-self: center;

                            img {
                                width: 175px;
                                margin-bottom: 42px;
                            }

                            .one, .two, .three {
                                font-size: 15px;
                                color: rgba(153, 153, 153, 1);
                                margin-bottom: 47px;
                                line-height:27px;
                            }
                        }

                        .right {
                            align-self: center;
                            width: 252px;

                            img {
                                width: 100%;
                            }
                        }
                    }

                    .bottom {
                        img {
                            width: 176px;
                        }
                    }
                }
            }
        }
    }
    !*.detail_wrap {
        width: 100%;
        height: 100%;
        overflow-y: hidden;

        .first {
            width: 100%;
            height: 100%;
            background: rgba(36, 191, 255, 1);

            .first-main {
                width: 1052px;
                height: 1080px;
                margin: 0 auto;
                background-image: url('../../assets/img/detail_9.png');
                background-size: 100%;
                position: relative;

                .step {
                    position: absolute;
                    top: 108px;
                    left: 70px;
                    width: 228px;

                    img {
                        width: 100%;
                    }
                }

                .e-w-m {
                    position: absolute;
                    top: 400px;
                    left: 222px;
                    width: 164px;

                    img {
                        width: 100%;
                        margin-bottom: 30px;
                    }

                    p {
                        width: 140px;
                        font-size: 14px;
                        color: rgba(255, 255, 255, 1);
                        margin: 0 auto;
                    }
                }

                .index {
                    position: absolute;
                    top: 209px;
                    right: 61px;
                    width: 487px;

                    img {
                        width: 100%;
                    }
                }

                .note {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 907px;

                    p:nth-child(1) {
                        font-size: 22px;
                        color: rgba(255, 255, 255, 1);
                        margin-bottom: 12px;
                    }

                    p:nth-child(2) {
                        font-size: 12px;
                        color: rgba(255, 255, 255, 1);
                    }
                }
            }
        }

        .second {
            width: 100%;
            height: 1080px;

            .second-main {
                width: 963px;
                margin: 37px auto;
                display: flex;
                justify-content: center;

                .left {
                    align-self: center;

                    img {
                        width: 835px;
                    }
                }

                .right {
                    align-self: flex-end;

                    img {
                        width: 37px;
                    }
                }


            }
        }

        .third {
            width: 100%;
            height: 1080px;

            .third-main {
                width: 963px;
                margin: 37px auto;
                text-align: right;

                p {
                    font-size: 12px;
                    color: rgba(179, 179, 179, 1);
                    line-height: 20px;
                }

                .middle {
                    display: flex;
                    justify-content: space-between;
                    text-align: left;
                    margin-top: 50px;
                    margin-bottom: 157px;

                    .left {
                        width: 596px;
                        align-self: center;

                        img {
                            width: 210px;
                            margin-bottom: 50px;
                        }

                        .one, .two, .three {
                            font-size: 16px;
                            color: rgba(153, 153, 153, 1);
                            margin-bottom: 56px;
                            line-height:31px;
                        }
                    }

                    .right {
                        align-self: center;
                        width: 302px;

                        img {
                            width: 302px;
                        }
                    }
                }

                .bottom {
                    img {
                        width: 211px;
                    }
                }
            }
        }
    }*!*/
    .detail_wrap{
        width: 100%;
        height: calc(100vh - 50px);
        .first{
            width: 100%;
            height: 100%;
            background: rgba(36, 191, 255, 1);
            position: relative;
            .first-main{
                width: 54.79%;
                margin: 0 auto;
                background-image: url('../../assets/img/detail_9.png');
                background-size: 100%;
                .step {
                    /*position: absolute;
                    top: 45px;
                    left: 29px;*/
                    width: 21.67%;
                    padding: 12vh 0 0 6.65%;

                    img {
                        width: 100%;
                    }
                }
                .e-w-m {
                    /*position: absolute;
                    top: 167px;
                    left: 93px;*/
                    width: 15.59%;
                    padding: 13vh 0 0 21.1%;
                    img {
                        width: 100%;
                        margin-bottom: 2vh;
                    }
                    p{
                        color: rgba(255, 255, 255, 1);
                        margin: 0 auto;
                    }
                    @media screen and (max-width: 800px){
                        p {
                            font-size: 6px;
                        }
                    }
                    @media screen and (min-width: 800px) and (max-width: 1280px){
                        p{
                            font-size: 9px;
                        }
                    }
                    @media screen and (min-width: 1280px) and (max-width: 1440px){
                        p{
                            font-size:11px;
                        }
                    }
                    @media screen and (min-width: 1440px) and (max-width: 1600px){
                        p{
                            font-size:12px;
                        }
                    }
                    @media screen and (min-width: 1600px) and (max-width: 1920px){
                        p{
                            font-size:14px;
                        }
                    }

                }
                .index {
                    /*position: absolute;
                    top: 87px;
                    right: 25px;*/
                    width: 46.29%;
                    float: right;
                    margin-right: 5.8%;
                    margin-top: -37vh;
                    img {
                        width: 100%;
                    }
                }
                .note {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom:11vh;
                    p{
                        color: rgba(255, 255, 255, 1);
                    }
                    p:nth-child(1){
                        margin-bottom: 2vh;
                    }
                    @media screen and (max-width: 800px){
                        p:nth-child(1) {
                            font-size: 9px;
                        }
                        p:nth-child(2) {
                            font-size: 5px;
                        }
                    }
                    @media screen and (min-width: 800px) and (max-width: 1280px){
                        p:nth-child(1) {
                            font-size: 15px;
                        }
                        p:nth-child(2) {
                            font-size: 8px;
                        }
                    }
                    @media screen and (min-width: 1280px) and (max-width: 1440px){
                        p:nth-child(1) {
                            font-size: 17px;
                        }
                        p:nth-child(2) {
                            font-size: 9px;
                        }
                    }
                    @media screen and (min-width: 1440px) and (max-width: 1600px){
                        p:nth-child(1) {
                            font-size: 19px;
                        }
                        p:nth-child(2) {
                            font-size: 11px;
                        }
                    }
                    @media screen and (min-width: 1600px) and (max-width: 1920px){
                        p:nth-child(1) {
                            font-size: 22px;
                        }
                        p:nth-child(2) {
                            font-size: 12px;
                        }
                    }

                }
            }
        }
        .second {
            width: 100%;
            height: 100%;

            .second-main {
                width: 54.79%;
                margin: 1.06vh auto;
                display: flex;
                justify-content: center;

                .second-left {
                    align-self: center;
                    img {
                        width: 79.4%;
                    }
                }

                .second-right {
                    align-self: flex-end;
                    img {
                        width: 100%;
                    }
                }


            }
        }

        .third {
            width: 100%;
            height: 100%;

            .third-main {
                width: 54.79%;
                margin: 8.84vh auto;
                text-align: right;

                p {
                    color: rgba(179, 179, 179, 1);
                    line-height: 2.5vh;
                }
                @media screen and (max-width: 800px){
                    p {
                        font-size: 5px;
                    }
                }
                @media screen and (min-width: 800px) and (max-width: 1280px){
                    p{
                        font-size: 8px;
                    }
                }
                @media screen and (min-width: 1280px) and (max-width: 1440px){
                    p{
                        font-size:9px;
                    }
                }
                @media screen and (min-width: 1440px) and (max-width: 1600px){
                    p{
                        font-size:10px;
                    }
                }
                @media screen and (min-width: 1600px) and (max-width: 1920px){
                    p{
                        font-size: 12px;
                    }
                }

                .middle {
                    display: flex;
                    justify-content: space-between;
                    text-align: left;
                    margin-top: 2.99vh;
                    margin-bottom: 4.49vh;

                    .left {
                        width: 56.65%;
                        align-self: flex-start;

                        img {
                            width: 25%;
                            margin-bottom: 2.99vh;
                        }

                        .one, .two, .three {
                            color: rgba(153, 153, 153, 1);
                            margin-bottom: 5.22vh;
                            line-height:3vh;
                        }
                        @media screen and (max-width: 800px){
                            .one, .two, .three  {
                                font-size: 8px;
                            }
                        }
                        @media screen and (min-width: 800px) and (max-width: 1280px){
                            .one, .two, .three {
                                font-size: 12px;
                            }
                        }
                        @media screen and (min-width: 1280px) and (max-width: 1440px){
                            .one, .two, .three {
                                font-size:14px;
                            }
                        }
                        @media screen and (min-width: 1440px) and (max-width: 1600px){
                            .one, .two, .three {
                                font-size:16px;
                            }
                        }
                        @media screen and (min-width: 1600px) and (max-width: 1920px){
                            .one, .two, .three {
                                font-size: 18px;
                            }
                        }
                    }

                    .right {
                        align-self: flex-end;
                        width: 28.71%;
                        img {
                            width: 100%;
                        }
                    }
                }

                .bottom {
                    img {
                        width: 20.06%;
                    }
                }
            }
        }
    }
</style>
