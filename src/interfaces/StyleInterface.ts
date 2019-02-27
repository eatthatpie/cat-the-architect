import Color from '@/common/Color';
import TextAlign from '@/common/flags/TextAlign';

export default interface StyleInterface {
    color?: Color;
    fontFamily?: string;
    fontSize?: number;
    lineHeight?: number;
    margin?: Array<number>,
    padding?: Array<number>,
    textAlign?: TextAlign;
    width?: number; // @TODO: enable percents here
};