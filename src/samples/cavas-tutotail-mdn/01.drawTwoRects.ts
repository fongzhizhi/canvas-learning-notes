/**绘制两个矩形 */
export function drawTwoRects(canvasSelector: string) {
	const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement
	if (!canvas.getContext) {
		throw new Error('This browser does not support canvas.')
	}
	const ctx = canvas.getContext('2d')

	ctx.fillStyle = 'rgb(200 0 0)'
	ctx.fillRect(10, 10, 50, 50)

	ctx.fillStyle = 'rgb(0 0 200 / 0.5)'
	ctx.fillRect(30, 30, 50, 50)
}
