export const TOOL_BRUSH = 'brush';

export class BrushTool {
  mainContext;

  constructor(mainContext: CanvasRenderingContext2D | null) {
    this.mainContext = mainContext;
  }

  startDrawing(offsetX: number, offsetY: number): void {
    this.mainContext?.beginPath();
    this.mainContext?.moveTo(offsetX, offsetY);
  }

  draw(offsetX: number, offsetY: number): void {
    this.mainContext?.lineTo(offsetX, offsetY);
    this.mainContext?.stroke();
  }

  finishDrawing(): void {
    this.mainContext?.closePath();
  }
}
