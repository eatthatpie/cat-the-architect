import AnimationStateAware from '@/animation/AnimationStateAware';
import EntityInterface from '@/interfaces/EntityInterface';
import Rect from '@/common/math/Rect';
import RenderingContextInterface from '@/interfaces/RenderingContextInterface';
import Vector from '@/common/math/Vector';

export default abstract class EntityBase extends AnimationStateAware implements EntityInterface {
    protected isHover: boolean;
    protected mouseClickHandler: Function;
    protected mouseOverHandler: Function;
    protected mouseOutHandler: Function;
    protected boundingBox: Rect;

    constructor() {
        super();

        this.isHover = false;
        this.mouseClickHandler = function(mousePosition: Vector) {}
        this.mouseOverHandler = function(mousePosition: Vector) {}
        this.mouseOutHandler = function(mousePosition: Vector) {}
        this.boundingBox = new Rect();
    }
    
    public mouseClick(mousePosition: Vector): void {
        if (this.isHover) {
            this.mouseClickHandler(mousePosition);
        }
    }

    public mouseMove(mousePosition: Vector): void {
        const isMouseOver = this.boundingBox.contains(mousePosition);

        if (isMouseOver && !this.isHover) {
            this.isHover = true;
            this.mouseOverHandler(mousePosition);
        }
        else if (!isMouseOver && this.isHover) {
            this.isHover = false;
            this.mouseOutHandler(mousePosition);
        }
    }

    public onMouseClick(callback: Function) {
        this.mouseClickHandler = callback;

        return this;
    }

    public onMouseOver(callback: Function) {
        this.mouseOverHandler = callback;

        return this;
    }

    public onMouseOut(callback: Function) {
        this.mouseOutHandler = callback;

        return this;
    }

    public onPreDraw(context: RenderingContextInterface): any {
        this.boundingBox = this.getBoundingBox(context);
    }

    public abstract getBoundingBox(context: RenderingContextInterface): Rect;
    public abstract onDraw(context: RenderingContextInterface, elapsedTime: number): any;
    public abstract setPosition(position: Vector): any;
}