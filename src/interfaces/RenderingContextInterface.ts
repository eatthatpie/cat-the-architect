import ColorInterface from '@/interfaces/ColorInterface';
import ImageResourceInterface from './ImageResourceInterface';
import Rect from '@/common/math/Rect';
import StyleInterface from '@/interfaces/StyleInterface';
import Vector from '@/common/math/Vector';

export default interface RenderingContextInterface {
    clearScreen(color: ColorInterface): void;
    drawImage(imageResource: ImageResourceInterface, sourceRect: Rect, canvasRect: Rect): void;
    drawRect(rect: Rect, fillColor?: ColorInterface, borderWidth?: number, borderColor?: ColorInterface): void;
    drawText(text: string, position: Vector, style: StyleInterface): void;
    getTextNativeWidth(text: string, style?: StyleInterface): number;
};