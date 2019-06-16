import SpriteEntity from "@/entity/SpriteEntity";
import RenderingContextInterface from "@/interfaces/RenderingContextInterface";

export default class BlockEntity extends SpriteEntity {
    public constructor(color: any, type: any) {
        super(
            '/assets/backgrounds/example.jpg', 
            null,
            null
        );
    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number): void {
        // this.blocks.forEach(block => {
        //     context.drawImage(
        //         this.imageSource,
        //         new Rect(new Vector(0, 100), new Vector(20, 120)),
        //         new Rect(new Vector(100, 220), new Vector(120, 240))
        //     );
        // });
    }

    // + pozycja
}