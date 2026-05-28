import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export default function NotesScreen() {
  return (
    <View style={styles.container}>
      <Text>Notes coming soon</Text>
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