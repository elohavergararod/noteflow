import { StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { useRouter } from 'expo-router'
import type { Note } from '../../types'
import { colors, spacing, borderRadius } from '../../constants/theme'

interface Props {
  note: Note
}

export default function NoteCard({ note }: Props) {
  const router = useRouter()

  return (
    <Card
      style={styles.card}
      onPress={() => router.push(`/notes/${note.id}`)}
    >
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
            {note.title}
          </Text>
          <Text variant="bodySmall" style={styles.date}>
            {note.createdAt.toLocaleDateString()}
          </Text>
        </View>
        <Text variant="bodyMedium" numberOfLines={2} style={styles.preview}>
          {note.content}
        </Text>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.note,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    flex: 1,
    fontWeight: '600',
  },
  date: {
    opacity: 0.5,
    marginLeft: spacing.sm,
  },
  preview: {
    opacity: 0.7,
  },
})