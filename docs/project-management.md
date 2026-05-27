# Project Management

## Methodology

This project uses a **Kanban** workflow adapted for solo development.
Kanban is preferred over Scrum because there is only one developer,
the scope is fixed, and work items can be started and finished within
a single session without needing sprint ceremonies.

## Trello Board

👉 [NoteFlow Trello Board](https://trello.com/b/RmEMQD0s/noteflow)

## Columns

| Column | Purpose |
|---|---|
| **Backlog** | All known tasks not yet started |
| **Todo** | Tasks ready to start in the current session |
| **In Progress** | Actively being worked on — max 2 cards at once |
| **Review** | Done but not yet tested or documented |
| **Done** | Complete, tested and documented |

## Branch strategy

main        ← stable production code
develop     ← integration branch
└── feature/name   ← one branch per feature
└── fix/name       ← bug fixes
└── docs/name      ← documentation only

## Commit conventions

feat: add checklist card component
fix: correct AsyncStorage key collision
docs: add react-native-teoria.md
chore: install FlashList dependency

## Task priority order

1. Project setup and navigation
2. TypeScript types and interfaces
3. Zustand store
4. UI components and lists
5. Forms and validation
6. Persistence with AsyncStorage
7. UX polish and haptics
8. Documentation