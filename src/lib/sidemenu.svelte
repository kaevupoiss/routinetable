<script>
	import { blocktypes } from '$lib/stores/stores.js';
	import { draggable } from '$lib/dragdrop.js';
</script>

<div class="sidemenu">
	<div class="blocks">
		{#each blocktypes as block}
			<div class="block-wrapper">
				<div
					class="block"
					use:draggable={{ data: block, targets: ['.weekday'] }}
					style="border-color: {block.color}; color: {block.color};"
				>
					<h4>{block.name}</h4>
				</div>
				<div class="block hidden">
					<h4>{block.name}</h4>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.sidemenu {
		display: flex;

		box-shadow: 1px 0px 5px rgba(38, 70, 83, 0.25);
		background-color: rgba(38, 70, 83, 0.05);

		padding: 4rem 2rem;
	}

	.blocks {
		display: flex;
		flex-direction: column;
		width: 100%;
		row-gap: 1.5rem;
	}

	.block-wrapper {
		position: relative;
		height: max-content;
	}

	.block {
		display: flex;

		border-style: solid;
		border-width: 0.25rem;
		border-radius: 0 0.5rem 0.5rem 0;
		margin-right: 0.5rem;
		padding: 1rem;
		text-transform: uppercase;

		justify-content: center;

		position: absolute;

		z-index: 1;

		width: 100%;

		&.hidden {
			opacity: 0;
			position: static;
			z-index: 0;
		}
	}
</style>
