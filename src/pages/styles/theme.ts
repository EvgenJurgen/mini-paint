export type ThemeType = {
	primary: string;
	secondary: string;
	textColor: string;
	borderColor: string;
	additionalBorderColor: string;
	hoverColor: string;
	selectedColor: string;
	navbarColor: string;
	formInputColor: string;
};

export const lightTheme: ThemeType = {
	primary: '#fafafa',
	secondary: '#ffffff',
	textColor: '#000000',
	borderColor: '#dbdbdb',
	additionalBorderColor: '#dbdbdb',
	hoverColor: '#c5c7c9',
	selectedColor: '#3390ec',
	navbarColor: '#ffffff',
	formInputColor: '#fafafa',
};

export const darkTheme: ThemeType = {
	primary: '#212121',
	secondary: '#e5e5e5',
	textColor: '#707579',
	borderColor: '#0f0f0f',
	additionalBorderColor: '#707579',
	hoverColor: '#555555',
	selectedColor: '#8774e1',
	navbarColor: '#0f0f0f',
	formInputColor: '#2f2f2f',
};
