/**矩形的几种绘制形式 */
export function drawRectangular(canvasSelector: string) {
	const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement
	if (!canvas.getContext) {
		throw new Error('This browser does not support canvas.')
	}
	const ctx = canvas.getContext('2d')

	// [style]
	ctx.fillStyle = 'rgb(200 0 0)'
	ctx.strokeStyle = 'rgb(0 200 0)'

	// [fiiled rectangle]
	ctx.fillRect(25, 25, 100, 100)
	// [rectanglar outline]
	ctx.strokeRect(45, 45, 60, 60)
	// [clear rectanglar area]
	ctx.clearRect(50, 50, 50, 50)
}
