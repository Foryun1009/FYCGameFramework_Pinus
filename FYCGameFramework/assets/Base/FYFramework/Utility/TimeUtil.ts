/**
 * 获取当前时间是否是同一天
 */
export let isSameDay = (time1, time2 = Date.now()) => {
    let t1 = Number(time1);
    let t2 = Number(time2)
    if (t1 && t2) {
        let date1 = new Date(t1);
        let date2 = new Date(t2);
        let tick1 = date1.setHours(0, 0, 0, 0);
        let tick2 = date2.setHours(0, 0, 0, 0);
        return tick1 === tick2;
    }
    return false;
}

/** 获取当前时间 秒 */
export let getDateNowSecond = (): number => {
    return Math.floor(Date.now() / 1000);
}

export let padZero = (str: string): string => {
    //补零  
    return new RegExp(/^\d$/g).test(str) ? `0${str}` : str;
}

export let getMonthWeek = () => {
    let nowDate = new Date();
    let aYear = nowDate.getFullYear();
    let bWeekDay = nowDate.getDay();
    let cDays = nowDate.getDate();

    let w = nowDate.getDay();
    let d = nowDate.getDate();
    return Math.ceil((d + 6 - w) / 7);
}

/**
 * 将时间转成相应格式
 * @param time 
 * @param format 
 */
export let timeFormat = (time: Date, format = 'yyyy/MM/dd hh:mm:ss') => {
    var o = {
        "M+": time.getMonth() + 1,                      //month 
        "d+": time.getDate(),                           //day 
        "h+": time.getHours(),                          //hour 
        "m+": time.getMinutes(),                        //minute 
        "s+": time.getSeconds(),                        //second 
        "q+": Math.floor((time.getMonth() + 3) / 3),    //quarter 
        "S": time.getMilliseconds()                     //millisecond 
    }

    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**
 * 时间戳转时间
 * @param timestamp 
 */
export let timestampToTime = (timestamp: number) => {
    return timeFormat(new Date(timestamp))
}