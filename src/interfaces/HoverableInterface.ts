import Rect from '@/common/math/Rect';
import Vector from '@/common/math/Vector';

export default interface HoverableInterface {
    mouseMove(mousePosition: Vector): any;
}