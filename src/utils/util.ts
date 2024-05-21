/**
 * 打印带有样式的日志标注
 * @param tag 日志标记
 * @param content 日志内容
 * @param style 日志样式
 */
export function printStyleLog(
	tag: string,
	style?: Record<string, string>,
	...items: any
) {
	style = Object.assign(
		{
			color: '#75de75',
			'font-style': 'italic',
			'background-color': '#333',
			padding: '2px',
			'font-size': '16px',
		},
		style,
	)
	const styleStr = cssObj2CssStr(style)
	if (!tag.includes('%c')) {
		tag = '%c' + tag
	}
	console.log(tag, styleStr, ...items)
}

/**
 * css对象转字符串形式
 * @param cssObj
 */
export function cssObj2CssStr(cssObj: Record<string, string>) {
	if (!cssObj) {
		return ''
	}
	let str = ''
	for (let key in cssObj) {
		str += `${key}: ${cssObj[key]};`
	}
	return str
}

/**获取环境上下文 */
export function autoGlobal(): any {
	if (typeof window != 'undefined') {
		return window
	}
	if (typeof self != 'undefined') {
		return self
	}
	if (typeof globalThis != 'undefined') {
		return globalThis
	}
}
