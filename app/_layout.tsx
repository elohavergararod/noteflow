import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper'
import { Slot } from 'expo-router'
import { useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from '../constants/theme'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme

  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  )
}