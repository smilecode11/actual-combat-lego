module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    transform: {
        "^.+\\.vue$": "vue-jest",
    },
    watchPathIgnorePatterns: ['node_modules'],
}

// module.exports = {
//     preset: '@vue/cli-plugin-unit-jest',
//     transformIgnorePatterns: ['/node_modules/(?!(leaflet))'],
//     watchPathIgnorePatterns: ['node_modules'],
//     testMatch: [
//         '<rootDir>/src/**/*.spec.js'
//     ],
// };