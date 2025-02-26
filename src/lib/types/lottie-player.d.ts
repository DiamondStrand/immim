declare module '@lottiefiles/svelte-lottie-player' {
	import { SvelteComponentTyped } from 'svelte';

	export class LottiePlayer extends SvelteComponentTyped<{
		/**
		 * JSON data or URL to animation data
		 */
		src: string | object;

		/**
		 * Whether to autoplay the animation
		 */
		autoplay?: boolean;

		/**
		 * Whether to loop the animation
		 */
		loop?: boolean;

		/**
		 * Whether to show controls
		 */
		controls?: boolean;

		/**
		 * Renderer to use (svg, canvas, html)
		 */
		renderer?: string;

		/**
		 * Background color
		 */
		background?: string;

		/**
		 * Height of the animation
		 */
		height?: number | string;

		/**
		 * Width of the animation
		 */
		width?: number | string;

		/**
		 * Speed of the animation
		 */
		speed?: number;

		/**
		 * Custom class names
		 */
		class?: string;

		/**
		 * Layout of controls
		 */
		controlsLayout?: string[];

		/**
		 * Inline styles
		 */
		style?: string;
	}> {}
}
