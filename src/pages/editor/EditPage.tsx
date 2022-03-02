import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../core/hooks/redux';
import { useDispatch } from 'react-redux';
import { saveImageOfUser } from '../../core/actions/imageActions';
import { TiHome } from 'react-icons/ti';
import { GiPaintBrush } from 'react-icons/gi';
import { HiOutlinePencil } from 'react-icons/hi';
import { BiSprayCan, BiRectangle } from 'react-icons/bi';
import { BsCircle, BsBorderWidth, BsSave } from 'react-icons/bs';
import { AiOutlineLine } from 'react-icons/ai';
import { MdOutlineColorLens } from 'react-icons/md';
import { Container } from '../../core/styles/styled-container';
import { WorkingArea } from '../../core/styles/styled-working-area';
import { Main } from '../../core/styles/styled-main';
import { Sidebar } from './styles/styled-sidebar';
import { SidebarItem } from './styles/styled-sidebar-item';
import { DrawingArea } from './styles/styled-drawing-area';
import { SaveButton } from './styles/styled-save-button';
import { HOME_ROUTE } from '../AppRoutes';
import { createElement, DrawingTools } from './drawingTools';
import { TOOL_BRUSH } from './drawingTools/brushTool/brushTool';
import { TOOL_LINE } from './drawingTools/lineTool/lineTool';
import { TOOL_RECTANGLE } from './drawingTools/rectangleTool/rectangleTool';
import { TOOL_CIRCLE } from './drawingTools/circleTool/circleTool';
import { TOOL_SPRAY } from './drawingTools/sprayTool/sprayTool';
import { TOOL_PENCIL } from './drawingTools/pencilTool/pencilTool';
import { DropdownLineWidthSlider } from './components/dropdownLineWidthSlider/DropdownLineWidthSlider';
import { DropdownColorPickers } from './components/dropdownColorPickers/DropdownColorPickers';

const TOOL_COLOR_PICKER = 'colorPicker';
const TOOL_LINE_WIDTH_SLIDER = 'lineWidthSlider';

const sidebarItems = [
  { tool: TOOL_BRUSH, icon: GiPaintBrush },
  { tool: TOOL_PENCIL, icon: HiOutlinePencil },
  { tool: TOOL_SPRAY, icon: BiSprayCan },
  { tool: TOOL_RECTANGLE, icon: BiRectangle },
  { tool: TOOL_CIRCLE, icon: BsCircle },
  { tool: TOOL_LINE, icon: AiOutlineLine },
  { tool: TOOL_COLOR_PICKER, icon: MdOutlineColorLens },
  { tool: TOOL_LINE_WIDTH_SLIDER, icon: BsBorderWidth },
];

const CANVAS_ERROR_MESSAGE = 'Your browser does not support the HTML 5 Canvas.';

export const EditPage = (): React.ReactElement => {
  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mainContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const additionalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const additionalContextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [filling, setFilling] = useState(false);
  const [fillColor, setFillColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(5);
  const [currentTool, setCurrentTool] = useState(TOOL_BRUSH);
  const [element, setElement] = useState(createElement());

  useEffect(() => {
    const canvas = mainCanvasRef.current;
    if (canvas != null) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const context = canvas.getContext('2d');
      if (context != null) {
        context.strokeStyle = color;
        context.fillStyle = fillColor;
        context.lineCap = 'round';
        context.lineWidth = lineWidth;
        mainContextRef.current = context;
      }
    }
  }, []);

  useEffect(() => {
    const canvas = additionalCanvasRef.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const context = canvas.getContext('2d');
      if (context != null) {
        context.strokeStyle = color;
        context.fillStyle = fillColor;
        context.lineCap = 'round';
        context.lineWidth = lineWidth;
        additionalContextRef.current = context;
      }
    }
  }, [element]);

  const drawingTools = useMemo(() => {
    return new DrawingTools(mainContextRef, additionalContextRef);
  }, [mainContextRef.current, additionalContextRef.current]);

  useEffect(() => {
    drawingTools.temporaryDrawing(currentTool, element, filling);
  }, [element]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    drawingTools.startDrawing(currentTool, offsetX, offsetY, setElement, color, lineWidth);
  };

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    drawingTools.draw(currentTool, offsetX, offsetY, setElement, lineWidth);
  };

  const finishDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    drawingTools.finishDrawing(
      currentTool,
      offsetX,
      offsetY,
      element,
      setElement,
      filling,
      fillColor,
      lineWidth
    );
    setIsDrawing(false);
  };

  const navigate = useNavigate();
  const handleToHomePage = () => {
    navigate(HOME_ROUTE);
  };

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mainContextRef.current) {
      setColor(e.target.value);
      mainContextRef.current.strokeStyle = e.target.value;
    }
  };

  const handleSetFilling = () => {
    setFilling(!filling);
  };

  const handleFillColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mainContextRef.current) {
      setFillColor(e.target.value);
      mainContextRef.current.fillStyle = e.target.value;
    }
  };

  const handleLineWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mainContextRef.current) {
      if (e.target.value.length === 0) {
        setLineWidth(0);
        mainContextRef.current.lineWidth = 0;
      } else {
        setLineWidth(parseInt(e.target.value));
        mainContextRef.current.lineWidth = parseInt(e.target.value);
      }
    }
  };

  const dispatch = useDispatch();
  const { uid } = useAppSelector((state) => state.user.user);

  const handleSave = () => {
    if (mainCanvasRef.current) {
      const imageUrl = mainCanvasRef.current.toDataURL();
      dispatch(saveImageOfUser({ uid, imageUrl }));
    }
  };

  return (
    <Container>
      <WorkingArea>
        <Sidebar>
          <SidebarItem currentTool={currentTool}>
            <TiHome onClick={handleToHomePage} />
          </SidebarItem>

          {sidebarItems.map((sidebarItem) => {
            return (
              <SidebarItem tool={sidebarItem.tool} currentTool={currentTool} key={sidebarItem.tool}>
                <sidebarItem.icon onClick={() => setCurrentTool(sidebarItem.tool)} />
              </SidebarItem>
            );
          })}

          <SaveButton>
            <BsSave onClick={handleSave} />
          </SaveButton>
        </Sidebar>
        <Main>
          <DropdownColorPickers
            isOpen={currentTool === TOOL_COLOR_PICKER}
            color={color}
            handleColor={handleColor}
            filling={filling}
            handleSetFilling={handleSetFilling}
            fillColor={fillColor}
            handleFillColor={handleFillColor}
          />
          <DropdownLineWidthSlider
            isOpen={currentTool === TOOL_LINE_WIDTH_SLIDER}
            lineWidth={lineWidth}
            handleLineWidth={handleLineWidth}
          />
          <DrawingArea>
            <canvas
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={finishDrawing}
              ref={mainCanvasRef}
              style={{ zIndex: 0 }}
            >
              {CANVAS_ERROR_MESSAGE}
            </canvas>
            <canvas
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={finishDrawing}
              ref={additionalCanvasRef}
              style={{ zIndex: 1 }}
            >
              {CANVAS_ERROR_MESSAGE}
            </canvas>
          </DrawingArea>
        </Main>
      </WorkingArea>
    </Container>
  );
};
