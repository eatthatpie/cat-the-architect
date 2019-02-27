import ColorInterface from '@/interfaces/ColorInterface';
import ImageResourceInterface from '@/interfaces/ImageResourceInterface';
import Rect from '@/common/math/Rect';
import RenderingContextInterface from '@/interfaces/RenderingContextInterface';
import StyleInterface from '@/interfaces/StyleInterface';
import TextAlign from '@/common/flags/TextAlign';
import Vector from '@/common/math/Vector';

export default class CanvasRenderingContext implements RenderingContextInterface {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private testImage: any;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');

        this.testImage = new Image();
        this.testImage.src = './../assets/backgrounds/example.jpg';
    }

    public clearScreen(color: ColorInterface): void {
        this.context.fillStyle = color.getHex();
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public drawImage(imageResource: ImageResourceInterface, sourceRect: Rect, canvasRect: Rect): void {
        const sourceTopLeftVector = sourceRect.getTopLeftVector();
        const sourceBottomRightVector = sourceRect.getBottomRightVector();

        const canvasTopLeftVector = canvasRect.getTopLeftVector();
        const canvasBottomRightVector = canvasRect.getBottomRightVector();

        this.context.drawImage(
            imageResource.getCanvasImageSource(),
            sourceTopLeftVector.x,
            sourceTopLeftVector.y,
            sourceBottomRightVector.x - sourceTopLeftVector.x,
            sourceBottomRightVector.y - sourceTopLeftVector.y,
            canvasTopLeftVector.x,
            canvasTopLeftVector.y,
            canvasBottomRightVector.x - canvasTopLeftVector.x,
            canvasBottomRightVector.y - canvasTopLeftVector.y
        );
    }

    public drawRect(rect: Rect, fillColor?: ColorInterface, borderWidth?: number, borderColor?: ColorInterface): void {
        this.context.beginPath(); // @TODO: is this good here?

        if (fillColor) {
            this.context.fillStyle =  fillColor.getHex();
        }

        if (borderColor) {
            this.context.strokeStyle =  borderColor.getHex();
        }

        this.context.lineWidth = borderWidth ? borderWidth : 0;

        let vectorArray = rect.getVectorArray();
        vectorArray = vectorArray.map((item, index) => {
            if (index > 1) {
                return (item - vectorArray[index - 2])
            }

            return item;
        })

        if (fillColor) {
            this.context.fillRect.apply(this.context, vectorArray);
        }
        else {
            this.context.rect.apply(this.context, vectorArray);
        }

        this.context.stroke();
    }
    
    public drawText(text: string, position: Vector, style: StyleInterface): void {
        // @TODO: default style
        this.context.font = `${style.fontSize}px ${style.fontFamily}`;
        this.context.fillStyle = style.color ? style.color.getHex() : '#000';
        this.context.textAlign = this.resolveTextAlign(style.textAlign);

        this.context.fillText(text.trim(), position.x, position.y);
    }
    
    // @TODO: separate utility (common) class
    private resolveTextAlign(textAlign: TextAlign): CanvasTextAlign {
        return <any> textAlign;
    }

    public getTextNativeWidth(text: string, style?: StyleInterface): number { // @TODO: jakiś global/default font?
        this.context.save();

        if (style) {
            this.context.font = `${style.fontSize || ''} ${style.fontFamily || ''}`;
        }

        const out = this.context.measureText(text).width;

        this.context.restore();
        
        return out;
    }
};