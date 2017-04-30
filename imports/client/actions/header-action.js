export const HEADER_ITEM = "HEADER_ITEM";
export const HEADER_HIDDEN = "HEADER_HIDDEN";

export function activeItem(num) {
	return {
		type:HEADER_ITEM,
		payload:num
	}
} 

export function hideHeader(hidden) {
	return {
		type:HEADER_HIDDEN,
		payload:hidden
	}
} 