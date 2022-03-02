export const TOOL_RECTANGLE = 'rectangle';

export class RectangleTool {
  mainContext;
  additionalContext;

  constructor(
    mainContext: CanvasRenderingContext2D | null,
    additionalContext: CanvasRenderingContext2D | null
  ) {
    this.mainContext = mainContext;
    this.additionalContext = additionalContext;
  }

  temporaryDrawing(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    filling: boolean
  ): void {
    this.additionalContext?.rect(startX, startY, endX - startX, endY - startY);
    if (filling) {
      this.additionalContext?.fill();
    }
    this.additionalContext?.stroke();
  }

  finishDrawing(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    filling: boolean,
    fillColor: string
  ): void {
    this.mainContext?.beginPath();
    this.mainContext?.rect(startX, startY, endX - startX, endY - startY);
    if (filling) {
      if (this.mainContext !== null) {
        this.mainContext.fillStyle = fillColor;
      }
      this.mainContext?.fill();
    }
    this.mainContext?.stroke();
    this.mainContext?.closePath();
  }
}
