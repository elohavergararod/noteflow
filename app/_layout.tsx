import { PaperProvider } from 'react-native-paper'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from '../constants/theme'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="new-note"
          options={{
            presentation: 'modal',
            title: 'New Note',
          }}
        />
      </Stack>
    </PaperProvider>
  )
}