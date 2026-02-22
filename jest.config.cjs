/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: {
                    moduleResolution: 'node',
                    verbatimModuleSyntax: false,
                    allowImportingTsExtensions: false,
                    esModuleInterop: true,
                    jsx: 'react-jsx',
                    strict: true,
                    types: ['jest', '@testing-library/jest-dom'],
                },
            },
        ],
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/__tests__/**',
        '!src/**/*.d.ts',
        '!src/main.tsx',
    ],
};

module.exports = config;
