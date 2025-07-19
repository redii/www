---
draft: true
title: Media Center, arr arr 🏴‍☠️
description: Automatisiertes herunterladen und bereitstellen von Linux ISOs *hust*
date: 2025-07-17
image: /posts/arr-arr.jpg
---

In den letzten Wochen (vielleicht sind es auch schon Monate), habe ich mich ein bisschen in die Welt der [\*arr Server-Lösungen](https://wiki.servarr.com/) eingefuchst und habe mir ein kleines Media Center für mich und meine Freunde eingerichtet. Mit diesem Post möchte ich grob zeigen, wie das Geflecht aus verschiedenen Diensten und Server-Lösungen zusammenarbeitet, um ein weitgehend automatisiertes Media Center bereitzustellen.

In einer vollumfänglichen Installation bietet das Media Center folgende Funktionen:

- Benutzer können neue Inhalte (Filme und Serien) anfragen
- Automatisiertes Herunterladen und Bereitstellen der angefragten Inhalte
- Streamen der Inhalte auf unterschiedliche Empfangsgeräte
  - PC und Laptop über die Webseite
  - Smartphone und Tablet per App
  - FireTV Stick und AppleTV per App

Diese Funktionen werden durch verschiedene Server-Lösungen und Dienste bereitgestellt, hier eine kurze Übersicht:

- [Jellyfin](https://jellyfin.org/) zum Streamen der Inhalte
- [Jellyseerr](https://docs.jellyseerr.dev/) zum Anfragen neuer Inhalte
- [Sonarr](https://sonarr.tv/) und [Radarr](https://radarr.video/) zum Verwalten der Inhalte
- [SABnzbd](https://sabnzbd.org/) zum Herunterladen neuer Inhalte
- [Usenet-Provider und -Indexer](https://de.wikipedia.org/wiki/Usenet) für die Inhalte 🏴‍☠️

## Was wird benötigt...

Für den Betrieb des Media Centers brauchen wir ein Serversystem und genügend Speicherplatz für die Inhalte die wir bereitstellen möchten. Außerdem benötigen wir noch ein paar Zugänge, welche für ein paar Moneten eingekauft werden können, dazu aber später mehr.

### On-Premise oder in der Cloud?

Wer die Möglichkeit hat, sollte wahrscheinlich die Hardware selbst in den eigenen vier Wänden betreiben. Das ist auf Dauer die wahrscheinlich günstigste Lösung und bietet die meiste Kontrolle. Wer allerdings sein Media Center auch unterwegs nutzen oder mit anderen teilen möchte, kann darüber nachdenken, stattdessen einen Server in der Cloud zu mieten. Hier spielen natürlich ein paar Faktoren eine Rolle wie z.B. die verfügbare Internetbandbreite, der Stromverbrauch deiner Hardware, die Anzahl gleichzeitiger Benutzer und und und...
