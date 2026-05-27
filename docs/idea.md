# Project Idea — NoteFlow

## Problem Statement

People use multiple apps to manage different types of quick thoughts —
one app for notes, another for to-do lists, another for random ideas.
This fragmentation means context is lost and nothing stays organised.

**NoteFlow** solves this by unifying three types of content — text notes,
checklists and tagged ideas — in a single mobile app with a clean,
distraction-free interface. Everything in one place, always at hand.

---

## Target User

| Attribute | Description |
|---|---|
| Age range | 18 – 35 years old |
| Profile | Students, freelancers, knowledge workers |
| Behaviour | Captures thoughts on the go, manages daily tasks, collects ideas |
| Device | iPhone or Android, always within reach |
| Pain point | Scattered notes across apps, no single source of personal information |

---

## Core Features

1. **Text notes** — create, edit and delete rich text notes with title and content.
2. **Checklists** — create task lists with individual items that can be checked off, showing a progress bar.
3. **Ideas** — quick notes with colour coding and tags for easy categorisation.
4. **Three-tab navigation** — dedicated tabs for Notes, Checklists and Ideas.
5. **Create modal** — a single entry point to create any type of content.
6. **Detail view** — tap any card to open the full note with edit and delete options.
7. **Empty states** — friendly prompts when a tab has no content yet.
8. **Data persistence** — all content saved locally with AsyncStorage, survives app restarts.

---

## Optional Features

- Global search across all three content types
- Archive instead of delete — recoverable content
- Haptic feedback on key interactions
- Swipe to delete directly from the list
- Sort and filter options per tab
- Share a note as plain text

---

## Possible Future Improvements

- Cloud sync across devices with a backend API
- Collaboration — share a checklist with another user
- Reminders and notifications tied to checklist items
- Markdown support in text notes
- Export to PDF or plain text file
- Widget for the home screen showing pinned notes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native with Expo SDK 54 |
| Navigation | Expo Router (file-based) |
| UI Library | React Native Paper |
| State management | Zustand |
| Persistence | AsyncStorage |
| Language | TypeScript |
| Forms & validation | Zod |
| Lists | FlashList by Shopify |