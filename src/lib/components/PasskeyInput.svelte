<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let passkey = $state<string[]>(['', '', '', '']);
	let errorMessage = $state('');
	let isLoading = $state(false);

	// Sätt fokus på första input när komponenten laddas - använd onMount istället för autofocus för bättre tillgänglighet
	onMount(() => {
		// Liten timeout för att säkerställa att DOM är klar
		setTimeout(() => {
			const firstInput = document.getElementById('input-0');
			if (firstInput) {
				firstInput.focus();
			}
		}, 100);
	});

	function handleInput(event: Event, index: number): void {
		const input = event.target as HTMLInputElement;
		passkey[index] = input.value;

		// Rensa felmeddelande när användaren skriver
		if (errorMessage) errorMessage = '';

		if (index < 3 && input.value) {
			document.getElementById(`input-${index + 1}`)?.focus();
		}
	}

	// Hantera inklistring av koder
	function handlePaste(event: ClipboardEvent, index: number): void {
		// Förhindra standardbeteende för paste
		event.preventDefault();

		// Hämta inklistrad text
		const pastedText = event.clipboardData?.getData('text') || '';

		// Extrahera endast siffror från den inklistrade texten
		const digits = pastedText.replace(/[^0-9]/g, '');

		if (digits.length > 0) {
			// Om vi har minst en siffra, börja fylla från aktuellt index
			for (let i = 0; i < Math.min(digits.length, 4 - index); i++) {
				passkey[index + i] = digits[i];
			}

			// Sätt fokus på nästa tomma fält eller sista fältet om alla är ifyllda
			const nextEmptyIndex = passkey.findIndex((val) => val === '');
			if (nextEmptyIndex >= 0) {
				document.getElementById(`input-${nextEmptyIndex}`)?.focus();
			} else {
				document.getElementById(`input-3`)?.focus();
			}

			// Ta bort automatisk submit för att ge användaren kontroll
			// Användaren måste klicka på submit-knappen manuellt
		}
	}

	// Förbättrad keydown handler för att hantera Delete och Backspace
	function handleKeydown(event: KeyboardEvent, index: number): void {
		// Om Enter trycks, skicka in formuläret
		if (event.key === 'Enter') {
			handleSubmit();
			return;
		}

		// Hantera Backspace och Delete
		if (event.key === 'Backspace' || event.key === 'Delete') {
			const currentInput = document.getElementById(`input-${index}`) as HTMLInputElement;

			// Om nuvarande fält har innehåll, rensa det
			if (passkey[index] !== '') {
				passkey[index] = '';
				return;
			}

			// Om nuvarande fält är tomt och vi inte är på första fältet,
			// gå till föregående fält och rensa det
			if (index > 0 && passkey[index] === '') {
				const prevInput = document.getElementById(`input-${index - 1}`) as HTMLInputElement;
				if (prevInput) {
					passkey[index - 1] = '';
					prevInput.focus();
				}
			}
		}

		// Hantera höger- och vänsterpil för enklare navigation
		if (event.key === 'ArrowRight' && index < 3) {
			document.getElementById(`input-${index + 1}`)?.focus();
		}

		if (event.key === 'ArrowLeft' && index > 0) {
			document.getElementById(`input-${index - 1}`)?.focus();
		}
	}

	async function handleSubmit(): Promise<void> {
		try {
			const passkeyString = passkey.join('');

			// Visa laddningsindikator
			isLoading = true;

			// Anropa server endpoint för validering
			const response = await fetch('/api/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ passkey: passkeyString })
			});

			const result = await response.json();

			if (result.success) {
				// Lagra autentiseringsstatus i sessionStorage med timestamp
				sessionStorage.setItem(
					'authData',
					JSON.stringify({
						authenticated: true,
						timestamp: new Date().getTime()
					})
				);

				goto('/'); // Navigera till startsidan
			} else {
				errorMessage = 'Incorrect passkey. Please try again.';
				// Reset passkey fields
				passkey = ['', '', '', ''];
				// Fokusera på första input igen
				document.getElementById('input-0')?.focus();
			}
		} catch (error) {
			console.error('Authentication error:', error);
			errorMessage = 'An error occurred. Please try again.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div
	class="flex h-screen items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900"
>
	<div class="relative z-10 flex flex-col items-center">
		<!-- Intro text content -->
		<div class="mb-12 text-center">
			<h1
				class="bg-gradient-to-r from-blue-300 to-pink-300 bg-clip-text text-[6rem] font-bold text-transparent drop-shadow-lg"
			>
				Welcome
			</h1>
			<p class="mb-1 text-2xl font-medium text-blue-100/90">I'm Mim</p>
			<p class="mx-auto max-w-xs text-sm text-blue-200/70">
				Please enter your passkey to continue.
			</p>
		</div>

		<!-- Glassmorfism effekt -->
		<div class="relative">
			<div class="absolute -inset-2 rounded-xl bg-blue-600/20 blur-xl"></div>
			<div class="rounded-lg border border-blue-500/30 bg-black/70 p-8 shadow-2xl backdrop-blur-sm">
				<h2 class="mb-6 text-center text-2xl font-semibold text-white">Enter Passkey</h2>

				<!-- Felmeddelande -->
				{#if errorMessage}
					<div class="mb-4 rounded bg-red-500/20 p-2 text-center text-sm text-red-300">
						{errorMessage}
					</div>
				{/if}

				<div class="mb-6 flex space-x-4">
					{#each passkey as digit, index}
						<input
							id={`input-${index}`}
							type="text"
							maxlength="1"
							value={digit}
							class="h-14 w-14 rounded-lg border border-blue-500/50 bg-blue-900/20 text-center text-2xl text-white shadow-inner transition-all focus:border-blue-400 focus:bg-blue-800/30 focus:ring focus:ring-blue-400/50 focus:outline-none"
							oninput={(event) => handleInput(event, index)}
							onkeydown={(event) => handleKeydown(event, index)}
							onpaste={(event) => handlePaste(event, index)}
							disabled={isLoading}
						/>
					{/each}
				</div>
				<button
					class="w-full rounded-lg bg-gradient-to-r from-pink-600 to-pink-800 py-3 font-medium text-white shadow-lg transition-all hover:from-pink-500 hover:to-pink-700 hover:shadow-pink-500/50 disabled:opacity-50"
					onclick={handleSubmit}
					disabled={isLoading}
				>
					{isLoading ? 'Verifying...' : 'Submit'}
				</button>
			</div>
		</div>
	</div>

	<!-- Bakgrundseffekter -->
	<div class="absolute top-0 left-0 h-full w-full overflow-hidden">
		<div class="absolute top-1/4 -left-20 h-40 w-40 rounded-full bg-red-600/20 blur-3xl"></div>
		<div class="absolute -right-20 bottom-1/4 h-60 w-60 rounded-full bg-pink-600/20 blur-3xl"></div>

		<!-- Diamanter -->
		<div class="diamonds">
			<!-- Stora diamanter i bakgrunden -->
			<svg
				class="diamond diamond-1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(59, 130, 246, 0.3)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<svg
				class="diamond diamond-2"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(219, 39, 119, 0.2)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<!-- Mindre diamanter i förgrunden -->
			<svg
				class="diamond diamond-3"
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
				class="diamond diamond-4"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(147, 197, 253, 0.25)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M6 3h12l4 6-10 13L2 9Z" />
				<path d="M11 3 8 9l4 13 4-13-3-6" />
				<path d="M2 9h20" />
			</svg>

			<svg
				class="diamond diamond-5"
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
				class="diamond diamond-6"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="rgba(165, 243, 252, 0.15)"
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
	.diamonds {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.diamond {
		position: absolute;
		opacity: 0;
		animation: shimmer 6s infinite ease-in-out;
	}

	.diamond-1 {
		top: 15%;
		left: 10%;
		width: 70px;
		height: 70px;
		transform: rotate(15deg);
		animation-delay: 0s;
	}

	.diamond-2 {
		top: 60%;
		right: 15%;
		width: 100px;
		height: 100px;
		transform: rotate(-10deg);
		animation-delay: 1s;
	}

	.diamond-3 {
		top: 25%;
		right: 25%;
		width: 30px;
		height: 30px;
		transform: rotate(25deg);
		animation-delay: 2s;
	}

	.diamond-4 {
		bottom: 20%;
		left: 20%;
		width: 50px;
		height: 50px;
		transform: rotate(-5deg);
		animation-delay: 1.5s;
	}

	.diamond-5 {
		top: 40%;
		left: 30%;
		width: 40px;
		height: 40px;
		transform: rotate(40deg);
		animation-delay: 3s;
	}

	.diamond-6 {
		top: 75%;
		right: 35%;
		width: 25px;
		height: 25px;
		transform: rotate(-20deg);
		animation-delay: 2.5s;
	}

	@keyframes shimmer {
		0%,
		100% {
			opacity: 0.1;
			filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.1));
		}
		50% {
			opacity: 0.3;
			filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
		}
	}
</style>
