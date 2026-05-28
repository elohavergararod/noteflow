import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export default function IdeasScreen() {
  return (
    <View style={styles.container}>
      <Text>Ideas coming soon</Text>
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