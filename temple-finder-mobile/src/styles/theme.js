import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B35',
    primaryDark: '#E55A2B',
    secondary: '#F7931E',
    accent: '#4CAF50',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    textLight: '#999999',
    border: '#E0E0E0',
    error: '#F44336',
    warning: '#FF9800',
    success: '#4CAF50',
    info: '#2196F3',
    // Custom colors
    templeGold: '#FFD700',
    templeOrange: '#FF6B35',
    templeRed: '#E91E63',
    templeBlue: '#2196F3',
    templeGreen: '#4CAF50',
    templePurple: '#9C27B0',
    // Gradient colors
    gradientStart: '#FF6B35',
    gradientEnd: '#F7931E',
    // Status colors
    online: '#4CAF50',
    offline: '#F44336',
    busy: '#FF9800',
    // Rating colors
    ratingHigh: '#4CAF50',
    ratingMedium: '#FF9800',
    ratingLow: '#F44336',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    margin: theme.spacing.sm,
    ...theme.shadows.md,
  },
  button: {
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  text: {
    color: theme.colors.text,
  },
  textSecondary: {
    color: theme.colors.textSecondary,
  },
  textLight: {
    color: theme.colors.textLight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  body: {
    fontSize: 16,
    color: theme.colors.text,
  },
  caption: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  small: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
};

export default theme;




