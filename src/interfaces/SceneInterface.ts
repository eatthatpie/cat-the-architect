import EntityInterface from '@/interfaces/EntityInterface';

export default interface SceneInterface {
    getEntities(): Array<EntityInterface>;
    onEnter(): any;
    onLeave(): any;
};