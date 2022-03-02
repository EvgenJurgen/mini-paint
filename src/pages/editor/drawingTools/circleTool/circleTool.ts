export const TOOL_CIRCLE = 'circle';

export class CircleTool {
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
    this.additionalContext?.beginPath();
    this.additionalContext?.arc(
      endX,
      endY,
      ((endX - startX) ** 2 + (endY - startY) ** 2) ** (1 / 2),
      0,
      2 * Math.PI
    );
    if (filling) {
      this.additionalContext?.fill();
    }
    this.additionalContext?.stroke();
    this.additionalContext?.closePath();
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
    this.mainContext?.arc(
      endX,
      endY,
      ((endX - startX) ** 2 + (endY - startY) ** 2) ** (1 / 2),
      0,
      2 * Math.PI
    );
    if (filling) {
      if (this.mainContext !== null) {
        this.mainContext.fillStyle = fillColor;
      }
      this.mainContext?.fill();
    }
    this.mainContext?.stroke();
  }
}
