import AnimationSetInterface from "@/interfaces/AnimationSetInterface";
import AnimationStateInterface from "@/interfaces/AnimationStateInterface";
import RenderingTransformation from "@/renderer/RenderingTransformation";
import RenderingTransformationInterface from "@/interfaces/RenderingTransformationInterface";

export default class AnimationState implements AnimationStateInterface {
    public name: string;
    private animationSet: AnimationSetInterface;
    private frameTime: number;

    // @TODO: first argument should not be optional, it has to be required
    constructor(animationSet?: AnimationSetInterface) {
        this.animationSet = animationSet;
        this.frameTime = 0;
    }

    public getAnimationSet(): AnimationSetInterface {
        return this.animationSet;
    }

    public getRenderingTransformation(): RenderingTransformationInterface {
        return new RenderingTransformation();
    }

    public increaseFrameTime(elapsedTime: number): number {
        this.frameTime += elapsedTime;

        return this.frameTime;
    }
}