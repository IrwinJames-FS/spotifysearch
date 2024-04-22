import { StyledComponentProps } from "@mui/material"
import { useMemo } from "react"

/**
 * Because I am clearly struggling with handling this in a standard method obviously I should make another method to be better then all other methods.
 * @param images 
 * @param alt 
 */
export const useImages = (images?: Spotify.Image[], alt?: string, size: "sm" | "md" | "lg" | number = 0, props: Omit<StyledComponentProps<"img">, "src" | "alt"> = {}): Record<string, any> | undefined => {
	return useMemo(()=>{
		const sizeIndex = typeof size === 'number' ? size:["sm", "md", "lg"].indexOf(size);
		if (!images || !images.length || !~sizeIndex) return undefined;
		const img = images.sort((a, b) => (a.height ?? 0) * (a.width ?? 0) - (b.height ?? 0) * (b.width ?? 0))[sizeIndex];
		return {src: img.url, alt, ...props};
	}, [images, alt, size, props])
}