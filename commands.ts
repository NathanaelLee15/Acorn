

import { currentUsageMode, debug, USAGE_PIPE } from "./common"
import { print_help, print_version } from "./help"
import { quick_sys_call } from "./sys_wrap"
import { print_tools, standard_complete } from "./tooling"
import { wordContainsOneOf, wordStartsWithOneOf } from "./word_util"

// ideally this stay as a 
export const CMD_TOKEN = "-"

// text with fewer than chars will be skipped
const minPhraseChars = 10

const possibleCmdTokens = [
    CMD_TOKEN, 
    "php ", 
    "pa ", 
    "pas",
    "pam", 
    "pams",
    "npm ",
    "nrd",
    "bun ",
    "brd",
]

// must be ordered correctly
const possibleCmdWords: string[][] = [
    ["pas",  "php artisan serve"                ],
    ["pams", "php artisan migrate:fresh --seed" ],
    ["pam",  "php artisan migrate"              ],
    ["pa ",  "php artisan"                      ],
    ["php "                                     ],
    
    ["nrd",  "npm run dev" ],
    ["npm run "            ],
    ["npm "                ],

    ["brd",  "bun run dev" ],
    ["bun run "            ],
    ["bun "                ],
]

// tracks all available numeric commands
const allCmds: any = {
    101: {
        callback: (line:any) => {
            console.log("Hello Example!")
        }
    }
}


// check if 'line' has idicators for being a cmd
async function is_possible_cmd(line:string|number): Promise<boolean> {
    // if the only text is literally the cmd-token
    if (`${line}`.replaceAll(" ", "") == CMD_TOKEN) {
        print_help()
        return true
    }

    // Number(x) does a cast
    let id = Number(line)

    // since 'id' is the numeric from 'line' it begins with the cmd-token
    // meaning it's actually a negative number
    // '-id' negates the value, a cmd of '-101' would become 101
    let idKey = `${-id}`

    let lineStr = `${line}`.trimStart()
    return wordStartsWithOneOf(lineStr, possibleCmdTokens) || 
            allCmds[idKey] !== undefined
}


// should we print any help based on given input
function try_print_cmd(lineStr:string): string {
    if (lineStr == "-h") {
        print_help('all')
        return "true"
    }
    if (lineStr == "-v") {
        print_version()
        return "true"
    }
    if (lineStr == "-tools" || lineStr == "- tools") {
        print_tools()
        return "true"
    }
    return "false"
}


// try to run cmd string or number (targets allCmds)
async function process_cmd(line:string|number): Promise<string> {
    if (currentUsageMode != USAGE_PIPE) {
        console.log("Processing Command: ", line)
    }

    try {
        let id = Number(line)
        let cmd = allCmds[`${-id}`]
        if (cmd !== undefined) {
            let cmdRes = cmd.callback(line)
            return cmdRes
        }
    } catch (error) {}

    let lineStr = `${line}`
    
    let resTryProcessHelp = try_print_cmd(lineStr)
    if (resTryProcessHelp != "") {
        return resTryProcessHelp
    }

    lineStr = lineStr.trimStart()
    if (debug && currentUsageMode != USAGE_PIPE) {
        console.log("Checking Line for Commands:\n", lineStr)
    }

    for (let group of possibleCmdWords) {
        if (wordContainsOneOf(lineStr, group)) {
            let cmdRes = await quick_sys_call(lineStr)
            return cmdRes
        }
    }

    return "false"
}


// used for one-off calls or from a loop 
export async function processInput(textInput:string) {
    let res: string|number
    // try input as number
    try {
        res = parseInt(textInput)
        if (Number.isNaN(res)) {
            throw ""
        }
    }
    // else just use the input
    catch (error) {
        res = textInput
    }

    if (debug && currentUsageMode != USAGE_PIPE) {
        console.log("ECHO:" , res)
    }

    if (await is_possible_cmd(res)) {
        let cmdRes = await process_cmd(res)
        // if the command: has not returned true/false or if empty
        if (cmdRes != "false" && cmdRes != "true") {
            if (currentUsageMode == USAGE_PIPE) {
                if (cmdRes) {
                    console.log(cmdRes)
                }
            } else {
                console.log("Command Result:\n", cmdRes)
            }
        }
        return
    } 

    // let's not send garbage to the api
    let resStr = `${res}`
    if (resStr.length < minPhraseChars) {
        if (currentUsageMode != USAGE_PIPE) {
            console.log("Skipping Invoking Ai, line was too short:\n", resStr)
        }
        return
    }
    try {
        let content = await standard_complete(resStr)
        if (content[0].tool_text !== undefined) {
            console.log(content[0].tool_text)
        } else {
            console.log(content[0].text)
        }
    } catch (error) {}
    return false
}
