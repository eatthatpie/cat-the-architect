import Vector from "@/common/math/Vector";

export default interface RenderingTransformationInterface {
    opacity: number;
    rotate: number;
    scale: Vector;
    translate: Vector;
};