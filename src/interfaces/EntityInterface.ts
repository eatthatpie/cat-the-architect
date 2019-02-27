import AnimatableInterface from './AnimatableInterface';
import ClickableInterface from '@/interfaces/ClickableInterface';
import HoverableInterface from './HoverableInterface';
import RenderingContextInterface from './RenderingContextInterface';
import Vector from '@/common/math/Vector';

export default interface EntityInterface extends AnimatableInterface, ClickableInterface, HoverableInterface {
    onDraw(context: RenderingContextInterface, elapsedTime: number): any;
    onPreDraw(context: RenderingContextInterface): any;
    setPosition(position: Vector): any;
};