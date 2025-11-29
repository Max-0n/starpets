export * from './button'
export * from './statTile'
export * from './text'

export interface ConnectorResponse {
  user: any
  stateVersion: string
  stateVersionBefore: string
  featureFlags?: any
}

export enum URLS {
  INDEX = '/',
  GAME = '/game',
}
