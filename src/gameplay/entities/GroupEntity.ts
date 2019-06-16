import SpriteEntity from "@/entity/SpriteEntity";
import StoreSubscriberInterface from "@/interfaces/StoreSubscriberInterface";
import Rect from "@/common/math/Rect";
import Vector from "@/common/math/Vector";

export default class GroupEntity extends SpriteEntity implements StoreSubscriberInterface {
    public constructor() {
        super(
            '/assets/backgrounds/example.jpg', 
            new Rect(new Vector(0, 0), new Vector(200, 400)), 
            new Rect(new Vector(80, 80), new Vector(280, 480))
        );
    }

    public addBlocks(): void {

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
        
    }

    public storeDataChange({ get, dispatch }, { state, currentBlockEntity }): void {
        
    }
}