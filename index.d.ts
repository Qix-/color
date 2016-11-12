declare module "color" {
    export default function Color(obj: any): IColor;
    interface IColor {
        rgb(val: any): IColor;
        hsl(val: any): IColor;
        hsv(val: any): IColor;
        hwb(val: any): IColor;
        cmyk(val: any): IColor;

        rgb(): IColor;
        hsl(): IColor;
        hsv(): IColor;
        hwb(): IColor;
        cmyk(): IColor;

        rgbArray(): number[];
        hslArray(): number[];
        hsvArray(): number[];
        hwbArray(): number[];
        cmykArray(): number[];
        rgbaArray(): number[];
        rgbaArrayNormalized(): number[];
        hslaArray(): number[];

        alpha(val: any): IColor;
        red(val: any): IColor;
        green(val: any): IColor;
        blue(val: any): IColor;
        hue(val: any): IColor;
        lightness(val: any): IColor;
        saturation(val: any): IColor;
        whiteness(val: any): IColor;
        blackness(val: any): IColor;
        value(val: any): IColor;
        cyan(val: any): IColor;
        magenta(val: any): IColor;
        yellow(val: any): IColor;
        black(val: any): IColor;

        hexString(): string;
        rgbString(): string;
        rgbaString(): string;
        percentString(): string;
        hslString(): string;
        hslaString(): string;
        hwbString(): string;
        keyword(): string;

        rgbNumber(): number;

        luminosity(): number;

        contrast(color: IColor): number;
        level(color: IColor): string;
        dark(): boolean;
        light(): boolean;
        negate(): IColor;
        lighten(ratio: number): IColor;
        darken(ratio: number): IColor;
        saturate(ratio: number): IColor;
        desaturate(ratio: number): IColor;
        whiten(ratio: number): IColor;
        blacken(ratio: number): IColor;
        greyscale(): IColor;
        clearer(): IColor;
        opaquer(): IColor;
        rotate(degrees: number): IColor;
        mix(color: IColor, weight: number): IColor;

        toJSON(): IColor;
        clone(): IColor;
    }
}
