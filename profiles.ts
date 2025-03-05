
import { pluginsPath } from "./common"
import { tools } from "./tooling"


export const profiles: any = {}
export const plugins: any = {}


export async function loadExternalProfiles(dir:string=".", debug:boolean=false): Promise<boolean> {
    let filePath = `${dir}/profiles.json`
    let fileObj = Bun.file(filePath)
    if (! (await fileObj.exists())) {
        console.log("profiles.json does not exist!")
        return false
    }

    console.log("Loading External Profiles: ", dir)
    try {
        let text = await fileObj.text()
        let _profiles = JSON.parse(text)
        for (let profileName in _profiles) {
            let _plugins = _profiles[profileName]
            profiles[profileName] = _plugins
        }
        
        return true
    } catch (error) {
        console.error(error)
    }
    return false
}

export async function loadUserProfile(dir:string=".", debug:boolean=false): Promise<boolean> {
    if (dir.endsWith('/')) {
        dir = dir.slice(0, dir.length-1)
    }

    try {
        const fs = require("fs");
        if (! fs.statSync(dir).isDirectory()) {
            console.log("not a valid directory path!")
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }

    let filePath = `${dir}/profile.json`
    let fileObj = Bun.file(filePath)
    
    let profile: any = {}
    if (! (await fileObj.exists())) {
        console.log("Profile not found!")
        console.log("Create profile:")

        let dirPath = prompt('What\'s the parent path for profile.json?\n-> ');
        if (dirPath === null) {
            dirPath = dir ?? '.'
        }
        if (dirPath.endsWith('/') || 
            dirPath.endsWith('\\')
        ) {
            dirPath = dirPath.slice(0, dirPath.length-1)
        }
        dir = dirPath

        const inputName = prompt('What\'s the profile\'s name?\n-> ');
        if (inputName === null) {
            return false
        }
        profile.name = inputName
        
        filePath = `${dir}/profile.json`
        const ans = prompt('Make new profile? [Y] n \n-> ' + filePath);
        if (ans?.toUpperCase() != "N") {   
            profile.deps = []
            profile.plugins = {}
            await Bun.write(filePath, JSON.stringify(profile, null, 4))
            
            profiles[profile.name] = profile.plugins
            
        } else {
            return false
        }
    }

    console.log("Loading User Profile: ", filePath)
    try {
        let fileObj2 = Bun.file(filePath)
        let text = await fileObj2.text()
        let profile = JSON.parse(text)
        let userName = profile.name
        
        for (let otherProfile of profile.deps) {
            if (debug) {
                console.log("other:", otherProfile, profiles[otherProfile])
            }
            if (otherProfile.startsWith("-")) {
                if (debug) {
                    console.log("skipping   ", otherProfile)
                }
                continue
            }
            await bindProfile(profiles[otherProfile])
        }

        profiles[userName] = profile.plugins
        await bindProfile(profiles[userName])

        return true
    } catch (error) {
        console.error(error)
    }
    return false
}

async function bindProfile(profile: any, debug:boolean=false) {
    if (debug) {
        console.log("Binding Profile: ", profile)
    }
    for (let pluginName in profile) {
        if (pluginName.startsWith("-")) {
            if (debug) {
                console.log("skipping   ", pluginName)
            }
            continue
        }
        let plugin = await loadPlugin(pluginName, debug)
        plugins[pluginName] = plugin
        for (let tool of plugin.tools) {
            tools[tool.name] = tool
        }
    }
}

async function loadPlugin(pluginName: string = "example", debug:boolean=false) {    
    let filePath = `${pluginsPath}/${pluginName}/config.json`
    let text = await Bun.file(filePath).text()
    let obj = JSON.parse(text)
    if (debug) {
        console.log(obj)
        console.log()
    }

    let tc = 0;
    for (let tool of obj.tools) {
        let toolName = tool.name == "" ? tool.schema.name : tool.name
        obj.tools[tc].name = toolName
        
        let toolPath = tool.path;
        toolPath = toolPath.replace("{plugin_name}", pluginName)
        toolPath = toolPath.replace("{tool_name}", toolName)
        if (debug) {
            console.log(toolPath)
            console.log()
        }
        obj.tools[tc].path = toolPath

        if (debug) {
            console.log(tool.schema)
            console.log()
        }

        tc++
    }

    return obj
}
