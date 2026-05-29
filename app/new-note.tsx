import { useState } from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { Text, Button, TextInput, SegmentedButtons } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { z } from 'zod'
import { useNotesStore } from '../store/noteStore'
import { colors, spacing, borderRadius } from '../constants/theme'
import type { Note, ChecklistNote, IdeaNote, ChecklistItem } from '../types'


const noteSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(1, 'Content cannot be empty'),
})

const checklistSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
})

const ideaSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  tags: z.string().min(1, 'Add at least one tag'),
})


type NoteType = 'note' | 'checklist' | 'idea'

const IDEA_COLORS = [
  '#6366F1', '#10B981', '#F59E0B',
  '#EF4444', '#8B5CF6', '#EC4899',
]


export default function NewNoteModal() {
  const router = useRouter()
  const { addNote, addChecklist, addIdea } = useNotesStore()

  const [type, setType] = useState<NoteType>('note')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [selectedColor, setSelectedColor] = useState(IDEA_COLORS[0])
  const [checklistItems, setChecklistItems] = useState(['', '', ''])
  const [errors, setErrors] = useState<Record<string, string>>({})

  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  }

  function validate(): boolean {
    try {
      if (type === 'note') noteSchema.parse({ title, content })
      if (type === 'checklist') checklistSchema.parse({ title })
      if (type === 'idea') ideaSchema.parse({ title, tags })
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        err.issues.forEach((e) => {
          if (e.path[0]) newErrors[e.path[0] as string] = e.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  function handleSubmit() {
    if (!validate()) return
    const now = new Date()

    if (type === 'note') {
      const note: Note = {
        id: generateId(),
        title: title.trim(),
        content: content.trim(),
        createdAt: now,
        updatedAt: now,
      }
      addNote(note)
    }

    if (type === 'checklist') {
      const items: ChecklistItem[] = checklistItems
        .filter((i) => i.trim().length > 0)
        .map((text) => ({
          id: generateId(),
          text: text.trim(),
          isCompleted: false,
        }))
      const checklist: ChecklistNote = {
        id: generateId(),
        title: title.trim(),
        items,
        createdAt: now,
        updatedAt: now,
      }
      addChecklist(checklist)
    }

    if (type === 'idea') {
      const idea: IdeaNote = {
        id: generateId(),
        title: title.trim(),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        color: selectedColor,
        createdAt: now,
        updatedAt: now,
      }
      addIdea(idea)
    }

    router.back()
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>

        <SegmentedButtons
          value={type}
          onValueChange={(v) => setType(v as NoteType)}
          style={styles.segment}
          buttons={[
            { value: 'note', label: 'Note' },
            { value: 'checklist', label: 'Checklist' },
            { value: 'idea', label: 'Idea' },
          ]}
        />

        <TextInput
          label="Title"
          value={title}
          onChangeText={(v) => { setTitle(v); setErrors((e) => ({ ...e, title: '' })) }}
          mode="outlined"
          style={styles.input}
          error={!!errors.title}
        />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}

        {type === 'note' && (
          <>
            <TextInput
              label="Content"
              value={content}
              onChangeText={(v) => { setContent(v); setErrors((e) => ({ ...e, content: '' })) }}
              mode="outlined"
              multiline
              numberOfLines={6}
              style={styles.input}
              error={!!errors.content}
            />
            {errors.content && <Text style={styles.error}>{errors.content}</Text>}
          </>
        )}

        {type === 'checklist' && (
          <View style={styles.section}>
            <Text variant="labelLarge" style={styles.label}>Items</Text>
            {checklistItems.map((item, i) => (
              <TextInput
                key={i}
                label={`Item ${i + 1}`}
                value={item}
                onChangeText={(v) =>
                  setChecklistItems((prev) => prev.map((p, idx) => idx === i ? v : p))
                }
                mode="outlined"
                style={styles.input}
              />
            ))}
            <Button
              onPress={() => setChecklistItems((prev) => [...prev, ''])}
              mode="text"
            >
              + Add item
            </Button>
          </View>
        )}

        {type === 'idea' && (
          <>
            <TextInput
              label="Tags (comma separated)"
              value={tags}
              onChangeText={(v) => { setTags(v); setErrors((e) => ({ ...e, tags: '' })) }}
              mode="outlined"
              style={styles.input}
              placeholder="react, mobile, design"
              error={!!errors.tags}
            />
            {errors.tags && <Text style={styles.error}>{errors.tags}</Text>}

            <Text variant="labelLarge" style={styles.label}>Color</Text>
            <View style={styles.colors}>
              {IDEA_COLORS.map((c) => (
                <View
                  key={c}
                  style={[
                    styles.colorDot,
                    { backgroundColor: c },
                    selectedColor === c && styles.colorSelected,
                  ]}
                  onTouchEnd={() => setSelectedColor(c)}
                />
              ))}
            </View>
          </>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          buttonColor={colors[type === 'note' ? 'note' : type === 'checklist' ? 'checklist' : 'idea']}
        >
          Save
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.md },
  segment: { marginBottom: spacing.md },
  input: { marginBottom: spacing.xs },
  error: { color: '#EF4444', fontSize: 12, marginBottom: spacing.sm },
  section: { marginTop: spacing.sm },
  label: { marginBottom: spacing.sm, marginTop: spacing.sm },
  colors: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  colorDot: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: '#111',
  },
  button: { marginTop: spacing.md, borderRadius: borderRadius.full },
})