
export const USAGE_NONE     = "none"
export const USAGE_DEBUG    = "debug"
export const USAGE_PIPE     = "pipe"
export let currentUsageMode:string=USAGE_NONE
export function setUsageMode(mode:string) {
    currentUsageMode = mode
}


const defaultPluginsPath = "C:/repos/acorn-plugins"
const defaultMaxTokens = 512
const defaultModel = "claude_haiku"

// "export let"s may be set from .env

export let pluginsPath:string

export let debug:boolean=false
export let shouldLogProfiles:boolean
export let shouldLogSchemas:boolean
export let shouldLogTools:boolean

export let currentModel:string
export let currentMaxTokens:number


export const models: any = {
    "claude_2_1":   "claude-2.1",
    "claude_3_7":   "claude-3-7-sonnet-20250219",
    "claude_3":     "claude-3-sonnet-20240229",
    "claude_3_5":   "claude-3-5-sonnet-20240620",
    "claude_haiku": "claude-3-5-haiku-20241022",
    "claude_opus":  "claude-3-opus-20240229"
}

export function loadEnv() {
    pluginsPath = Bun.env.ACORN_PLUGINS_PATH ?? defaultPluginsPath
    
    debug = Bun.env.DEBUG == 'true' ? true : false
    shouldLogProfiles = Bun.env.ACORN_SHOULD_LOG_PROFILES == 'true' ? true : false
    shouldLogSchemas = Bun.env.ACORN_SHOULD_LOG_SCHEMAS == 'true' ? true : false
    shouldLogTools = Bun.env.ACORN_SHOULD_LOG_TOOLS == 'true' ? true : false
    
    currentModel = Bun.env.ACORN_CLAUDE_MODEL ?? defaultModel
    currentMaxTokens = Number(Bun.env.ACORN_MAX_TOKENS) ?? defaultMaxTokens
}
