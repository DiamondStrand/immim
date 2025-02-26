<script lang="ts">
	// Import browser check for SSR compatibility
	import { browser } from '$app/environment';

	// Import med säker typning och felhantering
	import flowerAnimation from '$lib/utils/flower.json';

	// Dynamisk import av LottiePlayer
	let LottiePlayer: any;

	// Sätt en fast hastighet för animationen (0.5 = halva hastigheten, 0.75 = 75% av normal hastighet)
	const animationSpeed = 0.6; // Justerat för att vara lite långsammare än normalt

	// Ladda Lottie endast på klienten
	if (browser) {
		// Using import() to get the component only when needed
		import('@lottiefiles/svelte-lottie-player')
			.then((module) => {
				LottiePlayer = module.LottiePlayer;
			})
			.catch((err) => {
				console.error('Kunde inte ladda Lottie-spelaren:', err);
			});
	}
</script>

<div
	class="flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 to-black"
>
	<div class="z-10 px-6 text-center">
		<div class="animate-float relative mx-auto">
			<div class="animate-pulse-subtle absolute -inset-8 rounded-full bg-pink-400/30 blur-xl"></div>
			<div class="relative">
				<!-- Conditionally render the Lottie animation only on client side -->
				{#if browser && LottiePlayer}
					<svelte:component
						this={LottiePlayer}
						src={flowerAnimation}
						autoplay={true}
						loop={true}
						controls={false}
						renderer="svg"
						background="transparent"
						height={800}
						width={700}
						speed={animationSpeed}
						class="mx-auto drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]"
					/>
					<h1
						class="-mt-72 bg-gradient-to-r from-pink-300 to-blue-300 bg-clip-text text-5xl font-bold text-transparent drop-shadow-lg"
					>
						Every moment shimmers
					</h1>
					<p class="mt-4 text-xl text-blue-100/90">When paths cross and stars align</p>
				{:else}
					<!-- Fallback for server-side rendering or when LottiePlayer isn't loaded -->
					<div class="flex h-[400px] w-[400px] items-center justify-center">
						<div class="text-pink-300 opacity-80">Loading animation...</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Bakgrundseffekter -->
	<div class="absolute top-0 left-0 h-full w-full">
		<div class="absolute top-1/4 left-1/4 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl"></div>
		<div
			class="absolute right-1/4 bottom-1/4 h-60 w-60 rounded-full bg-purple-600/10 blur-3xl"
		></div>
		<div class="absolute top-1/3 right-1/3 h-20 w-20 rounded-full bg-red-600/10 blur-2xl"></div>

		<!-- Stjärnor/partiklar -->
		<div class="stars"></div>

		<!-- Diamanter -->
		<div class="diamonds">
			<!-- Större diamanter -->
			<svg
				class="diamond diamond-lg-1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(239, 68, 68, 0.25)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<svg
				class="diamond diamond-lg-2"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(249, 168, 212, 0.3)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<!-- Mellanstora diamanter -->
			<svg
				class="diamond diamond-md-1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(255, 255, 255, 0.35)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<svg
				class="diamond diamond-md-2"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(254, 202, 202, 0.25)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<!-- Små diamanter -->
			<svg
				class="diamond diamond-sm-1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(255, 255, 255, 0.4)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<svg
				class="diamond diamond-sm-2"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(254, 202, 202, 0.3)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<svg
				class="diamond diamond-sm-3"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(219, 234, 254, 0.25)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<svg
				class="diamond diamond-sm-4"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(199, 210, 254, 0.3)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<svg
				class="diamond diamond-sm-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(224, 231, 255, 0.2)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>
		</div>
	</div>
</div>

<style>
	/* Ta bort spin-slow animationen eftersom Lottie har sin egen animation */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-15px);
		}
	}

	@keyframes pulse-subtle {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 0.8;
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	.animate-pulse-subtle {
		animation: pulse-subtle 3s ease-in-out infinite;
	}

	.stars {
		position: absolute;
		width: 100%;
		height: 100%;
		background-image:
			radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0, 0, 0, 0));
		background-repeat: repeat;
		background-size: 200px 200px;
		opacity: 0.3;
	}

	/* Diamanter */
	.diamonds {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.diamond {
		position: absolute;
		opacity: 0;
		animation: sparkle 8s infinite ease-in-out;
	}

	/* Stora diamanter */
	.diamond-lg-1 {
		bottom: 10%;
		right: 10%;
		width: 120px;
		height: 120px;
		transform: rotate(-15deg);
		animation-delay: 0s;
	}

	.diamond-lg-2 {
		top: 20%;
		left: 15%;
		width: 100px;
		height: 100px;
		transform: rotate(25deg);
		animation-delay: 2s;
	}

	/* Mellanstora diamanter */
	.diamond-md-1 {
		top: 40%;
		right: 25%;
		width: 60px;
		height: 60px;
		transform: rotate(-10deg);
		animation-delay: 1s;
	}

	.diamond-md-2 {
		bottom: 25%;
		left: 30%;
		width: 50px;
		height: 50px;
		transform: rotate(15deg);
		animation-delay: 3s;
	}

	/* Små diamanter */
	.diamond-sm-1 {
		top: 20%;
		right: 40%;
		width: 30px;
		height: 30px;
		transform: rotate(45deg);
		animation-delay: 0.5s;
	}

	.diamond-sm-2 {
		bottom: 40%;
		left: 15%;
		width: 25px;
		height: 25px;
		transform: rotate(-30deg);
		animation-delay: 2.5s;
	}

	.diamond-sm-3 {
		top: 60%;
		right: 20%;
		width: 20px;
		height: 20px;
		transform: rotate(10deg);
		animation-delay: 1.5s;
	}

	.diamond-sm-4 {
		top: 75%;
		left: 40%;
		width: 15px;
		height: 15px;
		transform: rotate(-20deg);
		animation-delay: 3.5s;
	}

	.diamond-sm-5 {
		top: 30%;
		left: 55%;
		width: 18px;
		height: 18px;
		transform: rotate(35deg);
		animation-delay: 4s;
	}

	@keyframes sparkle {
		0%,
		100% {
			opacity: 0.05;
			filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.1));
		}
		25% {
			opacity: 0.2;
			filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));
		}
		50% {
			opacity: 0.3;
			filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.4));
		}
		75% {
			opacity: 0.2;
			filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));
		}
	}
</style>
