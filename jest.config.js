// module.exports = {
//   preset: "react-native",
//   setupFilesAfterEnv: ["./jest.setup.js"],
//   transform: {
//     "^.+\\.(js|ts|tsx)$": "babel-jest",
//   },
//   transformIgnorePatterns: [
//     "node_modules/(?!((react-native|@react-native|@react-native-community|@react-navigation|expo|react-native-gesture-handler)/))",
//   ],
//   testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
//   collectCoverage: true,
//   collectCoverageFrom: [
//     "src/**/*.{js,ts,tsx}", // include all your source files
//     "!src/**/*.d.ts", // exclude type declarations
//     // "!src/**/index.{ts,tsx}", // optional: exclude index exports
//   ],
//   coverageDirectory: "coverage", // folder where coverage reports will be generated
//   coverageReporters: ["json", "lcov", "text", "clover"],
// };
module.exports = {
  preset: "react-native",
  resolver: "@nx/jest/plugins/resolver",
  displayName: "Propay",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "babel-jest",
    "\\.(svg|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileTransformer.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|@react-native-community|expo(nent)?)/)",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  fakeTimers: {
    enableGlobally: true,
  },
  jest: {
    preset: "jest-expo",
    transformIgnorePatterns: [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    ],
  },
};
