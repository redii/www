---
title: Hello World 👀
description: Ein Post darüber, wie diese Webseite hier funktioniert.
date: 2025-4-14
image:
draft: false
---

Um diese Webseite ein bisschen mit Leben zu füllen, dachte ich mir, ich schreibe mal einen Post darüber, wie sie funktioniert. Wer sich den Code der Webseite im Detail angucken möchte, kann das in [diesem Repository](https://github.com/redii/www) auf Github tun.

## Einleitung

Die Webseite die du gerade siehst, ist nicht die erste Version. Eigentlich habe ich die Webseite schon mehrfach neugebaut und werde das in Zukunft wahrscheinlich auch nochmal das ein oder andere Mal tun... Bisher hatte ich einen [Static-Site Generator](https://en.wikipedia.org/wiki/Static_site_generator) namens [Hugo](https://gohugo.io/) genutzt, wodurch die Webseite ziemlich simpel strukturiert war. Das arbeiten mit einem SSG hat mir eigentlich sehr gut gefallen, allerdings produziert es lediglich statische HTML Dateien.

### Ein "neues" Framework

Also habe ich meine Webseite mal wieder neu aufgebaut... dieses Mal habe ich allerdings [SvelteKit](https://svelte.dev/) verwendet. Auf der Webseite des Frameworks wird es wie folgt beschrieben:

> SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.

Diese Webseite ist also keine simple statische Webseite bestehend aus einzelnen HTML-Dateien, **sondern eine Webanwendung**, die es mir ermöglicht, dynamische Funktionen zu integrieren. Das ist möglich, weil das Framework neben dem Frontend auch die Grundlage für ein Backend stellt. Dadurch kann ich serverseitige Funktionen wie z.B. eine Authentifizierung oder die Anbindung externer APIs in die Webapp einbauen.

<small>Tatsächlich arbeite ich schon mehrere Jahre mit dem Framework, habe mich nur immer davor gestreubt es auch auf meiner persönlichen Webseite zu verwenden, da es diese bisher unnötig komplex gemacht hätte.</small>

## Content Management System

In der letzten Version der Seite, welche noch einen Static Site Generator verwendet hatte, war mein CMS im Grund eine Ordnerstruktur mit darin enthaltenen [Markdown](https://www.markdownguide.org/getting-started/) Dateien. Eigentlich war das alles was ich brauche und wäre auch noch in dieser neuen Version meistens ausreichend... Meistens aber eben nicht immer.

Aus diesem Grund verwendet die neue Webseite nun ein CMS names [Directus](https://directus.io/), mit der Ausnahme, dass ich meine Blog Posts ([wie diesen hier gerade](https://github.com/redii/www/blob/main/src/content/posts/hello-world.md)) weiterhin in einfachen Markdown Dateien direkt im Sourcecode der Webseite schreibe. Alle anderen Inhalte wie bspw. meine [ITADM Kursinhalte](/itadm), verwalte ich jetzt allerdings im neuen CMS Directus.

### Directus

Directus heißt das CMS für das ich mich entschieden habe. Es ist ein Open-Source CMS, das es mir ziemlich einfach macht, die Inhalte meiner Webseite in echtzeit zu verwalten. Dafür muss ich mich nun nur noch auf [cms.akmann.dev](https://cms.akmann.dev) einloggen und kann dort (fast) alle Inhalte meiner Webseite über ein schönes Dashboard bearbeiten. Das CMS hoste ich selbst auf dem selben Server auf dem auch diese Webseite gerade läuft.

![Directus Dashboard](/posts/directus_editing_itadm.png)
_Bearbeiten der ITADM Kursinhalte im Directus CMS_

Das CMS ist Headless, was bedeutet, dass ich nicht die Optik dieser Webseite in Directus bearbeite. Ich kann **lediglich die Inhalte** dieser Webseite anpassen, also die Texte oder Bilder die hier angezeigt werden... nicht aber das Design oder die Struktur der Webseite. Das gesamte Layout der Webseite habe ich händisch mit Svelte programmiert, mit der Hilfe von [TailwindCSS](https://tailwindcss.com/) und ein paar [Shadcn-Svelte](https://www.shadcn-svelte.com/) Komponenten.
