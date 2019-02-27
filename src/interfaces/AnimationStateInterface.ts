import RenderingTransformationInterface from "./RenderingTransformationInterface";
import AnimationSetInterface from "./AnimationSetInterface";

export default interface AnimationStateInterface {
    getAnimationSet(): AnimationSetInterface;
    getRenderingTransformation(): RenderingTransformationInterface;
    increaseFrameTime(elapsedTime: number): number;
};