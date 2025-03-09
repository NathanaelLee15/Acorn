import { quick_sys_call } from "./sys_wrap"

export async function server_main(targetDir:string="."): Promise<string> {
    console.log("Running SERVER.")

    // todo:  implement route file loading
    //        
    // try {
    //     let obj = Bun.file("./")
    // } catch (error) {
    // }

    const useForceRefresh = true;
    
    if (useForceRefresh || await Bun.file(`${targetDir}/index.php`).exists()) {
        await quick_sys_call(`php ${targetDir}/index.php > ${targetDir}/index.html`)
    }
    if (await Bun.file(`${targetDir}/index.html`).exists()) {
        console.log("-  index.html ... ✔")
        // await quick_sys_call("bun ./index.html")
    }

    const routes = {
        "/": new Response(await Bun.file(`${targetDir}/index.html`).text()),
        // "/chat": new Response(await Bun.file(`${targetDir}/chat.html`).text()),
        // "/api/status": new Response("OK"),
        // "/users/:id": req => {
        //     return new Response(`Hello User ${req.params.id}!`);
        // },
    }
    
    console.log("# Serving...  http://127.0.0.1:3000")
    Bun.serve({
        routes: routes,
        fetch(req) {
          return new Response("Not Found", { status: 404 });
        },
    });
    
    return ""
}
