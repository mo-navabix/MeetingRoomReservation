import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const DidarTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#2563EB',
      600: '#1D4ED8',
      700: '#1E40AF',
      800: '#1E3A8A',
      900: '#172554',
    },

    colorScheme: {
      dark: {
        surface: {
          0: '#0B1326',
          50: '#111827',
          100: '#171F33',
          200: '#1E293B',
          300: '#334155',
        },

        text: {
          color: '#DAE2FD',

          mutedColor: '#94A3B8',
        },
      },
    },
  },
});
