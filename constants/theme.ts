import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper'

export const colors = {
  note: '#6366F1',
  checklist: '#10B981',
  idea: '#F59E0B',
  error: '#EF4444',
  success: '#10B981',
}

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
}

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366F1',
    secondary: '#F59E0B',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    error: '#EF4444',
  },
}

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#818CF8',
    secondary: '#FCD34D',
    background: '#0F0F0F',
    surface: '#1A1A1A',
    error: '#F87171',
  },
}

export type AppTheme = typeof lightTheme