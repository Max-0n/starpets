import type { Component } from 'vue'

export type ComponentImport = Record<string, () => Promise<{ default: Component }>>
