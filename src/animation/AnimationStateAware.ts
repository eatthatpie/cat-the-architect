import AnimatableInterface from "@/interfaces/AnimatableInterface";
import AnimationStateInterface from "@/interfaces/AnimationStateInterface";
import AnimationState from "./AnimationState";

export default class AnimationStateAware implements AnimatableInterface {
    protected animationState: AnimationStateInterface;

    constructor() {
        this.animationState = new AnimationState();
    }

    public getAnimationState(): AnimationStateInterface {
        return this.animationState;
    }

    public setAnimationState(animationState: AnimationStateInterface): void {
        this.animationState = animationState;
    }
};