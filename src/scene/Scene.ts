import EntityInterface from '@/interfaces/EntityInterface';
import SceneInterface from '@/interfaces/SceneInterface';

export default class Scene implements SceneInterface {
    private entityCollection: Array<EntityInterface>;

    constructor() {
        this.entityCollection = [];
    }

    public addEntity(entity: EntityInterface): void {
        this.entityCollection.push(entity);
    }

    public getEntities(): Array<EntityInterface> {
        return this.entityCollection;
    }
};