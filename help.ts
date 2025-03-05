
import { CLI_VERSION } from "./cli"


export function print_version() {
    console.log("# CLI_VERSION: ", CLI_VERSION)
}

export function print_essential_help() {
    console.log('## run with -h for more help')
}

export function print_main_commands() {
    console.log("## MAIN COMMANDS ##")
    console.log('---')
}

export function print_help(verbosity:string='none') {
    if (verbosity == 'none') {
        print_essential_help()
        return
    }

    if (verbosity == 'all') {
        // print_essential_help()
        print_main_commands()
        // ...
    }
}
