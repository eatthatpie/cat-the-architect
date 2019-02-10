import ColorInterface from '@/interfaces/ColorInterface';
import RenderingContextInterface from '@/interfaces/RenderingContextInterface';
import StyleInterface from '@/interfaces/StyleInterface';
import TextAlign from '@/common/flags/TextAlign';
import Vector from '@/common/math/Vector';

export default class CanvasRenderingContext implements RenderingContextInterface {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    public clearScreen(color: ColorInterface): void {
        this.context.fillStyle = color.getHex();
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    public drawText(text: string, position: Vector, style: StyleInterface): void {
        // @TODO: default style
        this.context.font = `${style.fontSize} ${style.fontFamily}`;
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