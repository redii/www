<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { closeLightbox } from '$lib/components/lightbox';
	import loadGoogleMapsAPI from 'load-google-maps-api';

	import { env } from '$env/dynamic/public';

	interface Props {
		id?: string;
		variant?: 'default' | 'grayscale';
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
		variant = 'default',
		zoom = 10,
		location,
		locationMarker = false,
		markers = [],
		...attributes
	}: Props = $props();
	let mapElement: HTMLDivElement;

	const styles = {
		default: [
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
		],
		grayscale: [
			{
				featureType: 'all',
				elementType: 'labels',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'administrative',
				elementType: 'labels',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'administrative',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#444444'
					},
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'administrative.neighborhood',
				elementType: 'labels',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'landscape',
				elementType: 'all',
				stylers: [
					{
						visibility: 'on'
					},
					{
						color: '#e0dfe0'
					}
				]
			},
			{
				featureType: 'landscape',
				elementType: 'labels',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'poi',
				elementType: 'all',
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
				featureType: 'poi.park',
				elementType: 'geometry',
				stylers: [
					{
						color: '#a8a9a8'
					},
					{
						visibility: 'on'
					}
				]
			},
			{
				featureType: 'road',
				elementType: 'all',
				stylers: [
					{
						saturation: -100
					},
					{
						lightness: 45
					}
				]
			},
			{
				featureType: 'road',
				elementType: 'geometry.fill',
				stylers: [
					{
						visibility: 'on'
					},
					{
						color: '#5b5b5a'
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
				elementType: 'all',
				stylers: [
					{
						visibility: 'simplified'
					}
				]
			},
			{
				featureType: 'road.highway',
				elementType: 'labels',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'road.arterial',
				elementType: 'labels.icon',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'transit',
				elementType: 'all',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'transit',
				elementType: 'labels',
				stylers: [
					{
						visibility: 'off'
					}
				]
			},
			{
				featureType: 'water',
				elementType: 'all',
				stylers: [
					{
						color: '#ffffff'
					},
					{
						visibility: 'on'
					}
				]
			},
			{
				featureType: 'water',
				elementType: 'labels',
				stylers: [
					{
						visibility: 'off'
					}
				]
			}
		]
	};

	onMount(async () => {
		try {
			const googleMaps = await loadGoogleMapsAPI({ key: env.PUBLIC_GMAPS_API_KEY });

			const map = new googleMaps.Map(mapElement, {
				center: location,
				zoom: zoom,
				disableDefaultUI: true,
				styles: styles[variant]
			});

			if (locationMarker)
				new googleMaps.Marker({
					position: {
						lat: location.lat,
						lng: location.lng
					},
					icon: {
						url: '/images/round-pushpin.png',
						scaledSize: new google.maps.Size(20, 20)
					},
					map
				});

			markers.forEach((m) => {
				if (!m) return;
				const marker = new googleMaps.Marker({
					position: {
						lat: m.lat,
						lng: m.lng
					},
					icon: {
						url: '/images/round-pushpin.png',
						scaledSize: new google.maps.Size(20, 20)
					},
					map
				});
				if (m.href) {
					marker.addListener('click', () => {
						closeLightbox();
						goto(String(m.href));
					});
				}
			});
		} catch (err) {
			console.error(err);
		}
	});
</script>

<div bind:this={mapElement} {id} class="h-full min-h-12 w-full" {...attributes}></div>
