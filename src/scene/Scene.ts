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

    public onEnter(): void {
        console.log('[DE: Scene] On enter...');

        console.log('[DE: Scene] On finish enter...');
    }

    public onLeave(): void {
        console.log('[DE: Scene] On leave...')

        console.log('[DE: Scene] On finsh leave...')
    }
};