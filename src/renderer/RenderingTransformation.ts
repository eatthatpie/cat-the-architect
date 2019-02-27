import RenderingTransformationInterface from "@/interfaces/RenderingTransformationInterface";
import Vector from "@/common/math/Vector";

export default class RenderingTransformation implements RenderingTransformationInterface {
    public opacity: number;
    public rotate: number;
    public scale: Vector;
    public translate: Vector;
}