import SpriteEntity from "@/entity/SpriteEntity";
import StoreSubscriberInterface from "@/interfaces/StoreSubscriberInterface";
import Rect from "@/common/math/Rect";
import Vector from "@/common/math/Vector";
import RenderingContextInterface from "@/interfaces/RenderingContextInterface";
import GridBlockInterface from "../interfaces/GridBlockInterface";
import GridBlock from "../grid/GridBlock";

export default class NextBlockEntity extends SpriteEntity implements StoreSubscriberInterface {
    private gridBlock: GridBlockInterface;

    public constructor() {
        super(
            '/assets/backgrounds/example.jpg', 
            null,
            null
        );

        this.gridBlock = new GridBlock();
    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number): void {
        const gridArray = this.gridBlock.toArray();

        for (let i = 0; i < gridArray.length; i++) {
            for (let j = 0; j < gridArray[i].length; j++) {
                if (gridArray[i][j].getIsTaken()) {
                    const relativeRowIndex = i - 4;
                    const relativeColIndex = j - 4;
                    const typeIndex = (gridArray[i][j].getType() - 1) * 20

                    context.drawImage(
                        this.imageSource,
                        new Rect(
                            new Vector(0, 0 + typeIndex),
                            new Vector(20, 20 + typeIndex)
                        ),
                        new Rect(
                            new Vector(
                                80 + (relativeColIndex * 20),
                                80 + (relativeRowIndex * 20)
                            ),
                            new Vector(
                                100 + (relativeColIndex * 20),
                                100 + (relativeRowIndex * 20)
                            )
                        )
                    );
                }
            }
        }
    }

    public reset(): void {}

    public storeData({ get, dispatch }, { nextBlock }): void {
        if (nextBlock) {
            this.gridBlock = nextBlock;
        }
    }

    public storeDataChange({ get, dispatch }, { nextBlock }): void {
        if (nextBlock) {
            this.gridBlock = nextBlock;
        }
    }

    // + pozycja
}