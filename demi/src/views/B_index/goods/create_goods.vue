<template>
    <div class="create_wrap">
        <div class="search_all">
            <div class="block">
                <el-cascader
                        placeholder="请输入你要查找的类目"
                        :options="options"
                        filterable></el-cascader>
                <el-button type="primary">搜索</el-button>
            </div>
        </div>
        <p class="create_history">发布历史：五金>仪表>电阻测试仪</p>
        <div class="category">
            <div class="first_category">
                <div class="search">
                    <el-input
                            placeholder="名称/拼音"
                            suffix-icon="el-icon-search"
                            v-model="first_category">
                    </el-input>
                </div>
                <div class="main">
                    <div class="category_list" v-for="(item,index) in 5" :key="index">
                        <div class="category_title" @click="open = !open;active_first_category = index">
                            家用电器
                            <i :class="(active_first_category === index) && open ? 'active el-icon-arrow-right' : 'el-icon-arrow-right'"></i>
                        </div>
                        <transition name="slide-fade">
                            <div class="category_connect" v-if="(active_first_category === index) && open">
                                <ul>
                                    <li v-for="item in 5">
                                        <p>服装配件/皮带/帽子/围巾</p>
                                    </li>
                                </ul>
                            </div>
                        </transition>

                    </div>
                </div>

            </div>
            <div class="second_category">
                <div class="search">
                    <el-input
                            placeholder="名称/拼音"
                            suffix-icon="el-icon-search"
                            v-model="second_category">
                    </el-input>
                </div>

            </div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'create_goods',
        data() {
            return {
                first_category: '',
                second_category: '',
                open:false,
                active_first_category:null,
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }]
            }
        }
    }
</script>

<style lang="stylus">
    .create_wrap
        width 1000px
        text-align left
        margin 32px auto

        .search_all
            margin-bottom 22px

            .el-cascader
                width: 602px;
                height: 37px;
                margin-right 15px

                .el-input__inner
                    height: 37px;
                    line-height 37px
                    border: 1px solid rgba(36, 191, 255, 1);

            .el-button
                width: 104px;
                font-size: 16px;
                border-radius: 6px;
                padding: 10px 36px
                border none
                color: rgba(255, 255, 255, 1);
                background: rgba(36, 191, 255, 1);

        .create_history
            font-size: 14px;
            color: rgba(51, 51, 51, 1);

        .category
            width 100%
            height 434px
            display flex
            margin 24px auto
            border-radius: 4px;
            border: 1px solid rgba(76, 176, 255, 1);

            .first_category, .second_category
                width 249px
                box-sizing border-box
                border-right 1px solid rgba(76, 176, 255, 1)

                .search
                    background: #fff;
                    padding  14px 19px

                    .el-input
                        .el-input__inner
                            height 24px
                            line-height 24px

                        .el-input__icon
                            line-height 24px

                .slide-fade-enter-active {
                    transition: all .3s ease;
                }
                .slide-fade-leave-active {
                    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
                }
                .slide-fade-enter, .slide-fade-leave-to {
                    transform: translateY(-10px);
                    opacity: 0;
                }
                .main
                    height 382px
                    overflow-y scroll
                    background: #fff;
                    .category_list
                        border-bottom:1px dashed rgba(204,204,204,1);
                    .category_title
                        padding 8px 4px
                        color:rgba(36,191,255,1);

                        .active
                            transform:rotate(90deg);
                            transition-property: all;
                            transition-duration: 0.3s;
                            transition-timing-function: linear;
                        i
                            transform:rotate(0deg);
                            transition-property: all;
                            transition-duration: 0.3s;
                            transition-timing-function: linear;
                            color:rgba(36,191,255,1);
                    .category_connect
                        ul
                            li:hover
                                background:rgba(240,240,240,1);
                            li
                                font-size:14px;
                                color #333333
                                padding 7px 18px
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow:ellipsis;

</style>