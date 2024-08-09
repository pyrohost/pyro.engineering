<script lang="ts">
	export let colour = "#666666";
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	version="1.1"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	class="h-full w-full"
	opacity="1"
	><defs
		><filter
			id="nnnoise-filter"
			x="-20%"
			y="-20%"
			width="140%"
			height="140%"
			filterUnits="objectBoundingBox"
			primitiveUnits="userSpaceOnUse"
			color-interpolation-filters="linearRGB"
		>
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.102"
				numOctaves="4"
				seed="15"
				stitchTiles="stitch"
				x="0%"
				y="0%"
				width="100%"
				height="100%"
				result="turbulence"
			></feTurbulence>
			<feSpecularLighting
				surfaceScale="15"
				specularConstant="0.75"
				specularExponent="20"
				lighting-color={colour}
				x="0%"
				y="0%"
				width="100%"
				height="100%"
				in="turbulence"
				result="specularLighting"
			>
				<feDistantLight azimuth="3" elevation="90"></feDistantLight>
			</feSpecularLighting>
		</filter></defs
	><rect width="100%" height="100%" fill="transparent"></rect><rect
		width="100%"
		height="100%"
		fill={colour}
		filter="url(#nnnoise-filter)"
	></rect></svg
>
