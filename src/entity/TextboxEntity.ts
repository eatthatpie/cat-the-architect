import EntityInterface from '@/interfaces/EntityInterface';
import RenderingContextInterface from '@/interfaces/RenderingContextInterface';
import Vector from '@/common/math/Vector';
import StyleInterface from '@/interfaces/StyleInterface';
import TextAlign from '@/common/flags/TextAlign';
import TextEntity from '@/entity/TextEntity';

export default class TextboxEntity implements EntityInterface {
    private lines: Array<any>;
    private position: Vector;
    private style: StyleInterface; // @TODO: StyleableInterface?
    private textEntityCollection: Array<TextEntity>;

    constructor() {
        this.lines = [];
        this.position = new Vector();
        this.style = {
            width: 800
        };
        this.textEntityCollection = [];
    }

    public addTextEntity(textEntity: TextEntity | Array<TextEntity>): TextboxEntity {
        if (Array.isArray(textEntity)) {
            this.textEntityCollection = [].concat(this.textEntityCollection, textEntity);
        }
        else {
            this.textEntityCollection.push(textEntity);
        }

        return this;
    }

    public onDraw(context: RenderingContextInterface, elapsedTime: number): any {
        if (this.lines.length === 0 && this.textEntityCollection.length > 0) {
            this.resolveTextLines(context);
        }

        this.lines.forEach((line, i) => {
            let positionX = this.position.x;

            if (line.style.textAlign === TextAlign.CENTER) {
                positionX += this.style.width / 2;
            }

            context.drawText(line.text, { 
                x: positionX,
                y: i * line.style.lineHeight + this.position.y + line.style.lineHeight
            }, line.style);
        });
    }

    // @TODO: refactor
    private resolveTextLines(context: RenderingContextInterface): void {
        const containerWidth = this.style.width;

        this.textEntityCollection.forEach(textEntity => {
            const text = textEntity.getValue();
            const textStyle = textEntity.getStyle();
            const textWidth = context.getTextNativeWidth(text, textStyle);

            const stepLength = text.length * (containerWidth / textWidth);
            let previousSegment = 0;

            while (previousSegment + stepLength <= text.length) {
                let segmentIndex = previousSegment + stepLength;
                let currentIndex = text.slice(previousSegment, segmentIndex).lastIndexOf(' ');
                let segmentText = text.slice(previousSegment, previousSegment + currentIndex).trim();

                while (context.getTextNativeWidth(segmentText, textStyle) > containerWidth) {
                    currentIndex = segmentText.lastIndexOf(' ') + 1;

                    if (currentIndex < 0) {
                        return;
                    }

                    segmentText = text.slice(previousSegment, previousSegment + currentIndex).trim();
                }

                while (context.getTextNativeWidth(segmentText, textStyle) > containerWidth) {
                    currentIndex = text.slice(previousSegment + currentIndex).trim().indexOf(' ') + 1;

                    if (currentIndex < 0) {
                        return;
                    }

                    segmentText = text.slice(previousSegment, previousSegment + currentIndex).trim();
                }

                this.lines.push({ 
                    text: segmentText, 
                    style: textStyle 
                });

                previousSegment = previousSegment + currentIndex;
            }

            if (previousSegment < text.length) {
                this.lines.push({ 
                    text: text.slice(previousSegment, text.length).trim(), 
                    style: textEntity.getStyle() 
                });
            }
        });
    }
    
    public setPosition(position: Vector): any {

    }
};