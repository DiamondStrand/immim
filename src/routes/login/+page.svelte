<script lang="ts">
	import PasskeyInput from '$lib/components/PasskeyInput.svelte';

	// Specifik sida meta-information
	const pageTitle = "I'm Mim | Login";
	const pageDescription = "Secure authentication for I'm Mim application";
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={pageDescription} />
	<!-- Förhindra sökmotorer från att indexera login-sidan -->
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<PasskeyInput />
