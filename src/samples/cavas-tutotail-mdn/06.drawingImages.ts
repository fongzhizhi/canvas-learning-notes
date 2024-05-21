export function drawAnImage(ctx: CanvasRenderingContext2D, img: CanvasImageSource, opt?: Partial<{
    sx: number;
    sy: number;
    sWidth: number;
    sHeight: number;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
    showFlag: boolean;
}>) {
    opt = Object.assign({
        dx: 0,
        dy: 0,
    }, opt);
    if(!isNaN(opt.sx) || !isNaN(opt.sy)) {
        opt = Object.assign({
            sx: 0,
            sy: 0,
            sWidth: 10,
            sHeight: 10,
            dWidth: 10,
            dHeight: 10,
        }, opt);
        ctx.drawImage(img, opt.sx, opt.sy, opt.sWidth, opt.sHeight, opt.dx, opt.dy, opt.dWidth, opt.dHeight);
    } else if(!isNaN(opt.dWidth) || !isNaN(opt.dHeight)) {
        opt = Object.assign({
            dWidth: 10,
            dHeight: 10,
        }, opt);
        ctx.drawImage(img, opt.dx, opt.dy, opt.dWidth, opt.dHeight);
    } else {
        ctx.drawImage(img, opt.dx, opt.dy);
    }

    // [rect flag]
    if(opt.showFlag) {
        ctx.strokeStyle = 'rgb(0 0 200 / 50%)';
        ctx.rect(opt.dx, opt.dy, opt.dWidth || 10, opt.dHeight || 10);
        ctx.stroke();
    }
}