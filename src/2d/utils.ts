/**获取2d渲染上下文 */
export function getCanvasRenderingContext2D(canvasSelector: string) {
	const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement
	if (!canvas.getContext) {
		throw new Error('This browser does not support canvas.')
	}
	const ctx = canvas.getContext('2d')
	return ctx
}
