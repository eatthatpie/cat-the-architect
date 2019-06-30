import SpriteEntity from "@/entity/SpriteEntity";
import StoreSubscriberInterface from "@/interfaces/StoreSubscriberInterface";
import Rect from "@/common/math/Rect";
import Vector from "@/common/math/Vector";
import RenderingContextInterface from "@/interfaces/RenderingContextInterface";
import GridBlockInterface from "../interfaces/GridBlockInterface";
import GridBlock from "../grid/GridBlock";

export default class CurrentBlockEntity extends SpriteEntity /** BlockEntity */ implements StoreSubscriberInterface {
    private col: number;
    private gridBlock: GridBlockInterface;
    private position: Vector;
    private row: number;

    public constructor() {
        super(
            '/assets/backgrounds/example.jpg', 
            null,
            null
        );

        this.col = 1;
        this.gridBlock = new GridBlock();
        this.position = new Vector(100, 220);
        this.row = 1;
    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number): void {
        const gridArray = this.gridBlock.toArray();

        for (let i = 0; i < gridArray.length; i++) {
            for (let j = 0; j < gridArray[i].length; j++) {
                if (gridArray[i][j].getIsTaken()) {
                    const relativeRowIndex = i + this.row - 1;
                    const relativeColIndex = j + this.col - 1;

                    context.drawImage(
                        this.imageSource,
                        new Rect(
                            new Vector(0, 0),
                            new Vector(20, 20)
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

    public reset(): void {

    }

    public updatePosition(positionY: number): void {
        this.position.y = positionY;
    }

    public storeData({ get, dispatch }, { state }): void {
        if (state.col) {
            this.col = state.col;
        }

        if (state.gridBlock) {
            this.gridBlock = state.gridBlock;
        }

        if (state.positionY) {
            this.updatePosition(state.positionY);
        }
        
        if (state.row) {
            this.row = state.row;
        }
    }

    public storeDataChange({ get, dispatch }, { state }): void {
        if (state.col) {
            this.col = state.col;
        }

        if (state.gridBlock) {
            this.gridBlock = state.gridBlock;
        }

        if (state.positionY) {
            this.updatePosition(state.positionY);
        }
        
        if (state.row) {
            this.row = state.row;
        }
    }

    // + pozycja
}