import { writable, get } from 'svelte/store';
import { tick } from 'svelte';

interface LightboxGallery {
	name: string;
	elements: Function[];
}

export const lightboxGalleries = writable<LightboxGallery[]>([{ name: 'default', elements: [] }]);
export const currentGalleryIndex = writable<number>(0);
export const currentElementIndex = writable<number | null>(null);

export function registerElement(element: Function, galleryName: string = 'default'): number {
	const registeredLightboxes: LightboxGallery[] = get(lightboxGalleries);
	const galleryIndex = getGalleryIndex(galleryName);
	if (galleryIndex === -1) {
		registeredLightboxes.push({ name: galleryName, elements: [element] });
		return 0;
	} else {
		registeredLightboxes[galleryIndex].elements.push(element);
		lightboxGalleries.set(registeredLightboxes);
		return registeredLightboxes[galleryIndex].elements.length - 1;
	}
}

export function removeElement(elementIndex: number, galleryName: string = 'default'): void {
	const registeredLightboxes: LightboxGallery[] = get(lightboxGalleries);
	const galleryIndex = getGalleryIndex(galleryName);
	delete registeredLightboxes[galleryIndex].elements[elementIndex];
}

export async function openLightbox(elementIndex: number, galleryName: string = 'default') {
	const galleryIndex = getGalleryIndex(galleryName);
	currentGalleryIndex.set(galleryIndex);
	currentElementIndex.set(elementIndex);
	await tick();
	document.body.style.overflow = 'hidden';
	const overlayOverlay = document.getElementById('lightbox-overlay');
	const lightboxContent = document.getElementById('lightbox-content');
	overlayOverlay?.addEventListener('click', (event) => {
		if (!lightboxContent?.contains(event.target as Node)) closeLightbox();
	});
}

export function closeLightbox() {
	currentElementIndex.set(null);
	document.body.style.overflow = 'auto';
}

function getGalleryIndex(galleryName: string): number {
	const registeredLightboxes: LightboxGallery[] = get(lightboxGalleries);
	return registeredLightboxes.map((l) => l.name).indexOf(galleryName);
}
