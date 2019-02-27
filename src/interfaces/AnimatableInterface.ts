import AnimationStateInterface from "./AnimationStateInterface";

export default interface AnimatableInterface {
    getAnimationState(): AnimationStateInterface;
    setAnimationState(animationState: AnimationStateInterface): any;
};