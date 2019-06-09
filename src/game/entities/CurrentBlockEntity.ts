import SpriteEntity from "@/entity/SpriteEntity";
import StoreSubscriberInterface from "@/interfaces/StoreSubscriberInterface";
import Rect from "@/common/math/Rect";
import Vector from "@/common/math/Vector";
import RenderingContextInterface from "@/interfaces/RenderingContextInterface";

export default class CurrentBlockEntity extends SpriteEntity /** BlockEntity */ implements StoreSubscriberInterface {
    public constructor() {
        super(
            '/assets/backgrounds/example.jpg', 
            null,
            null
        );
    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number): void {
        context.drawImage(
            this.imageSource,
            new Rect(new Vector(0, 100), new Vector(20, 120)),
            new Rect(new Vector(100, 220), new Vector(120, 240))
        );

        context.drawImage(
            this.imageSource,
            new Rect(new Vector(0, 100), new Vector(20, 120)),
            new Rect(new Vector(120, 220), new Vector(140, 240))
        );

        context.drawImage(
            this.imageSource,
            new Rect(new Vector(0, 100), new Vector(20, 120)),
            new Rect(new Vector(140, 220), new Vector(160, 240))
        );

        context.drawImage(
            this.imageSource,
            new Rect(new Vector(0, 100), new Vector(20, 120)),
            new Rect(new Vector(140, 240), new Vector(160, 260))
        );
    }

    public reset(): void {

    }

    public updatePosition(): void {

    }

    public storeData({ get, dispatch }, { state }): void {
        
    }

    public storeDataChange({ get, dispatch }, { state }): void {
        
    }

    // + pozycja
}