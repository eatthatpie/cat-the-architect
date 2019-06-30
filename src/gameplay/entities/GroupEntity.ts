import SpriteEntity from "@/entity/SpriteEntity";
import StoreSubscriberInterface from "@/interfaces/StoreSubscriberInterface";
import Rect from "@/common/math/Rect";
import Vector from "@/common/math/Vector";
import RenderingContextInterface from "@/interfaces/RenderingContextInterface";
import GridBlockInterface from "../interfaces/GridBlockInterface";
import GridBlock from "../grid/GridBlock";

export default class GroupEntity extends SpriteEntity implements StoreSubscriberInterface {
    private grid: GridBlockInterface;

    public constructor() {
        super(
            '/assets/backgrounds/example.jpg', 
            new Rect(new Vector(0, 0), new Vector(200, 400)), 
            new Rect(new Vector(80, 80), new Vector(280, 480))
        );

        this.grid = new GridBlock();
    }

    public addBlocks(): void {

    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number): void {
        const gridArray = this.grid.toArray();

        for (let i = 0; i < gridArray.length; i++) {
            for (let j = 0; j < gridArray[i].length; j++) {
                if (gridArray[i][j].getIsTaken()) {
                    context.drawImage(
                        this.imageSource,
                        new Rect(
                            new Vector(0, 0),
                            new Vector(20, 20)
                        ),
                        new Rect(
                            new Vector(
                                80 + (j * 20),
                                80 + (i * 20)
                            ),
                            new Vector(
                                100 + (j * 20),
                                100 + (i * 20)
                            )
                        )
                    );
                }
            }
        }
    }

    public isDestroyable(): Boolean {
        return false;
    }

    public isKilling(): Boolean {
        return false;
    }

    public updateGroup(): void {

    }

    public storeData({ get, dispatch }, { state, currentBlockEntity }): void {
        this.grid = state.grid;
    }

    public storeDataChange({ get, dispatch }, { state, currentBlockEntity }): void {
        this.grid = state.grid;
    }
}