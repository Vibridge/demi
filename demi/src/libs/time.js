

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function formatTimeTwo(number, format) {

    var formateArr = ['Y', 'M', 'D'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

/**
 * @Description: 日期字符串转换为时间戳
 * @author liner
 * @date 2019/10/18
*/
function timestamp(time) {
    var date= new Date(Date.parse(time.replace(/-/g,  "/")));
    var timestamp = new Date(date).getTime()/1000;
    return timestamp
}
/*var date = '2015-03-05 17:59:00.0';
date = date.substring(0,19);
date = date.replace(/-/g,'/'); //必须把日期'-'转为'/'
var timestamp = new Date(date).getTime();
document.write(timestamp);*/

export default {
    Time:formatTimeTwo,
    Stamp:timestamp
}
