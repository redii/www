import { writable, get } from 'svelte/store';
import type { Snippet } from 'svelte';
import { tick } from 'svelte';

interface LightboxGallery {
	name: string;
	elements: (Snippet | undefined)[];
}

export const lightboxGalleries = writable<LightboxGallery[]>([{ name: 'default', elements: [] }]);
export const currentGalleryIndex = writable<number>(0);
export const currentElementIndex = writable<number | null>(null);

export function registerElement(element: Snippet, galleryName: string = 'default'): number {
	const galleries = get(lightboxGalleries);
	const galleryIndex = getGalleryIndex(galleryName);
	if (galleryIndex === -1) {
		galleries.push({ name: galleryName, elements: [element] });
		lightboxGalleries.set(galleries);
		return 0;
	} else {
		galleries[galleryIndex].elements.push(element);
		lightboxGalleries.set(galleries);
		return galleries[galleryIndex].elements.length - 1;
	}
}

export function removeElement(elementIndex: number, galleryName: string = 'default'): void {
	const galleries = get(lightboxGalleries);
	const galleryIndex = getGalleryIndex(galleryName);
	if (galleryIndex !== -1) {
		galleries[galleryIndex].elements[elementIndex] = undefined;
		lightboxGalleries.set(galleries);
	}
}

let overlayClickHandler: ((event: MouseEvent) => void) | null = null;
let escapeHandler: ((event: KeyboardEvent) => void) | null = null;

export async function openLightbox(elementIndex: number, galleryName: string = 'default') {
	const galleryIndex = getGalleryIndex(galleryName);
	currentGalleryIndex.set(galleryIndex);
	currentElementIndex.set(elementIndex);
	await tick();

	document.body.style.overflow = 'hidden';
	document.body.style.pointerEvents = 'none';

	// Clean up previous listeners before adding new ones
	removeGlobalListeners();

	const overlay = document.getElementById('lightbox-overlay');
	const content = document.getElementById('lightbox-content');

	overlayClickHandler = (event: MouseEvent) => {
		if (!content?.contains(event.target as Node)) closeLightbox();
	};
	escapeHandler = (event: KeyboardEvent) => {
		if (event.key === 'Escape') closeLightbox();
	};

	overlay?.addEventListener('click', overlayClickHandler);
	document.addEventListener('keydown', escapeHandler);
}

function removeGlobalListeners() {
	if (overlayClickHandler) {
		document.getElementById('lightbox-overlay')?.removeEventListener('click', overlayClickHandler);
		overlayClickHandler = null;
	}
	if (escapeHandler) {
		document.removeEventListener('keydown', escapeHandler);
		escapeHandler = null;
	}
}

export function closeLightbox() {
	removeGlobalListeners();
	currentElementIndex.set(null);
	document.body.style.overflow = 'auto';
	document.body.style.removeProperty('pointer-events');
}

function getGalleryIndex(galleryName: string): number {
	const galleries = get(lightboxGalleries);
	return galleries.findIndex((g) => g.name === galleryName);
}
