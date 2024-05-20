import { drawTwoRects } from "./samples/cavas-tutotail-mdn/01.drawTwoRects";
import "./styles/main.less";

window.onload = () => {
	main();
};

/**入口函数 */
function main() {
	const canvasSelector = '#my-canvas';
	drawTwoRects(canvasSelector);	
}
