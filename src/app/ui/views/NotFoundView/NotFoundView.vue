<template>
	<main>
		<div class="error__container">
			<div class="error__code">
				<p>4</p>
				<p>0</p>
				<p>4</p>
			</div>
			<div class="error__title">Page Not Found</div>
			<div class="error__description">
				We can't seem to find that page. It might have been removed or doesn't
				exist anymore.
			</div>
			<RouterLink to="/">
				<button class="btn">Go Home</button>
			</RouterLink>
		</div>
	</main>
</template>

<style scoped>
	@import "./styles/NotFoundView.module.scss";
</style>
