import ColorInterface from "@/interfaces/ColorInterface";

export default class Color implements ColorInterface {
    private hex: string;

    constructor(color: string) {
        this.hex = color;
    }

    public getHex(): string {
        return this.hex;
    }

    public static hex(color: string): Color {
        return new Color(color);
    }
};