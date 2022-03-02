export const TOOL_SPRAY = 'spray';

export class SprayTool {
  mainContext;

  constructor(mainContext: CanvasRenderingContext2D | null) {
    this.mainContext = mainContext;
  }

  drawSpray(x: number, y: number, lineWidth: number): void {
    Array.from({ length: lineWidth * 3 }).forEach(() => {
      this.mainContext?.rect(x + Math.random() * lineWidth, y + Math.random() * lineWidth, 1, 1);
      this.mainContext?.fill();
    });
  }

  startDrawing(offsetX: number, offsetY: number, color: string, lineWidth: number): void {
    this.mainContext?.beginPath();
    if (this.mainContext !== null) {
      this.mainContext.fillStyle = color;
    }
    this.drawSpray(offsetX, offsetY, lineWidth);
  }

  draw(x: number, y: number, lineWidth: number): void {
    this.drawSpray(x, y, lineWidth);
  }

  finishDrawing(): void {
    this.mainContext?.closePath();
  }
}
