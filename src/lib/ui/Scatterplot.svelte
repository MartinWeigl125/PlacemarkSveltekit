<!-- https://svelte.dev/playground/scatterplot?version=5.45.5 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import { writable } from 'svelte/store';
    import type { ScatterPoint } from '$lib/types/placemark-types';

	export let points: ScatterPoint[] = [];
	export let height: number = 200;

	let svg: SVGSVGElement | null = null;
	const width = writable(500);

	const padding = { top: 20, right: 40, bottom: 40, left: 25 };
	const yTicks = [0, 1, 2, 3, 4, 5];
	let xTicks: number[] = [];

	let tooltip = { visible: false, x: 0, y: 0, text: '' };

	// resize SVG width
	function resize() {
		if (svg) {
			width.set(0.9*svg.getBoundingClientRect().width);
		}
	}

	onMount(() => {
		resize();
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	});

	// reactive maxX
	$: maxX = points.length ? Math.max(...points.map(p => p.x)) : 20;

	// reactive xScale
	$: xScale = scaleLinear()
		.domain([0, maxX])
		.range([padding.left, $width ?? 500]);

	// reactive xTicks (max 6)
	$: {
		const step = Math.ceil(maxX / 5) || 1;
		xTicks = Array.from({ length: Math.floor(maxX / step) + 1 }, (_, i) => i * step);
	}

	const yScale = scaleLinear()
		.domain([0, 5])
		.range([height - padding.bottom, padding.top]);

	function showTooltip(event: MouseEvent, point: ScatterPoint) {
		if (!svg) return;
		const rect = svg.getBoundingClientRect();
		tooltip = {
			visible: true,
			x: event.clientX - rect.left + 10,
			y: event.clientY - rect.top - 10,
			text: point.label ?? ''
		};
	}

	function hideTooltip() {
		tooltip.visible = false;
	}
</script>

<div style="position: relative; width: 100%; height: {height}px;">
	<svg bind:this={svg} {height} style="width: 100%; height: 100%;">
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="tick" transform="translate(0, {yScale(tick)})">
					<line x1={padding.left} x2={xScale(maxX)} />
					<text x={padding.left - 8} y="+4">{tick}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each xTicks as tick, i (i)}
				<g class="tick" transform="translate({xScale(tick)},0)">
					<line y1={yScale(0)} y2={yScale(5)} />
					<text y={height - padding.bottom + 16}>{tick}</text>
				</g>
			{/each}
		</g>

		<!-- data points -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		{#each points as point, i (i)}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<circle
				cx={xScale(point.x)}
				cy={yScale(point.y)}
				r="5"
				on:mouseenter={(e) => showTooltip(e, point)}
				on:mouseleave={hideTooltip}
				on:click={(e) => showTooltip(e, point)}
			/>
		{/each}
	</svg>

	<!-- Tooltip -->
	{#if tooltip.visible}
		<div
			style="
				position: absolute;
				left: {tooltip.x}px;
				top: {tooltip.y}px;
				background: rgba(0,0,0,0.75);
				color: white;
				padding: 2px 5px;
				border-radius: 3px;
				font-size: 12px;
				pointer-events: none;
			"
		>
			{tooltip.text}
		</div>
	{/if}
</div>

<style>
	circle {
		fill: darkcyan;
		fill-opacity: 0.6;
		stroke: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}

	.tick line {
		stroke: #ddd;
		stroke-dasharray: 2;
	}

	text {
		font-size: 12px;
		fill: #999;
	}

	.x-axis text {
		text-anchor: middle;
	}

	.y-axis text {
		text-anchor: end;
	}
</style>
