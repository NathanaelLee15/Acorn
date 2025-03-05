
import { debug, loadEnv, pluginsPath, shouldLogProfiles, shouldLogSchemas, shouldLogTools } from "./common"
import { loadExternalProfiles, loadUserProfile, profiles } from "./profiles"
import { getSchemasFromProfile, tools } from "./tooling"


export async function setup(userProfileDir:string=".") {
    loadEnv()

    if (! (await loadExternalProfiles(pluginsPath, debug))) {
        console.log("Failed to load external profiles...")
        return
    }

    if (! (await loadUserProfile(userProfileDir, debug))) {
        console.log("Failed to load profile...")
        return
    }

    if (shouldLogProfiles) {
        console.log("\nPROFILES\n")
        console.log(profiles)
        console.log()
    }
    if (shouldLogSchemas) {
        console.log("\nSCHEMAS\n")
        for (let profile in profiles) {
            console.log(`For Profile: ${profile}`)
            console.log(getSchemasFromProfile(profiles[profile]))
        }
        console.log()
    }
    if (shouldLogTools) {
        console.log("\nTools\n")
        console.log(tools)
        console.log()
    }
}
