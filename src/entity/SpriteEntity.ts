import EntityBase from './EntityBase';
import ImageResource from '@/resource/ImageResource';
import ImageResourceInterface from '@/interfaces/ImageResourceInterface';
import Rect from '@/common/math/Rect';
import RenderingContextInterface from '@/interfaces/RenderingContextInterface';
import Vector from '@/common/math/Vector';

export default class SpriteEntity extends EntityBase {
    private imageSource: ImageResourceInterface;
    private sourceRect: Rect;
    private canvasRect: Rect;

    constructor(imageSourcePath: string, sourceRect: Rect, canvasRect: Rect) {
        super();

        this.imageSource = new ImageResource(imageSourcePath);
        this.sourceRect = sourceRect;
        this.canvasRect = canvasRect;
    }

    public getBoundingBox(context: RenderingContextInterface): Rect {
        return new Rect();
    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number): void {
        context.drawImage(this.imageSource, this.sourceRect, this.canvasRect);
    }

    public setPosition(position: Vector): SpriteEntity {
        return this;
    }
}