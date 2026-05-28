import { StyleSheet, View } from 'react-native'
import { Card, Text, Chip } from 'react-native-paper'
import { useRouter } from 'expo-router'
import type { IdeaNote } from '../../types'
import { spacing, borderRadius } from '../../constants/theme'

interface Props {
  idea: IdeaNote
}

export default function IdeaCard({ idea }: Props) {
  const router = useRouter()

  return (
    <Card
      style={[styles.card, { borderLeftColor: idea.color }]}
      onPress={() => router.push(`/ideas/${idea.id}`)}
    >
      <Card.Content>
        <Text variant="titleMedium" numberOfLines={1} style={styles.title}>
          {idea.title}
        </Text>
        <View style={styles.tags}>
          {idea.tags.slice(0, 3).map((tag) => (
            <Chip
              key={tag}
              compact
              style={[styles.chip, { backgroundColor: idea.color + '22' }]}
              textStyle={{ color: idea.color, fontSize: 11 }}
            >
              {tag}
            </Chip>
          ))}
        </View>
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
  },
  title: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    borderRadius: borderRadius.full,
  },
})