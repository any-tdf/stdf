export type PrimaryAndDarkColor = {
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	default: string;
	700: string;
	800: string;
	900: string;
	950: string;
};

export type ThemeProps = {
	name: string;
	color: {
		primary: PrimaryAndDarkColor;
		dark: PrimaryAndDarkColor;
		primaryBlack: string;
		primaryWhite: string;
		darkBlack: string;
		darkWhite: string;
		functional: { success: string; warning: string; error: string; info: string };
		extend: { color: string; alias: string }[];
	};
};
