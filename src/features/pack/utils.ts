// src/features/pack/utils.ts
export const uid = () => Math.random().toString(36).slice(2);
export const nowISO = () => new Date().toISOString();
