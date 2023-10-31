export const isDevelopmentEnv = () => import.meta.env.DEV;

export const isStagingEnv = () => import.meta.env.MODE === "staging";

export const isProductionEnv = () => import.meta.env.PROD;
