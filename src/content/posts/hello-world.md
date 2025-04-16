---
title: Hello World 👀
description: Ein Post darüber, wie diese Webseite hier funktioniert.
date: 2025-4-16
image: /posts/hello-world.jpg
---

Um diese Webseite ein bisschen mit Leben zu füllen, dachte ich mir, ich schreibe mal einen Post darüber, wie sie funktioniert. Wer sich den Code der Webseite im Detail angucken möchte, kann das in [diesem Repository](https://github.com/redii/www) auf Github tun.

## Einleitung

Die Webseite die du gerade siehst, habe ich schon mehrfach neugebaut und werde das in Zukunft wahrscheinlich auch nochmal das ein oder andere Mal tun... Bisher habe ich für die Entwicklung meiner Webseite einen [Static-Site Generator](https://en.wikipedia.org/wiki/Static_site_generator) namens [Hugo](https://gohugo.io/) verwendet. Das Arbeiten mit Hugo war eigentlich ideal, da es die Webseite klein und simpel gehalten hat... allerdings generiert so ein SSG lediglich statische HTML Dateien, was die technischen Möglichkeiten stark einschränkt. Vor allem dynamische Inhalte und serverseitige Funktionen waren mit Hugo kaum umzusetzen.

### Ein "neues" Framework

Also habe ich meine Webseite mal wieder neu aufgebaut... dieses Mal allerdings mit [SvelteKit](https://svelte.dev/). Um zu verstehen, welche Vorteile SvelteKit gegenüber Hugo hat, lohnt sich ein Blick auf die Webseite des Frameworks, dort wird es wie folgt beschrieben:

> SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.

Diese Seite hier ist also keine simple statische Webseite bestehend aus einzelnen HTML-Dateien, **sondern eine Webanwendung**, die es mir ermöglicht, verschiedenste Funktionen zu integrieren. Das ist möglich, weil das Framework neben dem Frontend auch die Grundlage für ein Backend stellt. Somit kann ich auch serverseitige Funktionen wie z.B. eine Authentifizierung oder die Anbindung externer APIs in die Webapp einbauen.

<small>Eigentlich arbeite ich schon mehrere Jahre mit SvelteKit, allerdings habe mich bisher immer dagegen gesträubt es auch auf meiner persönlichen Webseite zu verwenden, da es diese unnötig komplex gemacht hätte.</small>

## Content Management System

In der letzten Version der Seite, welche noch einen Static Site Generator verwendet hatte, war mein CMS im Grund eine Ordnerstruktur mit darin enthaltenen [Markdown](https://www.markdownguide.org/getting-started/) Dateien. Eigentlich war das alles was ich brauche und wäre auch noch in dieser neuen Version meistens ausreichend - meistens aber eben nicht immer. Aus diesem Grund verwendet die neue Webseite nun ein CMS names [Directus](https://directus.io/).

<small>

Weil ich das Arbeiten mit einfachen Markdown-Dateien im Repository der Webseite aber so schön fand, habe ich mich doch nicht ganz davon getrennt. Meine Blog Posts - [wie dieser hier gerade](https://github.com/redii/www/blob/main/src/content/posts/hello-world.md) - schreibe ich auch in der aktuellen Version noch in einfachen Markdown Dateien und nicht über das Directus CMS. Eigentlich überflüssig aber why not...

</small>

### Directus

Directus ist ein Open-Source Headless CMS, das es mir ziemlich einfach macht, die Inhalte meiner Webseite in echtzeit zu verwalten. Dafür muss ich mich nun nur noch auf [cms.akmann.dev](https://cms.akmann.dev) einloggen und kann dort (fast) alle Inhalte meiner Webseite über ein schönes Dashboard bearbeiten. Das CMS hoste ich selbst auf dem selben Server auf dem auch diese Webseite gerade läuft in einem Docker Container.

![Directus Dashboard](/posts/directus_editing_itadm.png)
_Bearbeiten der ITADM Kursinhalte im Directus CMS_

Das CMS ist Headless, was bedeutet, dass ich **lediglich die Inhalte** dieser Webseite darin verwalte, nicht aber das Design oder das Layout der Webseite. Die gesamte Struktur der Webseite habe ich händisch mit Svelte programmiert, mit der Hilfe von [TailwindCSS](https://tailwindcss.com/) und ein paar [Shadcn-Svelte](https://www.shadcn-svelte.com/) Komponenten. Der Code der diesen Blog-Post hier in eine Struktur bringt, findest du [hier](<https://github.com/redii/www/blob/main/src/routes/(www)/posts/%5Bslug%5D/%2Bpage.svelte>).
