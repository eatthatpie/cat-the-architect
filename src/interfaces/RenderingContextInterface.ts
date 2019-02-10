import ColorInterface from '@/interfaces/ColorInterface';
import StyleInterface from '@/interfaces/StyleInterface';
import Vector from '@/common/math/Vector';

export default interface RenderingContextInterface {
    clearScreen(color: ColorInterface): void;
    drawText(text: string, position: Vector, style: StyleInterface): void;
    getTextNativeWidth(text: string, style?: StyleInterface): number; // @TODO: jakiś global/default font?
};