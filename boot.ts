
import { currentUsageMode, debug, loadEnv, pluginsPath, shouldLogProfiles, shouldLogSchemas, shouldLogTools, USAGE_PIPE } from "./common"
import { loadExternalProfiles, loadUserProfile, profiles } from "./profiles"
import { getSchemasFromProfile, tools } from "./tooling"


export async function setup(userProfileDir:string=".") {
    loadEnv()

    if (! (await loadExternalProfiles(pluginsPath, debug))) {
        if (currentUsageMode != USAGE_PIPE) {
            console.log("Failed to load external profiles...")
        }
        return
    }

    if (! (await loadUserProfile(userProfileDir, debug))) {
        if (currentUsageMode != USAGE_PIPE) {
            console.log("Failed to load profile...")
        }
        return
    }

    if (shouldLogProfiles && currentUsageMode != USAGE_PIPE) {
        console.log("\nPROFILES\n")
        console.log(profiles)
        console.log()
    }
    if (shouldLogSchemas && currentUsageMode != USAGE_PIPE) {
        console.log("\nSCHEMAS\n")
        for (let profile in profiles) {
            console.log(`For Profile: ${profile}`)
            console.log(getSchemasFromProfile(profiles[profile]))
        }
        console.log()
    }
    if (shouldLogTools && currentUsageMode != USAGE_PIPE) {
        console.log("\nTools\n")
        console.log(tools)
        console.log()
    }
}
