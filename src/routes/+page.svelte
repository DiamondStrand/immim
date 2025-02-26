<script lang="ts">
	import RoseAnimation from '$lib/components/RoseAnimation.svelte';
	
	// Specifik sida meta-information
	const pageTitle = "I'm Mim | Home";
	const pageDescription = "Welcome to I'm Mim - where every moment shimmers when paths cross and stars align";
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={pageDescription} />
</svelte:head>

<RoseAnimation />
