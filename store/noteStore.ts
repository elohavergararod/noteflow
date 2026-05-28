import { create } from 'zustand'
import type { Note, ChecklistNote, IdeaNote } from '../types'

interface NotesStore {
  notes: Note[]
  checklists: ChecklistNote[]
  ideas: IdeaNote[]
  addNote: (note: Note) => void
  addChecklist: (checklist: ChecklistNote) => void
  addIdea: (idea: IdeaNote) => void
  deleteNote: (id: string) => void
  deleteChecklist: (id: string) => void
  deleteIdea: (id: string) => void
  updateNote: (id: string, data: Partial<Note>) => void
  updateChecklist: (id: string, data: Partial<ChecklistNote>) => void
  updateIdea: (id: string, data: Partial<IdeaNote>) => void
  toggleChecklistItem: (checklistId: string, itemId: string) => void
}

export const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  checklists: [],
  ideas: [],

  addNote: (note) =>
    set((state) => ({ notes: [note, ...state.notes] })),

  addChecklist: (checklist) =>
    set((state) => ({ checklists: [checklist, ...state.checklists] })),

  addIdea: (idea) =>
    set((state) => ({ ideas: [idea, ...state.ideas] })),

  deleteNote: (id) =>
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

  deleteChecklist: (id) =>
    set((state) => ({ checklists: state.checklists.filter((c) => c.id !== id) })),

  deleteIdea: (id) =>
    set((state) => ({ ideas: state.ideas.filter((i) => i.id !== id) })),

  updateNote: (id, data) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, ...data, updatedAt: new Date() } : n
      ),
    })),

  updateChecklist: (id, data) =>
    set((state) => ({
      checklists: state.checklists.map((c) =>
        c.id === id ? { ...c, ...data, updatedAt: new Date() } : c
      ),
    })),

  updateIdea: (id, data) =>
    set((state) => ({
      ideas: state.ideas.map((i) =>
        i.id === id ? { ...i, ...data, updatedAt: new Date() } : i
      ),
    })),

  toggleChecklistItem: (checklistId, itemId) =>
    set((state) => ({
      checklists: state.checklists.map((c) =>
        c.id !== checklistId
          ? c
          : {
              ...c,
              updatedAt: new Date(),
              items: c.items.map((i) =>
                i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i
              ),
            }
      ),
    })),
}))