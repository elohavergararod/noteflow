import { StyleSheet, View } from 'react-native'
import { Card, Text, ProgressBar } from 'react-native-paper'
import { useRouter } from 'expo-router'
import type { ChecklistNote } from '../../types'
import { colors, spacing, borderRadius } from '../../constants/theme'

interface Props {
  checklist: ChecklistNote
}

export default function ChecklistCard({ checklist }: Props) {
  const router = useRouter()
  const completed = checklist.items.filter((i) => i.isCompleted).length
  const total = checklist.items.length
  const progress = total > 0 ? completed / total : 0

  return (
    <Card
      style={styles.card}
      onPress={() => router.push(`/checklists/${checklist.id}`)}
    >
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
            {checklist.title}
          </Text>
          <Text variant="bodySmall" style={styles.counter}>
            {completed}/{total}
          </Text>
        </View>
        <ProgressBar
          progress={progress}
          color={colors.checklist}
          style={styles.progress}
        />
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
    borderLeftColor: colors.checklist,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    fontWeight: '600',
  },
  counter: {
    color: colors.checklist,
    fontWeight: '600',
  },
  progress: {
    borderRadius: borderRadius.full,
    height: 6,
  },
})