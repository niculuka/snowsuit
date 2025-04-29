export interface Product {
	id?: number;
	name?: string;
	slug?: string;
	price?: number;
	sale_price?: number;
	related?: number[];
	review?: number;
	ratings?: number;
	until?: string;
	stock?: number;
	top?: boolean;
	featured?: boolean;
	new?: boolean;
	short_desc?: boolean;
	pictures?: Array<{
		width?: number;
		height?: number;
		url: number;
	}>;
	sm_pictures?: Array<{
		width?: number;
		height?: number;
		url?: number;
	}>;
	variants?: Array<{
		color?: string;
		color_name?: string;
		price?: number;
		size?: Array<{
			name?: string;
		}>
	}>;
	category?: Array<{
		name?: string;
		slug?: string;
	}>;
	size?: Array<{
		name?: string;
		slug?: string;
	}>;
	color?: Array<{
		name?: string;
		slug?: string;
	}>;
	brand?: Array<{
		name?: string;
		slug?: string;
	}>;
}