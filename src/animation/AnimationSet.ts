import AnimationInterface from "@/interfaces/AnimationInterface";
import AnimationSetInterface from "@/interfaces/AnimationSetInterface";

export default class AnimationSet implements AnimationSetInterface {
    private animationCollection: Array<AnimationInterface>;
    public name: string;

    constructor(animationCollection?: Array<AnimationInterface>) {
        this.animationCollection = animationCollection;
    }

    public addAnimation(animation: AnimationInterface): void {
        this.animationCollection.push(animation);
    }

    public getName(): string {
        return this.name;
    }

    public update(frameTime: number) {
        this.animationCollection.forEach(animation => {
            animation.update(frameTime);
        });

        // @TODO: check if ended, if so mark it and fire hooks
    }
};