import Color from '@/common/Color';
import EntityInterface from '@/interfaces/EntityInterface';
import RenderingContextInterface from '@/interfaces/RenderingContextInterface';
import StyleInterface from '@/interfaces/StyleInterface';
import TextAlign from '@/common/flags/TextAlign';
import Vector from '@/common/math/Vector';

export default class TextEntity implements EntityInterface {
    private position: Vector;
    private value: string;
    private style: StyleInterface;
    
    constructor(value: string, position?: Vector) {
        this.setValue(value.trim());
        this.position = position || { x: 0, y: 0 };
        this.style = {
            color: Color.hex('#000'),
            fontFamily: 'calibri',
            fontSize: '27px',
            lineHeight: 30,
            textAlign: TextAlign.LEFT
        }

        return this;
    }

    public getStyle(): StyleInterface {
        return this.style;
    }

    public getValue(): string {
        return this.value;
    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number) {
        context.drawText(this.value, this.position, this.style);
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