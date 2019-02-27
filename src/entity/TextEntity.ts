import Color from '@/common/Color';
import DefaultStyle from '@/common/defaults/DefaultStyle';
import EntityBase from './EntityBase';
import Rect from '@/common/math/Rect';
import RenderingContextInterface from '@/interfaces/RenderingContextInterface';
import StyleInterface from '@/interfaces/StyleInterface';
import TextAlign from '@/common/flags/TextAlign';
import Vector from '@/common/math/Vector';

export default class TextEntity extends EntityBase {
    private position: Vector;
    private value: string;
    private style: StyleInterface;
    
    constructor(value: string, position?: Vector) {
        super();

        this.setValue(value.trim());
        this.position = position || { x: 0, y: 0 };
        this.style = DefaultStyle;

        return this;
    }

    public getBoundingBox(context: RenderingContextInterface): Rect {
        const textWidth = context.getTextNativeWidth(this.value, this.style);
        let boxLeft = this.position.x + (this.style.margin[3] || 0);
        let boxTop = this.position.y + (this.style.margin[0] || 0);
        let boxWidth = textWidth + (this.style.padding[1] || 0) + (this.style.padding[3] || 0);
        let boxHeight = this.style.lineHeight + (this.style.padding[0] || 0) + (this.style.padding[2] || 0);

        if (this.style.textAlign === TextAlign.CENTER) {
            boxLeft = boxLeft - textWidth / 2;
        }

        const topLeft: Vector = new Vector(boxLeft, boxTop);
        const bottomRight: Vector = new Vector(boxLeft + boxWidth, boxTop + boxHeight);

        return new Rect(topLeft, bottomRight);
    }

    private getNativePosition(): Vector {
        const marginFactor = new Vector(this.style.margin[3] || 0, this.style.margin[0] || 0);
        const paddingFactor = new Vector(this.style.padding[3] || 0, this.style.padding[0] || 0);
        const lineHeightFactor = new Vector(0, Math.round((this.style.lineHeight + this.style.fontSize * .67) / 2));

        let x = this.position.x + marginFactor.x + paddingFactor.x + lineHeightFactor.x;
        let y = this.position.y + marginFactor.y + paddingFactor.y + lineHeightFactor.y;

        return new Vector(x, y);
    }

    public getStyle(): StyleInterface {
        return this.style;
    }

    public getValue(): string {
        return this.value;
    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number): void {
        context.drawText(this.value, this.getNativePosition(), this.style);
        context.drawRect(this.boundingBox, null, 1, new Color('#999'));
    }

    public setPosition(position: Vector): TextEntity {
        this.position = position;

        return this;
    }

    public setValue(value: string): TextEntity {
        this.value = value.trim();

        return this;
    }

    public setStyle(style: StyleInterface): TextEntity {
        (<any> Object).assign(this.style, style);

        return this;
    }
};