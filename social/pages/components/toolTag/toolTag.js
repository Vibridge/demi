const SysInfo = wx.getSystemInfoSync()
const IsCustom = SysInfo.version >= '7.0.0'
const IsIOS = SysInfo.system.indexOf('iOS') != -1
const MenuRect = wx.getMenuButtonBoundingClientRect()
var IsIndex = true
var IsSecond = false

Component({
  properties:{
    title: {
      type: String
    },
    propA:null,
    propB:null,
    propC: null,
  },
  
  data: {
    isCustom: IsCustom,
    isIndex: IsIndex,
    isSecond: IsSecond
  },
  observers: {
    "title"(value) {
      if (IsCustom) {
        return
      }
      wx.setNavigationBarTitle({
        title: value,
      })
    },
  },
  methods: {
    initData() {
      this.setData({
        isIndex: this.data.propA,
        isSecond: this.data.propB
      })
    },
    initLayout() {
      const statusBarHeight = SysInfo.statusBarHeight;
      const height = (MenuRect.top - statusBarHeight) * 2 + MenuRect.height
      this.setData({
        _navBarStyle: `padding:${statusBarHeight}px 0 0;height:${height}px;line-height:${height}px;font-size:${SysInfo.fontSizeSetting - 2}pt;`,
      })
    },
    back(){
      var propC = this.data.propC;
      var propB = this.data.propB;
      if(propC){
        let that = this
        wx.switchTab({ url : '../index/index' })
      } else if (propB){
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
        // prevPage.setData({
        //   industry_id: id,
        //   industry_name: select
        // });
        wx.navigateBack({
          delta: 1
        })
      } else{
        wx.navigateBack({
          delta: 1
        })
      }
    }
  },
  lifetimes: {

    /**
     * 在组件实例进入页面节点树时执行
     */
    attached() {
      this.initData();
      this.initLayout();
    },

    /**
     *  在组件实例被从页面节点树移除时执行
     */
    detached() { },
  },
  
})