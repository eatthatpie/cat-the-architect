import Vector from '@/common/math/Vector';

export default interface ClickableInterface {
    mouseClick(mousePosition: Vector): any;
}