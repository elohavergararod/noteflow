import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { useLocalSearchParams } from 'expo-router'

export default function ChecklistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View style={styles.container}>
      <Text>Checklist detail — {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})