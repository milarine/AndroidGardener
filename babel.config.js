module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          components: './src/components',
          db: './src/db',
          navigation: './src/navigation',
          screens: './src/screens',
          theme: './src/theme',
          utils: './src/utils',
        },
      },
    ],
  ],
};
