<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import loadGoogleMapsAPI from 'load-google-maps-api';

	import { PUBLIC_GMAPS_API_KEY } from '$env/static/public';

	interface Props {
		id?: string;
		zoom?: number;
		location: {
			lat: number;
			lng: number;
		};
		locationMarker?: boolean;
		markers?: Array<
			| {
					lat: number;
					lng: number;
					href?: string | URL;
			  }
			| undefined
		>;
		class?: string;
	}

	let {
		id = crypto.randomUUID(),
		zoom = 10,
		location,
		locationMarker = false,
		markers = [],
		...attributes
	}: Props = $props();
	let mapElement: HTMLDivElement;

	onMount(async () => {
		try {
			const googleMaps = await loadGoogleMapsAPI({ key: PUBLIC_GMAPS_API_KEY });

			const map = new googleMaps.Map(mapElement, {
				center: location,
				zoom: zoom,
				disableDefaultUI: true,
				styles: [
					{
						featureType: 'landscape.man_made',
						elementType: 'geometry',
						stylers: [
							{
								color: '#f7f1df'
							}
						]
					},
					{
						featureType: 'landscape.natural',
						elementType: 'geometry',
						stylers: [
							{
								color: '#d0e3b4'
							}
						]
					},
					{
						featureType: 'landscape.natural.terrain',
						elementType: 'geometry',
						stylers: [
							{
								visibility: 'off'
							}
						]
					},
					{
						featureType: 'poi',
						elementType: 'labels',
						stylers: [
							{
								visibility: 'off'
							}
						]
					},
					{
						featureType: 'poi.business',
						elementType: 'all',
						stylers: [
							{
								visibility: 'off'
							}
						]
					},
					{
						featureType: 'poi.medical',
						elementType: 'geometry',
						stylers: [
							{
								color: '#fbd3da'
							}
						]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [
							{
								color: '#bde6ab'
							}
						]
					},
					{
						featureType: 'road',
						elementType: 'geometry.stroke',
						stylers: [
							{
								visibility: 'off'
							}
						]
					},
					{
						featureType: 'road',
						elementType: 'labels',
						stylers: [
							{
								visibility: 'off'
							}
						]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.fill',
						stylers: [
							{
								color: '#ffe15f'
							}
						]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [
							{
								color: '#efd151'
							}
						]
					},
					{
						featureType: 'road.arterial',
						elementType: 'geometry.fill',
						stylers: [
							{
								color: '#ffffff'
							}
						]
					},
					{
						featureType: 'road.local',
						elementType: 'geometry.fill',
						stylers: [
							{
								color: 'black'
							}
						]
					},
					{
						featureType: 'transit.station.airport',
						elementType: 'geometry.fill',
						stylers: [
							{
								color: '#cfb2db'
							}
						]
					},
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [
							{
								color: '#a2daf2'
							}
						]
					}
				]
			});

			if (locationMarker) new googleMaps.Marker({ position: location, map });

			markers.forEach((m) => {
				if (!m) return;
				const marker = new googleMaps.Marker({ position: m, map });
				if (m.href) {
					marker.addListener('click', () => {
						window.location.href = String(m.href);
					});
				}
			});
		} catch (err) {
			console.error(err);
		}
	});
</script>

<div bind:this={mapElement} {id} class="h-full min-h-12 w-full" {...attributes}></div>
