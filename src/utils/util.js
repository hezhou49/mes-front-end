
/*时间函数*/
function timeFormat(longTypeDate){
    let datetimeType = "";
    let date = new Date();
    date.setTime(longTypeDate);
    datetimeType =getHours(date)+":"+getMinutes(date)+":"+getSeconds(date);//yyyy-MM-dd 00:00:00格式日期
    return datetimeType;
}
function getDateStr(seconds) {
    let date = new Date(seconds * 1000)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let currentTime = hour + ":" + minute + ":" + second;
    return currentTime
}
function datetimeFormat(longTypeDate){
    let datetimeType = "";
    let date = new Date();
    date.setTime(longTypeDate);
    datetimeType = date.getFullYear()+"-"+getMonth(date)+"-"+getDay(date)+" "+getHours(date)+":"+getMinutes(date)+":"+getSeconds(date);//yyyy-MM-dd 00:00:00格式日期
    return datetimeType;
}
function datetimeFormatday(longTypeDate){
    let datetimeType = "";
    let date = new Date();
    date.setTime(longTypeDate);
    datetimeType = date.getFullYear()+"-"+getMonth(date)+"-"+getDay(date);//yyyy-MM-dd 00:00:00格式日期
    return datetimeType;
}

function getMonth(date){
    let month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if(month<10){
        month = "0" + month;
    }
    return month;
}
function getMonthold(date){
    let month = "";
    month = date.getMonth() + 1-2; //getMonth()得到的月份是0-11
    if(month<10){
        month = "0" + month;
    }
    return month;
}
//返回01-30的日期
function getDay(date){
    let day = "";
    day = date.getDate();
    if(day<10){
        day = "0" + day;
    }
    return day;
}
//返回小时
function getHours(date){
    let hours = "";
    hours = date.getHours();
    if(hours<10){
        hours = "0" + hours;
    }
    return hours;
}
//返回分
function getMinutes(date){
    let minute = "";
    minute = date.getMinutes();
    if(minute<10){
        minute = "0" + minute;
    }
    return minute;
}
//返回秒
function getSeconds(date){
    let second = "";
    second = date.getSeconds();
    if(second<10){
        second = "0" + second;
    }
    return second;
}
function changeDateFormat(cellval) {
    let dateVal = cellval + "";
    if (cellval != null) {
        let date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
        let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        let currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
    }
}
function formatSeconds(value) {
    let secondTime = parseInt(value/1000);// 秒
    let minuteTime = 0;// 分
    let hourTime = 0;// 小时
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if(minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    let result = "" + parseInt(secondTime) + "秒";

    if(minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    if(hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
}
export {
    formatSeconds,
}
