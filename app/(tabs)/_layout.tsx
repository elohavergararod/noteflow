import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'
import { colors } from '../../constants/theme'

export default function TabsLayout() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.note,
        tabBarInactiveTintColor: isDark ? '#6B7280' : '#9CA3AF',
        tabBarStyle: {
          backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
          borderTopColor: isDark ? '#2D2D2D' : '#E5E7EB',
        },
        headerStyle: {
          backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
        },
        headerTintColor: isDark ? '#F9FAFB' : '#111827',
      }}
    >
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-text" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="checkbox-marked-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}