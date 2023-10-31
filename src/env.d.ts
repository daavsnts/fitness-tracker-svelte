/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WILL_BE_AVAILABLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
