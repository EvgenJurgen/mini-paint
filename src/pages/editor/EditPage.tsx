import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Container } from '../../core/components/Container';
import { WorkingAria } from '../../core/components/WorkingAria';

import { TiHome } from 'react-icons/ti';
import { GiPaintBrush } from 'react-icons/gi';
import { HiOutlinePencil } from 'react-icons/hi';
import { BiSprayCan, BiRectangle } from 'react-icons/bi';
import { BsCircle, BsBorderWidth, BsSave } from 'react-icons/bs';
import { AiOutlineLine } from 'react-icons/ai';
import { MdOutlineColorLens } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../core/hooks/redux';
import { Main } from '../../core/components/Main';

import { saveImageOfUser } from '../../core/reducers/imagesReducer';

const TOOL_BRUSH = 'brush';
const TOOL_PENCIL = 'pencil';
const TOOL_SPRAY = 'spray';
const TOOL_RECTANGLE = 'rectangle';
const TOOL_CIRCLE = 'circle';
const TOOL_LINE = 'line';
const TOOL_COLOR_PICKER = 'colorPicker';
const TOOL_LINE_WIDTH_SLIDER = 'lineWidthSlider';

export const EditPage = () => {
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

	const createElement = (startX = NaN, startY = NaN, endX = NaN, endY = NaN) => {
		return {
			startX,
			startY,
			endX,
			endY,
		};
	};

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

			if (context != null) {
				const { startX, startY, endX, endY } = element;
				switch (currentTool) {
					case TOOL_LINE:
						context.beginPath();
						context.moveTo(startX, startY);
						context.lineTo(endX, endY);
						context.stroke();
						context.closePath();
						break;
					case TOOL_RECTANGLE:
						context.rect(startX, startY, endX - startX, endY - startY);
						if (filling) {
							context.fill();
						}
						context.stroke();
						break;
					case TOOL_CIRCLE:
						context.beginPath();
						context.arc(
							endX,
							endY,
							((endX - startX) ** 2 + (endY - startY) ** 2) ** (1 / 2),
							0,
							2 * Math.PI
						);
						if (filling) {
							context.fill();
						}
						context.stroke();
						context.closePath();
						break;
				}
			}
		}
	}, [element]);

	const drawSpray = (x: number, y: number) => {
		Array.from({ length: lineWidth * 3 }).forEach((item) => {
			mainContextRef.current?.rect(
				x + Math.random() * lineWidth,
				y + Math.random() * lineWidth,
				1,
				1
			);
			mainContextRef.current?.fill();
		});
	};

	const drawPencil = (x: number, y: number) => {
		Array.from({ length: lineWidth * 6 }).forEach((item) => {
			mainContextRef.current?.arc(
				x + Math.random() * lineWidth,
				y + Math.random() * lineWidth,
				1,
				0,
				2 * Math.PI
			);
			mainContextRef.current?.fill();
		});
	};

	const startDrawing = ({ nativeEvent }: any) => {
		if (mainContextRef.current != null) {
			setIsDrawing(true);
			const { offsetX, offsetY } = nativeEvent;

			switch (currentTool) {
				case TOOL_BRUSH:
					mainContextRef.current.beginPath();
					mainContextRef.current.moveTo(offsetX, offsetY);
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
					mainContextRef.current.beginPath();
					mainContextRef.current.fillStyle = color;
					drawSpray(offsetX, offsetY);
					break;
				case TOOL_PENCIL:
					mainContextRef.current.beginPath();
					mainContextRef.current.fillStyle = color;
					drawPencil(offsetX, offsetY);
					mainContextRef.current.closePath();
					break;
			}
		}
	};

	const draw = ({ nativeEvent }: any) => {
		if (mainContextRef.current != null) {
			if (!isDrawing) {
				return;
			}
			const { offsetX, offsetY } = nativeEvent;
			switch (currentTool) {
				case TOOL_BRUSH:
					mainContextRef.current.lineTo(offsetX, offsetY);
					mainContextRef.current.stroke();
					break;
				case TOOL_LINE:
				case TOOL_RECTANGLE:
				case TOOL_CIRCLE:
					setElement((prevState) => ({ ...prevState, startX: offsetX, startY: offsetY }));
					break;
				case TOOL_SPRAY:
					drawSpray(offsetX, offsetY);
					break;
				case TOOL_PENCIL:
					mainContextRef.current.beginPath();
					drawPencil(offsetX, offsetY);
					mainContextRef.current.closePath();
					break;
			}
		}
	};

	const finishDrawing = ({ nativeEvent }: any) => {
		if (mainContextRef.current != null) {
			const { offsetX, offsetY } = nativeEvent;

			const { startX, startY, endX, endY } = element;
			switch (currentTool) {
				case TOOL_BRUSH:
					mainContextRef.current.closePath();
					break;
				case TOOL_LINE:
					setElement((prevState) => ({ ...prevState, ...createElement() }));
					mainContextRef.current.beginPath();
					mainContextRef.current.moveTo(startX, startY);
					mainContextRef.current.lineTo(endX, endY);
					mainContextRef.current.stroke();
					mainContextRef.current.closePath();
					break;
				case TOOL_RECTANGLE:
					setElement((prevState) => ({ ...prevState, ...createElement() }));
					mainContextRef.current.beginPath();
					mainContextRef.current.rect(startX, startY, endX - startX, endY - startY);
					if (filling) {
						mainContextRef.current.fillStyle = fillColor;
						mainContextRef.current.fill();
					}
					mainContextRef.current.stroke();
					mainContextRef.current.closePath();
					break;
				case TOOL_CIRCLE:
					setElement((prevState) => ({ ...prevState, ...createElement() }));
					mainContextRef.current.beginPath();
					mainContextRef.current.arc(
						endX,
						endY,
						((endX - startX) ** 2 + (endY - startY) ** 2) ** (1 / 2),
						0,
						2 * Math.PI
					);
					if (filling) {
						mainContextRef.current.fillStyle = fillColor;
						mainContextRef.current.fill();
					}
					mainContextRef.current.stroke();
					break;
				case TOOL_SPRAY:
					mainContextRef.current.closePath();
					break;
				case TOOL_PENCIL:
					mainContextRef.current.beginPath();
					drawPencil(offsetX, offsetY);
					mainContextRef.current.closePath();
					break;
			}
			setIsDrawing(false);
		}
	};

	const navigate = useNavigate();
	const handleToHomePage = () => {
		navigate('/home');
	};

	const handleColor = (e: any) => {
		if (mainContextRef.current) {
			setColor(e.target.value);
			mainContextRef.current.strokeStyle = e.target.value;
		}
	};

	const handleFillColor = (e: any) => {
		if (mainContextRef.current) {
			setFillColor(e.target.value);
			mainContextRef.current.fillStyle = e.target.value;
		}
	};

	const handleLineWidth = (e: any) => {
		if (mainContextRef.current) {
			setLineWidth(e.target.value);
			mainContextRef.current.lineWidth = e.target.value;
		}
	};

	const dispatch = useAppDispatch();
	const { uid } = useAppSelector((state) => state.user.user);

	const handleSave = (e: any) => {
		if (mainCanvasRef.current) {
			const dataURL = mainCanvasRef.current.toDataURL();
			dispatch(saveImageOfUser({ uid, dataURL }));
		}
	};

	return (
		<Container>
			<WorkingAria>
				<Sidebar>
					<SidebarItem currentTool={currentTool}>
						<TiHome onClick={() => handleToHomePage()} />
					</SidebarItem>

					<SidebarItem tool={TOOL_BRUSH} currentTool={currentTool}>
						<GiPaintBrush onClick={() => setCurrentTool(TOOL_BRUSH)} />
					</SidebarItem>

					<SidebarItem tool={TOOL_PENCIL} currentTool={currentTool}>
						<HiOutlinePencil onClick={() => setCurrentTool(TOOL_PENCIL)} />
					</SidebarItem>

					<SidebarItem tool={TOOL_SPRAY} currentTool={currentTool}>
						<BiSprayCan onClick={() => setCurrentTool(TOOL_SPRAY)} />
					</SidebarItem>

					<SidebarItem tool={TOOL_RECTANGLE} currentTool={currentTool}>
						<BiRectangle onClick={() => setCurrentTool(TOOL_RECTANGLE)} />
					</SidebarItem>

					<SidebarItem tool={TOOL_CIRCLE} currentTool={currentTool}>
						<BsCircle onClick={() => setCurrentTool(TOOL_CIRCLE)} />
					</SidebarItem>

					<SidebarItem tool={TOOL_LINE} currentTool={currentTool}>
						<AiOutlineLine onClick={() => setCurrentTool(TOOL_LINE)} />
					</SidebarItem>

					<SidebarItem tool={TOOL_COLOR_PICKER} currentTool={currentTool}>
						<MdOutlineColorLens
							onClick={() => {
								setCurrentTool(TOOL_COLOR_PICKER);
							}}
						/>
					</SidebarItem>

					<SidebarItem tool={TOOL_LINE_WIDTH_SLIDER} currentTool={currentTool}>
						<BsBorderWidth
							onClick={() => {
								setCurrentTool(TOOL_LINE_WIDTH_SLIDER);
							}}
						/>
					</SidebarItem>

					<SaveButton>
						<BsSave onClick={handleSave} />
					</SaveButton>
				</Sidebar>
				<Main>
					<Dropdown isOpen={currentTool === TOOL_COLOR_PICKER}>
						<ColorPicker>
							<input type="color" onChange={handleColor} value={color} />
							<input type="text" onChange={handleColor} value={color} />
						</ColorPicker>
						<Checkbox>
							<input
								type="checkbox"
								id="filling"
								name="filling"
								checked={filling}
								onClick={() => setFilling(!filling)}
							/>
							<label htmlFor="filling">Filling</label>
						</Checkbox>
						{filling && (
							<ColorPicker>
								<input type="color" onChange={handleFillColor} value={fillColor} />
								<input type="text" onChange={handleFillColor} value={fillColor} />
							</ColorPicker>
						)}
					</Dropdown>

					<Dropdown isOpen={currentTool === TOOL_LINE_WIDTH_SLIDER}>
						<LineWidthSlider value={lineWidth}>
							<input type="range" onChange={handleLineWidth} value={lineWidth} />
							<input type="text" onChange={handleLineWidth} value={lineWidth} />
						</LineWidthSlider>
					</Dropdown>

					<DrawingAria>
						<canvas
							onMouseDown={startDrawing}
							onMouseMove={draw}
							onMouseUp={finishDrawing}
							ref={mainCanvasRef}
							style={{ zIndex: 0 }}
						>
							Your browser does not support the HTML 5 Canvas.
						</canvas>

						<canvas
							onMouseDown={startDrawing}
							onMouseMove={draw}
							onMouseUp={finishDrawing}
							ref={additionalCanvasRef}
							style={{ zIndex: 1 }}
						>
							Your browser does not support the HTML 5 Canvas.
						</canvas>
					</DrawingAria>
				</Main>
			</WorkingAria>
		</Container>
	);
};

const Dropdown = ({ children, isOpen }: any) => {
	return <DropdownMenu isOpen={isOpen}>{isOpen && children}</DropdownMenu>;
};

const Sidebar = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 10%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SidebarItem = styled.div`
	padding: 0.4rem 0;
	cursor: pointer;
	font-size: 1.75rem;
	color: ${({ theme }) => theme.textColor};

	&:hover {
		color: ${({ theme }) => theme.hoverColor};
	}

	border-left: ${(props: any) =>
		props.tool === props.currentTool ? `3px solid ${props.theme.selectedColor}` : 'none'};
	border-radius: 2px;
` as any;

const DrawingAria = styled.div`
	position: relative;

	canvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 90vh;
		@media (max-width: 768px) {
			height: 100vh;
		}
	}
`;

const DropdownMenu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 999999;
	background-color: ${({ theme }) => theme.primary};
	width: ${({ isOpen }: any) => (isOpen ? '30%' : '0')};

	height: ${({ isOpen }: any) => (isOpen ? '100%' : '0')};

	@media (max-width: 768px) {
		width: ${({ isOpen }: any) => (isOpen ? '50%' : '0')};
	}
` as any;

const DropdownItem = styled.span`
	display: inline-flex;
	align-items: center;
	width: 90%;
	padding: 4px 12px;
	margin: 10px 2px;
	border: 1px solid ${({ theme }) => theme.additionalBorderColor};
	border-radius: 4px;

	input[type='text'] {
		background-color: ${({ theme }) => theme.secondary};
		border: none;
		border-radius: 3px;
		width: 100%;
		font-size: 14px;
	}
`;

const ColorPicker = styled(DropdownItem)`
	input[type='color'] {
		margin-right: 8px;
		-webkit-appearance: none;
		border: none;
		width: auto;
		height: auto;
		cursor: pointer;
		background: none;
		&::-webkit-color-swatch-wrapper {
			padding: 0;
			width: 14px;
			height: 14px;
		}
		&::-webkit-color-swatch {
			border: 1px solid ${({ theme }) => theme.additionalBorderColor};
			border-radius: 4px;
			padding: 0;
		}
	}
`;

const Checkbox = styled(DropdownItem)`
	border: none;
	input[type='checkbox'] {
		margin-right: 8px;
		cursor: pointer;
	}
`;

const LineWidthSlider = styled(DropdownItem)`
	input[type='range'] {
		width: 400%;
		margin-right: 8px;
		-webkit-appearance: none;
		-moz-appearance: none;
		outline: 0;
		height: 12px;
		border-radius: 40px;
		background: ${(props: any) =>
			`linear-gradient(to right, ${props.theme.selectedColor} 0%, ${props.theme.selectedColor} ${props.value}%, #fff ${props.value}%, #fff 100%);`};
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);

		::-webkit-slider-thumb {
			-webkit-appearance: none;
			width: 24px;
			height: 24px;
			background-color: ${({ theme }) => theme.selectedColor};
			border-radius: 50%;
			box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
		}

		::-moz-range-thumb {
			width: 24px;
			height: 24px;
			-moz-appearance: none;
			background-color: ${({ theme }) => theme.selectedColor};
			border-radius: 50%;
			box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
		}
	}
` as any;

const SaveButton = styled(SidebarItem)`
	color: hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%);
	border-left: none;
	&:hover {
		color: hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 30%);
	}
`;
