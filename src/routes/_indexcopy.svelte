<script>
	import Sidemenu from '$lib/sidemenu.svelte';
	import {
		blocktypes,
		weekdays,
		tabletime_start,
		tabletime_end,
		tableitems
	} from '$lib/stores/stores.js';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="layout">
	<Sidemenu />
	<div class="content">
		<div class="timetable">
			<div class="days">
				{#each $weekdays as day}
					<div class="weekday">
						<h4>{day}</h4>
					</div>
				{/each}
			</div>
			<div
				class="times"
				style="grid-template-rows: repeat({($tabletime_end - $tabletime_start) / 2}, 1fr);"
			>
				{#each Array(($tabletime_end - $tabletime_start) / 2) as _, i}
					<div class="clocktime">
						<h4>{$tabletime_start + i * 2}</h4>
					</div>
				{/each}
			</div>
			<div
				class="tablecontent"
				style="grid-template-rows: repeat({($tabletime_end - $tabletime_start) * 2}, 1fr);
				background-image: repeating-linear-gradient(
				to right,
				rgba(38, 70, 83, 0.5) 0 2px,
				transparent 2px calc(100% / 7)
			),
			repeating-linear-gradient(
				to bottom,
				rgba(38, 70, 83, 0.25) 0 1px,
				transparent 1px calc(100% / {($tabletime_end - $tabletime_start) / 2})
			);"
			>
				{#each $tableitems as item}
					<div
						class="item"
						id={'item_' + item.id}
						style="border-color: {blocktypes[item.type].color};
						color: {blocktypes[item.type].color};
						grid-row: {item.time_start - $tabletime_start * 2 + 1} / {item.time_end - $tabletime_start * 2 + 1};
						grid-column: {item.day} / {item.day + 1};"
					>
						<h4>{item.head}</h4>
						<span>{item.details}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.layout {
		display: grid;
		grid-template-columns: 17.5rem 1fr;
		grid-template-rows: 1fr;

		height: 100vh;
		width: 100vw;
	}

	.content {
		padding: 2rem 4rem;
	}

	.timetable {
		display: grid;
		grid-template-columns: 2rem 1fr;
		grid-template-rows: 3rem 1fr;
		height: 100%;
	}

	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: 1fr;

		grid-column: 2;
		grid-row: 1;
		place-items: center;
	}

	.tablecontent {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		height: 100%;
		width: 100%;

		grid-column: 2;
		grid-row: 2;

		border-bottom: 1px solid rgba(38, 70, 83, 0.05);
		border-right: 2px solid rgba(38, 70, 83, 0.1);
	}

	.item {
		border-style: solid;
		border-width: 0.25rem;
		border-radius: 0 0.5rem 0.5rem 0;
		margin-right: 0.5rem;
		padding: 0.5rem;

		span {
			font-size: 0.75rem;
			opacity: 0.5;
			line-height: 1.4;
			display: block;
		}
	}

	.times {
		display: grid;
		grid-template-columns: 1fr;

		grid-column: 1;
		grid-row: 2;
		place-items: start center;

		height: 100%;

		margin-top: -0.75em;
	}
</style>
