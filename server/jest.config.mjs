import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleDirectories: [
    'node_modules',
    __dirname + '/src',  // Usa __dirname per i percorsi relativi
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Aggiungi le estensioni dei file TypeScript per trattarli come ESM
};