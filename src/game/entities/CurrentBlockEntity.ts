import SpriteEntity from "@/entity/SpriteEntity";
import StoreSubscriberInterface from "@/interfaces/StoreSubscriberInterface";
import Rect from "@/common/math/Rect";
import Vector from "@/common/math/Vector";
import RenderingContextInterface from "@/interfaces/RenderingContextInterface";

export default class CurrentBlockEntity extends SpriteEntity /** BlockEntity */ implements StoreSubscriberInterface {
    private position: Vector;

    public constructor() {
        super(
            '/assets/backgrounds/example.jpg', 
            null,
            null
        );

        this.position = new Vector(100, 220);
    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number): void {
        context.drawImage(
            this.imageSource,
            new Rect(new Vector(0, 100), new Vector(20, 120)),
            new Rect(this.position, new Vector(this.position.x + 20, this.position.y + 20))
        );
    }

    public reset(): void {

    }

    public updatePosition(positionY: number): void {
        this.position.y = positionY;
    }

    public storeData({ get, dispatch }, { state }): void {
        if (state.positionY) {
            this.updatePosition(state.positionY);
        }
    }

    public storeDataChange({ get, dispatch }, { state }): void {
        if (state.positionY) {
            this.updatePosition(state.positionY);
        }
    }

    // + pozycja
}