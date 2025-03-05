
import { processInput } from "./commands"
import { loadUserProfile } from "./profiles"

export const CLI_VERSION = 0.1

export async function cli_main(targetDir:string=".", interactiveMode:boolean=true, promptText:string=""): Promise<string> {
    console.log("Running CLI.")

    if (! interactiveMode) {
        await processInput(promptText)
        return ""
    }

    let running = true
    while (running) {
        let userInput = prompt("-> ")
        if (userInput === null) {
            console.log("- invalid cmd, skip")
            continue
        }
        let input = userInput?.toLowerCase()
        if (input == "q" || input == "-q") {
            running = false
            break
        }
        if (input == "r" || input == "-r") {
            await loadUserProfile(targetDir)
            continue
        }
        await processInput(userInput!)
    }

    return ""
}
