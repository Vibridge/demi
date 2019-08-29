/**
 * Created with WebStorm && Sublime Text 3
 * Date: 2015/10/29 14:04
 */
export const handleMap = () => {
        var map = new AMap.Map("container", {
            resizeEnable: true
        });
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });
        if (location.href.indexOf('&guide=1') !== -1) {
            map.setStatus({
                scrollWheel: false
            })
        }

    };

