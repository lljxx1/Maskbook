export interface JsonRpcPayload {
    jsonrpc: string
    method: string
    params: any[]
    id?: string | number
}

export interface JsonRpcResponse {
    jsonrpc: string
    id: number
    result?: any
    error?: string
}

export interface LinkedProfileDetails {
    connectionConfirmState: 'confirmed' | 'pending' | 'denied'
}

// These type MUST be sync with packages/shared-base/src/crypto/JWKType
export interface EC_Public_JsonWebKey extends JsonWebKey, Nominal<'EC public'> {}
export interface EC_Private_JsonWebKey extends JsonWebKey, Nominal<'EC private'> {}
export interface AESJsonWebKey extends JsonWebKey, Nominal<'AES'> {}

declare class Nominal<T> {
    /** Ghost property, don't use it! */
    private __brand: T
}

export interface PersonaRecord {
    identifier: string
    mnemonic?: {
        words: string
        parameter: { path: string; withPassword: boolean }
    }
    publicKey: EC_Public_JsonWebKey
    privateKey?: EC_Private_JsonWebKey
    localKey?: AESJsonWebKey
    nickname?: string
    linkedProfiles: Map<string, LinkedProfileDetails>
    createAt: number
    updateAt: number
    hasLogout?: boolean
    uninitialized?: boolean
}

export interface ProfileRecord {
    identifier: string
    nickname?: string
    localKey?: AESJsonWebKey
    linkedPersona?: string
    createAt?: number
    updateAt?: number
}

export type PageOption = {
    pageSize: number
    pageOffset: number
}
