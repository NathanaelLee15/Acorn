
import { setup } from "./boot"
import { cli_main } from "./cli"
import { server_main } from "./server"


async function main() {
    const MODE_DEFAULT = 1
    const MODE_TARGET  = 2
    const MODE_SERVER  = 3
    const MODE_AUTO    = 4

    let autoPrompt = null
    let targetDir = "."
    let mode = 0; {
        let args = Bun.argv
        if (args.length < 3) {
            // bun.exe, index.ts
            // no inputs, run cli in cwd
            console.log("Trying Default")
            mode = MODE_DEFAULT
        }
        else if (args.length < 4) {
            // bun.exe, index.ts, ./path
            // 1 input, 
            // [0] parent path of profile.json
            targetDir = args[args.length-1]
            console.log("Trying Target", targetDir)
            mode = MODE_TARGET
        }
        else if (args.length < 5) {
            // bun.exe, index.ts, ./path, -S|-serve
            // 2 inputs, 
            // [0] parent path of profile.json
            // [1] -S|-serve flag, server mode
            targetDir = args[args.length-2]
            let flag = args[args.length-1]

            console.log("Trying Server Mode", targetDir, flag)
            if (flag == "-s"     || flag == "-S" || 
                flag == "-serve" || flag == "-Serve"
            ) {
                mode = MODE_SERVER
            }
            else {
                mode = MODE_TARGET
            }
        }
        else if (args.length < 6) {
            // bun.exe, index.ts, ./path, -A|-auto, <prompt>
            // 2 inputs, 
            // [0] parent path of profile.json
            // [1] -A|-auto flag, auto mode
            // [2] prompt cli user
            targetDir = args[args.length-3]
            let flag = args[args.length-2]
            autoPrompt = args[args.length-1]

            console.log("Trying Auto Mode", targetDir, flag)
            if (flag == "-a"    || flag == "-A" || 
                flag == "-auto" || flag == "-Auto"
            ) {
                mode = MODE_AUTO
            }
            else {
                mode = MODE_TARGET
            }
        }
    }
    console.log("MODE: ", mode)
    if (mode == 0) {
        console.log("Invalid Mode, something went wrong.")
        return
    }

    let res = null;
    await setup(targetDir)
    if (mode <= MODE_TARGET) {
        res = await cli_main(targetDir)
    }
    else if (mode == MODE_SERVER) {
        res = await server_main(targetDir)
    }
    else if (mode == MODE_AUTO && autoPrompt !== null) {
        res = await cli_main(targetDir, false, autoPrompt)
    }
    console.log("Shutting Down...\nResult: ", res)
}

main()
