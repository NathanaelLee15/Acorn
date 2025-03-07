
import { currentUsageMode, debug, pluginsPath, USAGE_PIPE } from "./common";


async function loadJsScript(file_path: string) {
    const foo = Bun.file(file_path)
    let text = await foo.text()
    text = text.replaceAll("{DEBUG}", debug ? "true" : "false")
    return text;
}

export async function loadTool(toolPath: string): Promise<any> {
    let filePath = `${pluginsPath}/${toolPath}`
    if (currentUsageMode != USAGE_PIPE) {
        console.log("Loading Tool: ", filePath, "\n")
    }
    let scriptContent = await loadJsScript(filePath)

    const backing:any = {}
    try {
        eval(scriptContent)
    } catch (error) {
        console.error("Failed when executing: ", filePath)
        console.error(error)
    }
    return backing
}
