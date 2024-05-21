import { autoGlobal, printStyleLog } from "./util";

const global = autoGlobal();
const top = global.top || global;   // window.top
const timeDiffTag = '-time-diff';   // 时间差标记
const isAllow = !!top;              // 是否允许打印日志

/**获取耗时标记 */
function getTimeDiffLabel(timeLabel: string) {
    return timeLabel + timeDiffTag;
}

/**添加耗时记录 */
function pushTimeDiff(timeLabel: string, timeDiff: number) {
    const timeDiffLabel = getTimeDiffLabel(timeLabel);
    if(Array.isArray(top[timeDiffLabel])) {
        top[timeDiffLabel].push(timeDiff);
    } else {
        top[timeDiffLabel] = [timeDiff];
    }
}

/**获取耗时记录 */
export function getTimeDiffs(timeLabel: string) {
    const timeDiffLabel = getTimeDiffLabel(timeLabel);
    const timeDiffs: number[] = top[timeDiffLabel];
    if(Array.isArray(timeDiffs)) {
        return timeDiffs;
    }
    return [];
}

/**获取总耗时记录 */
export function getTimeDiffsTotal(timeLabel: string) {
    let totalTime = 0;
    getTimeDiffs(timeLabel).forEach(time => totalTime += time);
    return totalTime;
}

/**情况耗时记录 */
function clearTimeDiffs(timeLabel: string) {
    const timeDiffLabel = getTimeDiffLabel(timeLabel);
   delete top[timeDiffLabel];
}

/**清空时间日志数据 */
export function cleatTimeTag(timeLabel: string) {
    delete top[timeLabel];
    clearTimeDiffs(timeLabel);
}

/**固定数字位数 */
function getFixedNum(num:number, fix = 3) {
    return +num.toFixed(fix);
}

/**
 * 开启时间日志
 * @param timeLabel 日志标签
 * @param unUpdate 如果日志开始时间已记录, 是否不更新
 */
export function createTimeLog(timeLabel: string, unUpdate = false) {
    if(!isAllow) {
        return;
    }
    if(unUpdate && top[timeLabel]) {
        return;
    }
    const nowTime = new Date().getTime();
    top[timeLabel] = nowTime;
    return;
}

/**
 * 打印时间日志
 * @param timeLabel 日志标签
 * @param minTime 小于指定最小时间则不打印日志(s)
 */
export function printTimeLog(timeLabel: string, minTime = 0) {
    if(!isAllow) {
        return false;
    }

    // [data]
    const nowTime = new Date().getTime();
    const startTime = top[timeLabel];
    if(isNaN(startTime)) {
        return false;
    }
    
    // [diff] 时间差(耗时)
    const timeDiff = getFixedNum((nowTime - startTime) / 1000);
    timeDiff >= minTime && printStyleLog(timeLabel, undefined, `${timeDiff}s`);

    // [record] 记录耗时
    pushTimeDiff(timeLabel, timeDiff);

    // [delete start] 删除起始计时
    delete top[timeLabel];

    // [returns]
    return true;
}

/**
 * 统计时间日志
 * @param timeLabelsInfo 日志标签信息
 * @param totalTimeLabel 总日志标签
 */
export function countTimeLog(timeLabelsInfo: string[] | Record<string, string>, totalTimeLabel = '') {
    if(!isAllow) {
        return false;
    }

    const timtLabels: string[] = Array.isArray(timeLabelsInfo) ? timeLabelsInfo : Object.keys(timeLabelsInfo);

    // [total time] 总耗时
    let totalTime = 0;
    let totalTimes = totalTimeLabel && getTimeDiffs(totalTimeLabel);
    if(totalTimes.length ==0 ) {
        timtLabels.forEach(label => {
            totalTime += getTimeDiffsTotal(label);
        });
    } else {
        totalTimes.forEach(time => {
            totalTime += time;
        });
    }

    if(totalTime == 0) {
        timtLabels.forEach(label => {
            clearTimeDiffs(label);
        });
    }

    // [time diff ratio] 耗时占比
    let totalRatio = 0;
    const ratioMap: Record<string, Record<string, string | number>> = {};
    timtLabels.forEach(label => {
        const diffs = getTimeDiffs(label);
        let time = 0;
        diffs.forEach(item => time += item);
        const ratio = (time / totalTime) * 100;
        totalRatio += ratio;
        ratioMap[label] = {
            'desc': timeLabelsInfo[label] || label,
            'time(s)': getFixedNum(time),
            'ratio(%)': getFixedNum(ratio),
            'records': diffs.length > 1 ? `(${diffs.length}): ${diffs.join(', ')}` : '-',
        };
        clearTimeDiffs(label);
    });

    // [print] 打印日志
    if(totalRatio == 0) {
        return;
    }
    printStyleLog(
        totalTimeLabel,
        {
            color: '#ffff00'
        },
        `${getFixedNum(totalTime)}s`,
        `${getFixedNum(totalRatio)}%`,
    )
}