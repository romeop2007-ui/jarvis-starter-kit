---
name: agenda
description: Enregistre dans le Google Calendar de Roméo (MCP Google Calendar) les dates à retenir évoquées en session : anniversaires, fêtes à cadeau (fête des mères/pères, Noël), re-checks business, rendez-vous, engagements. À déclencher quand Roméo dit "ajoute à mon agenda", "note dans mon calendrier", "mets ça dans le calendrier", "rappelle-moi le…", ou quand une date à retenir apparaît dans la conversation. Règle d'or : on propose, Roméo valide, on crée. Lecture quotidienne via /morning.
allowed-tools: mcp__claude_ai_Google_Calendar__create_event, mcp__claude_ai_Google_Calendar__list_events, mcp__claude_ai_Google_Calendar__list_calendars
---

# Skill agenda — l'agenda de Roméo dans Google Calendar

Objectif : que Roméo n'oublie plus rien. Dès qu'une date à retenir est évoquée, on la pose
proprement dans son Google Calendar, avec le bon rappel, après son OK.

## Calendrier cible

- **Calendrier inscriptible unique : `romeop2007@gmail.com`** (calendrier principal).
- Fuseau : **`Europe/Paris`** (toujours le préciser).
- Le calendrier "Jours fériés en France" est en lecture seule : ne rien y écrire (les jours
  fériés sont déjà couverts par Google, ne pas les recréer).
- Le MCP ne permet pas de créer un nouveau calendrier : tout va sur le principal, on distingue
  les événements "Jarvis" par la **couleur** (voir plus bas).

## Règle d'or : proposer → valider → créer

1. **Proposer** : "Je note *[quoi]* dans ton agenda le *[date]* (rappel *[quand]*) ?"
2. **Attendre l'OK** de Roméo. Jamais d'écriture sans validation explicite.
3. **Créer** via `create_event`.
4. **Confirmer** en une ligne : "✅ Ajouté au *[date]*, rappel *[quand]*."

## Anti-doublon (toujours, avant de créer)

Avant chaque `create_event`, faire un `list_events` autour de la date (avec `fullText` sur un
mot-clé du titre) pour vérifier que l'événement n'existe pas déjà. S'il existe : ne pas recréer,
le signaler à Roméo.

## Catégories et réglages par défaut

### 🎂 Anniversaire (une personne)
- `allDay: true`, récurrent annuel : `recurrenceData: ["RRULE:FREQ=YEARLY"]`.
- Titre : `🎂 Anniversaire <Prénom>`.
- `colorId: "10"` (Basil, vert = perso).
- Rappels (`overrideReminders`) :
  - `{method: "popup", minutes: 40320}` (4 semaines avant, le max Google ≈ 1 mois → "penser au cadeau de <Prénom>").
  - `{method: "popup", minutes: 1440}` (1 jour avant → "souhaiter").

### 🎁 Fête à cadeau (fête des mères, fête des pères, Noël)
- `allDay: true`, récurrent annuel.
  - Fête des pères : `RRULE:FREQ=YEARLY;BYMONTH=6;BYDAY=3SU` (3e dimanche de juin).
  - Fête des mères : `RRULE:FREQ=YEARLY;BYMONTH=5;BYDAY=-1SU` (dernier dimanche de mai).
    ⚠️ Exception rare : si elle tombe le dimanche de Pentecôte, la vraie fête des mères FR
    passe au 1er dimanche de juin. Le RRULE ne gère pas l'exception → corriger à la main
    l'année concernée si besoin.
  - Noël : `25 décembre`, `RRULE:FREQ=YEARLY`.
- `colorId: "10"` (perso).
- Rappel : `{method: "popup", minutes: 40320}` (4 semaines avant, le max Google ≈ 1 mois → "penser au cadeau").

> Note : Google plafonne les rappels popup à **40320 minutes (4 semaines)**. Un `minutes`
> supérieur est silencieusement ramené à 40320. C'est notre "1 mois avant".

### 🔁 Re-check business
- `allDay: true` (ou timé le matin si Roméo préfère).
- Titre : `🔁 Re-check <quoi>` (ex "🔁 Re-check hakon.se — scaling ?").
- `colorId: "9"` (Blueberry, bleu = business).
- Rappel : `{method: "popup", minutes: 540}` le matin du jour J (9h), ou selon accord avec Roméo.

### 🗓️ Rendez-vous / engagement
- Événement **timé** (`startTime` / `endTime` ISO 8601, `allDay: false`).
- `colorId: "9"` (business) ou `"10"` (perso) selon le sujet.
- Rappels selon le contexte (par défaut popup 1 jour avant + popup 1h avant).

## Exemple d'appel `create_event` (anniversaire)

```
create_event(
  summary="🎂 Anniversaire Pénélope",
  startTime="2027-03-03T00:00:00",
  endTime="2027-03-04T00:00:00",
  allDay=true,
  timeZone="Europe/Paris",
  calendarId="romeop2007@gmail.com",
  colorId="10",
  recurrenceData=["RRULE:FREQ=YEARLY"],
  overrideReminders=[
    {"method": "popup", "minutes": 43200},
    {"method": "popup", "minutes": 1440}
  ],
  description="Penser au cadeau 1 mois avant."
)
```
Pour un all-day, `startTime` = jour J et `endTime` = lendemain, **en timestamp complet**
`AAAA-MM-JJT00:00:00` (l'API refuse une date seule, même avec `allDay: true`).
Ancrer la 1re occurrence sur la **prochaine** échéance à venir (le RRULE répète ensuite).

## Lecture de l'agenda

- Roméo consulte son agenda chaque matin via `/morning` (étape 3 déjà câblée : `list_events`
  du jour).
- Pour un point ponctuel ("qu'est-ce que j'ai cette semaine ?"), utiliser `list_events` sur la
  fenêtre demandée, calendrier principal, fuseau Europe/Paris.

## Rappels de posture
- On propose, on ne force pas. Roméo garde le contrôle de ce qui entre dans son agenda.
- Toujours préciser le fuseau Europe/Paris et le calendrier principal.
- Vérifier l'absence de doublon avant chaque création.
