
export async function quick_sys_call(cmdStr:string="echo hello!"): Promise<string> {
    console.log("Quick System Call: ", cmdStr)

    let segments: any = []
    if (cmdStr.includes(" ")) {
        segments = cmdStr.split(" ")
    } else {
        segments.push(cmdStr)
    }
    if (segments.length == 0) {
        return ""
    }

    const proc = Bun.spawn(segments)
    const res = await new Response(proc.stdout).text()
    return res
}
