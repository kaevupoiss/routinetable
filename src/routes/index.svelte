<script>
	import Sidemenu from '$lib/sidemenu.svelte';
	import {
		blocktypes,
		weekdays,
		tabletime_start,
		tabletime_end,
		tableitems,
		tablecell_height
	} from '$lib/stores/stores.js';
	import { onMount } from 'svelte';

	let maintable;
	let isLoaded = false;
	let tempItem;

	onMount(() => {
		tablecell_height.set(maintable.offsetHeight / (($tabletime_end - $tabletime_start) * 2));
		isLoaded = true;
	});

	function putInTable(details, index) {
		const time_start = Math.floor(details.dropTargetY / $tablecell_height) + $tabletime_start * 2;

		$tableitems = [
			...$tableitems,
			{
				id: $tableitems.length,
				type: details.data.type,
				head: 'Add a head',
				details: 'Add a description',
				day: index,
				time_start: time_start,
				time_end: time_start + 4
			}
		];

		tempItem = null;
	}

	function alterTempItem(details, index) {
		const time_start = Math.floor(details.dropTargetY / $tablecell_height) + $tabletime_start * 2;

		tempItem = {
			type: details.type,
			day: index,
			time_start: time_start,
			time_end: time_start + 4
		};
	}

	function alterItemTime(details, index) {
		if (details.top) {
			$tableitems[index].time_start += details.movedTime;
		}
		if (!details.top) {
			$tableitems[index].time_end += details.movedTime + 1;
		}
	}

	function resizable(node, params) {
		let startY;
		let nodeParent = node.parentElement;
		let nodeParentTop;
		let nodeParentBottom;

		node.addEventListener('mousedown', handleMousedown);

		function handleMousedown(event) {
			event.preventDefault();
			startY = event.clientY;

			nodeParentTop = parseFloat(nodeParent.style.top);
			nodeParentBottom = parseFloat(nodeParent.style.bottom);

			window.addEventListener('mousemove', handleMousemove);
			window.addEventListener('mouseup', handleMouseup);
		}

		function handleMousemove(event) {
			if (params.top) {
				nodeParent.style.top =
					nodeParentTop +
					Math.floor((event.clientY - startY) / $tablecell_height) * $tablecell_height +
					'px';
			}

			if (!params.top) {
				nodeParent.style.bottom =
					nodeParentBottom +
					Math.floor((startY - event.clientY) / $tablecell_height) * $tablecell_height +
					'px';
			}
		}

		function handleMouseup(event) {
			const movedTime = Math.floor((event.clientY - startY) / $tablecell_height);

			node.dispatchEvent(
				new CustomEvent('dragend', {
					detail: { movedTime }
				})
			);

			startY = null;
			nodeParentTop = null;
			nodeParentBottom = null;

			window.removeEventListener('mousemove', handleMousemove);
			window.removeEventListener('mouseup', handleMouseup);
		}

		return {
			destroy() {
				node.removeEventListener('mousedown', handleMousedown);
			}
		};
	}
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
				bind:this={maintable}
				style="
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
				{#each $weekdays as _, i}
					<div
						class="weekday"
						on:dropped={(e) => putInTable(e.detail, i)}
						on:drag={(e) => alterTempItem(e.detail, i)}
					>
						{#if isLoaded}
							{#each $tableitems as item}
								{#if item.day === i}
									<div
										class="item"
										id={'item_' + item.id}
										style="border-color: {blocktypes[item.type].color};
													color: {blocktypes[item.type].color};
													top: {(item.time_start - $tabletime_start * 2) * $tablecell_height}px;
													bottom: {($tabletime_end * 2 - item.time_end) * $tablecell_height}px;"
									>
										<div
											class="extend-area-top"
											use:resizable={{ top: true }}
											on:dragend={(e) =>
												alterItemTime({ movedTime: e.detail.movedTime, top: true }, item.id)}
										/>
										<div class="item-content">
											<h4>{item.head}</h4>
											<span>{item.details}</span>
										</div>
										<div
											class="extend-area-bottom"
											use:resizable={{ top: false }}
											on:dragend={(e) =>
												alterItemTime({ movedTime: e.detail.movedTime, top: false }, item.id)}
										/>
									</div>
								{/if}
							{/each}
							{#if tempItem?.day === i}
								<div
									class="tempitem"
									style="border-color: {blocktypes[tempItem.type].color};
												color: {blocktypes[tempItem.type].color};
												top: {(tempItem.time_start - $tabletime_start * 2) * $tablecell_height}px;
												bottom: {($tabletime_end * 2 - tempItem.time_end) * $tablecell_height}px;"
								/>
							{/if}
						{/if}
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
		grid-template-rows: 1fr;
		height: 100%;
		width: 100%;

		grid-column: 2;
		grid-row: 2;

		border-bottom: 1px solid rgba(38, 70, 83, 0.05);
		border-right: 2px solid rgba(38, 70, 83, 0.1);
	}

	.weekday {
		position: relative;
	}

	.item {
		display: flex;
		flex-direction: column;
		border-style: solid;
		border-width: 0.25rem;
		border-radius: 0 0.5rem 0.5rem 0;

		width: calc(100% - 0.5rem);

		position: absolute;

		span {
			font-size: 0.75rem;
			opacity: 0.5;
			line-height: 1.4;
			display: block;
		}

		.item-content {
			padding: 0 0.5rem;
		}

		.extend-area-top,
		.extend-area-bottom {
			height: 0.5rem;
			transition: box-shadow 0.1s ease-in-out;

			&:hover {
				cursor: ns-resize;
			}
		}

		.extend-area-top:hover {
			box-shadow: 0 8px 8px -8px rgba(38, 70, 83, 1) inset;
		}

		.extend-area-bottom {
			margin-top: auto;

			&:hover {
				box-shadow: 0 -8px 8px -8px rgba(38, 70, 83, 1) inset;
			}
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

	:global(.weekday.droptarget) {
		box-shadow: inset 1px 0px 5px rgba(38, 70, 83, 0.5);
	}

	:global(.dragged) {
		pointer-events: none;
		z-index: 100;
	}

	.tempitem {
		border-style: solid;
		border-width: 0.25rem;
		border-radius: 0 0.5rem 0.5rem 0;

		width: calc(100% - 0.5rem);

		position: absolute;

		pointer-events: none;
	}
</style>
