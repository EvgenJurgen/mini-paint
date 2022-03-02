export const TOOL_LINE = 'line';

export class LineTool {
  mainContext;
  additionalContext;

  constructor(
    mainContext: CanvasRenderingContext2D | null,
    additionalContext: CanvasRenderingContext2D | null
  ) {
    this.mainContext = mainContext;
    this.additionalContext = additionalContext;
  }

  temporaryDrawing(startX: number, startY: number, endX: number, endY: number): void {
    this.additionalContext?.beginPath();
    this.additionalContext?.moveTo(startX, startY);
    this.additionalContext?.lineTo(endX, endY);
    this.additionalContext?.stroke();
    this.additionalContext?.closePath();
  }

  finishDrawing(startX: number, startY: number, endX: number, endY: number): void {
    this.mainContext?.beginPath();
    this.mainContext?.moveTo(startX, startY);
    this.mainContext?.lineTo(endX, endY);
    this.mainContext?.stroke();
    this.mainContext?.closePath();
  }
}
