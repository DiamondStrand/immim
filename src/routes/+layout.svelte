<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// Default SEO metadata
	let title = "I'm Mim";
	let description =
		'A beautiful, modern web application with secure authentication and elegant animations';
	let keywords = 'Svelte, TailwindCSS, Animation, Web App';
	let image = '/images/mim-social.jpg'; // Lägg till en social bild för delning
	let url = 'https://immim.app';

	let isAuthenticated = $state(false);
	let { children } = $props();

	// Session timeout in milliseconds (10 minutes)
	const SESSION_TIMEOUT = 10 * 60 * 1000;

	function checkAuth() {
		if (browser) {
			// Get authentication data from sessionStorage
			const authData = sessionStorage.getItem('authData');

			if (authData) {
				try {
					// Parse the stored authentication data
					const { authenticated, timestamp } = JSON.parse(authData);

					// Check if session has expired
					const currentTime = new Date().getTime();
					const isExpired = currentTime - timestamp > SESSION_TIMEOUT;

					if (isExpired) {
						// Session expired, clear authentication
						sessionStorage.removeItem('authData');
						isAuthenticated = false;
					} else {
						// Session still valid
						isAuthenticated = authenticated;

						// Optionally refresh the timestamp to extend the session on activity
						refreshSession();
					}
				} catch (error) {
					// Handle parsing errors
					console.error('Error parsing auth data:', error);
					isAuthenticated = false;
				}
			} else {
				isAuthenticated = false;
			}

			// Check if we're already on the login route
			const isLoginPage = $page.url.pathname === '/login';

			// If user isn't authenticated and not already on login route,
			// redirect to login
			if (!isAuthenticated && !isLoginPage) {
				goto('/login');
			}
		}
	}

	// Function to refresh the session timestamp
	function refreshSession() {
		if (isAuthenticated && browser) {
			sessionStorage.setItem(
				'authData',
				JSON.stringify({
					authenticated: true,
					timestamp: new Date().getTime()
				})
			);
		}
	}

	// Initial check
	onMount(() => {
		checkAuth();

		// Set up periodic checks for session expiration
		if (browser) {
			const checkInterval = setInterval(() => {
				checkAuth();
			}, 60000); // Check every minute

			return () => clearInterval(checkInterval);
		}
	});

	// Watch URL changes to update authentication status
	$effect(() => {
		$page.url.pathname;
		checkAuth();
	});

	function logout() {
		try {
			// Clear auth data on logout
			sessionStorage.removeItem('authData');
			isAuthenticated = false;

			// Redirect to login page
			if (browser) {
				window.location.href = '/login';
			}
		} catch (error) {
			console.error('Error during logout:', error);
		}
	}

	// Add event listener to refresh session on user activity
	onMount(() => {
		if (browser) {
			const activityEvents = ['click', 'keypress', 'scroll', 'mousemove'];

			const handleActivity = () => {
				if (isAuthenticated) {
					refreshSession();
				}
			};

			activityEvents.forEach((event) => {
				document.addEventListener(event, handleActivity, { passive: true });
			});

			return () => {
				activityEvents.forEach((event) => {
					document.removeEventListener(event, handleActivity);
				});
			};
		}
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />

	<!-- Favicon -->
	<link rel="icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

	<!-- PWA -->
	<meta name="theme-color" content="#1e293b" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
</svelte:head>

<!-- Make sure the logout button is visible with high z-index -->
{#if isAuthenticated}
	<div class="fixed top-0 right-0 z-50 p-4">
		<button
			class="animate-shadow-pulse cursor-pointer rounded-md bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-1.5 text-sm font-medium text-slate-200 shadow-lg shadow-slate-600 transition-all duration-300 hover:from-pink-900 hover:to-pink-800 hover:shadow-pink-900/30 focus:ring-2 focus:ring-purple-500/40 focus:outline-none"
			onclick={logout}
			id="logoutButton"
		>
			Logout
		</button>
	</div>
{/if}

{@render children()}

<style>
	@keyframes shadow-pulse {
		0%,
		100% {
			box-shadow:
				0 10px 15px -3px rgba(101, 98, 101, 0.2),
				0 4px 6px -2px rgba(101, 98, 101, 0.1);
		}
		50% {
			box-shadow:
				0 15px 20px -3px rgba(101, 98, 101, 0.4),
				0 8px 10px -2px rgba(101, 98, 101, 0.2);
		}
	}

	.animate-shadow-pulse {
		animation: shadow-pulse 3s infinite ease-in-out;
	}
</style>
