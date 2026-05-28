import { StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import { useNotesStore } from '../../../store/noteStore'
import ChecklistCard from '../../../components/items/ChecklistCard'
import type { ChecklistNote } from '../../../types'
import { colors, spacing } from '../../../constants/theme'

export default function ChecklistsScreen() {
  const checklists = useNotesStore((state) => state.checklists)
  const router = useRouter()

  return (
    <View style={styles.container}>
      <FlashList
        data={checklists}
        renderItem={({ item }: { item: ChecklistNote }) => (
          <ChecklistCard checklist={item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<View style={styles.empty} />}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        color="white"
        onPress={() => router.push('/new-note')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingVertical: spacing.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.lg,
    backgroundColor: colors.checklist,
  },
})