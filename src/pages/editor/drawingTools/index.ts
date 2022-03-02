import { BrushTool, TOOL_BRUSH } from './brushTool/brushTool';
import { CircleTool, TOOL_CIRCLE } from './circleTool/circleTool';
import { LineTool, TOOL_LINE } from './lineTool/lineTool';
import { PencilTool, TOOL_PENCIL } from './pencilTool/pencilTool';
import { RectangleTool, TOOL_RECTANGLE } from './rectangleTool/rectangleTool';
import { SprayTool, TOOL_SPRAY } from './sprayTool/sprayTool';

type Element = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

type SetElement = React.Dispatch<React.SetStateAction<Element>>;

export const createElement = (startX = NaN, startY = NaN, endX = NaN, endY = NaN): Element => {
  return {
    startX,
    startY,
    endX,
    endY,
  };
};

export class DrawingTools {
  brush;
  line;
  rectangle;
  circle;
  spray;
  pencil;

  constructor(
    mainContextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
    additionalContextRef: React.MutableRefObject<CanvasRenderingContext2D | null>
  ) {
    this.brush = new BrushTool(mainContextRef.current);
    this.line = new LineTool(mainContextRef.current, additionalContextRef.current);
    this.rectangle = new RectangleTool(mainContextRef.current, additionalContextRef.current);
    this.circle = new CircleTool(mainContextRef.current, additionalContextRef.current);
    this.spray = new SprayTool(mainContextRef.current);
    this.pencil = new PencilTool(mainContextRef.current);
  }

  temporaryDrawing(currentTool: string, element: Element, filling: boolean): void {
    const { startX, startY, endX, endY } = element;
    switch (currentTool) {
      case TOOL_LINE:
        this.line.temporaryDrawing(startX, startY, endX, endY);
        break;
      case TOOL_RECTANGLE:
        this.rectangle.temporaryDrawing(startX, startY, endX, endY, filling);
        break;
      case TOOL_CIRCLE:
        this.circle.temporaryDrawing(startX, startY, endX, endY, filling);
        break;
    }
  }

  startDrawing(
    currentTool: string,
    offsetX: number,
    offsetY: number,
    setElement: SetElement,
    color: string,
    lineWidth: number
  ): void {
    switch (currentTool) {
      case TOOL_BRUSH:
        this.brush.startDrawing(offsetX, offsetY);
        break;
      case TOOL_LINE:
      case TOOL_RECTANGLE:
      case TOOL_CIRCLE:
        setElement((prevState) => ({
          ...prevState,
          startX: offsetX,
          startY: offsetY,
          endX: offsetX,
          endY: offsetY,
        }));
        break;
      case TOOL_SPRAY:
        this.spray.startDrawing(offsetX, offsetY, color, lineWidth);
        break;
      case TOOL_PENCIL:
        this.pencil.startDrawing(offsetX, offsetY, color, lineWidth);
        break;
    }
  }

  draw(
    currentTool: string,
    offsetX: number,
    offsetY: number,
    setElement: SetElement,
    lineWidth: number
  ): void {
    switch (currentTool) {
      case TOOL_BRUSH:
        this.brush.draw(offsetX, offsetY);
        break;
      case TOOL_LINE:
      case TOOL_RECTANGLE:
      case TOOL_CIRCLE:
        setElement((prevState) => ({ ...prevState, startX: offsetX, startY: offsetY }));
        break;
      case TOOL_SPRAY:
        this.spray.draw(offsetX, offsetY, lineWidth);
        break;
      case TOOL_PENCIL:
        this.pencil.draw(offsetX, offsetY, lineWidth);
        break;
    }
  }

  finishDrawing(
    currentTool: string,
    offsetX: number,
    offsetY: number,
    element: Element,
    setElement: SetElement,
    filling: boolean,
    fillColor: string,
    lineWidth: number
  ): void {
    const { startX, startY, endX, endY } = element;
    switch (currentTool) {
      case TOOL_BRUSH:
        this.brush.finishDrawing();
        break;
      case TOOL_LINE:
        setElement((prevState) => ({ ...prevState, ...createElement() }));
        this.line.finishDrawing(startX, startY, endX, endY);
        break;
      case TOOL_RECTANGLE:
        setElement((prevState) => ({ ...prevState, ...createElement() }));
        this.rectangle.finishDrawing(startX, startY, endX, endY, filling, fillColor);
        break;
      case TOOL_CIRCLE:
        setElement((prevState) => ({ ...prevState, ...createElement() }));
        this.circle.finishDrawing(startX, startY, endX, endY, filling, fillColor);
        break;
      case TOOL_SPRAY:
        this.spray.finishDrawing();
        break;
      case TOOL_PENCIL:
        this.pencil.finishDrawing(offsetX, offsetY, lineWidth);
        break;
    }
  }
}
