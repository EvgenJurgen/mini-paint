export const TOOL_PENCIL = 'pencil';

export class PencilTool {
  mainContext;

  constructor(mainContext: CanvasRenderingContext2D | null) {
    this.mainContext = mainContext;
  }

  drawPencil(x: number, y: number, lineWidth: number): void {
    Array.from({ length: lineWidth * 6 }).forEach(() => {
      this.mainContext?.arc(
        x + Math.random() * lineWidth,
        y + Math.random() * lineWidth,
        1,
        0,
        2 * Math.PI
      );
      this.mainContext?.fill();
    });
  }

  startDrawing(offsetX: number, offsetY: number, color: string, lineWidth: number): void {
    this.mainContext?.beginPath();
    if (this.mainContext !== null) {
      this.mainContext.fillStyle = color;
    }
    this.drawPencil(offsetX, offsetY, lineWidth);
    this.mainContext?.closePath();
  }

  draw(offsetX: number, offsetY: number, lineWidth: number): void {
    this.mainContext?.beginPath();
    this.drawPencil(offsetX, offsetY, lineWidth);
    this.mainContext?.closePath();
  }

  finishDrawing(offsetX: number, offsetY: number, lineWidth: number): void {
    this.mainContext?.beginPath();
    this.drawPencil(offsetX, offsetY, lineWidth);
    this.mainContext?.closePath();
  }
}
