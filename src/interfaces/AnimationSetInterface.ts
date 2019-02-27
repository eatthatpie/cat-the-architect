import AnimationInterface from "./AnimationInterface";

export default interface AnimationSetInterface {
    name: string;
    addAnimation(animation: AnimationInterface): any;
    getName(): string;
    update(frameTime: number): any;
};