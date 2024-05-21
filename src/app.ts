import { getCanvasRenderingContext2D } from './2d/utils'
import { drawAnImage } from './samples/cavas-tutotail-mdn/06.drawingImages'
import './styles/main.less'
import logoUrl from './assets/logo.png'
import { createTimeLog, printTimeLog } from './utils/TimeLogTool'

window.onload = () => {
	main()
}

/**入口函数 */
function main() {
	const canvasSelector = '#my-canvas'
	const ctx = getCanvasRenderingContext2D(canvasSelector)

	createTimeLog('test')
	const logoImg = new Image()
	logoImg.onload = () => {
		drawAnImage(ctx, logoImg, {
			sx: 10,
			sy: 10,
			sWidth: 200,
			sHeight: 200,
			dx: 10,
			dy: 10,
			dWidth: 128,
			dHeight: 128,
			showFlag: true,
		})
		printTimeLog('test')
	}
	logoImg.src = logoUrl
}
