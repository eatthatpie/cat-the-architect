import ImageResourceInterface from '@/interfaces/ImageResourceInterface';

export default class ImageResource implements ImageResourceInterface {
    private imageObject: HTMLImageElement;
    private imageSourcePath: string;
    
    constructor(imageSourcePath: string) {
        this.imageObject = new Image();
        this.imageSourcePath = imageSourcePath;
        
        this.imageObject.src = this.imageSourcePath;
    }

    public getCanvasImageSource(): CanvasImageSource {
        return this.imageObject;
    }
};