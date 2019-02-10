import RenderingContextInterface from './RenderingContextInterface';
import Vector from '@/common/math/Vector';

export default interface EntityInterface /*extends BootableInterface, MediatorInterface*/ {
    onDraw(context: RenderingContextInterface, elapsedTime: number): any;
    setPosition(position: Vector): any;
};