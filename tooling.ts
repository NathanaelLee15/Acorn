
import Anthropic from '@anthropic-ai/sdk';
import { loadTool } from './scripting';
import { quick_sys_call } from './sys_wrap';
import { currentMaxTokens, currentModel, debug, models } from './common';


const anthropic = new Anthropic()

export const tools: any = {}


export async function standard_complete(line:string, useTools=true): Promise<any> {
    console.log("\n# STANDARD_COMPLETE:\n")
    
    let allTools:any= []
    if (useTools) {
        for (let tool in tools) {
            console.log("Attaching Tool: ", tool, "\n")
            allTools.push(tools[tool].schema)
        }
    }

    let response:any=null
    try {
        let model = models[currentModel]
        response = await anthropic.messages.create({
            model: model,
            max_tokens: currentMaxTokens,
            messages: [
                {
                    "role": "user",
                    "content": line,
                }
            ],
            tools: allTools,
        });
    } catch (error) {
        console.error(error)
        return ""
    }

    if (response === null) {
        console.log("Failed to get response")
        return ""
    }
    
    if (useTools) {
        try {    
            if (response.stop_reason == "tool_use") {
                let messageBlock : any = response.content[0]
                let toolBlock : any = response.content[1]
                
                console.log(messageBlock.text, "\n")
                
                let tool = tools[toolBlock['name']]
                if (tool !== undefined) {
                    console.log("Using Tool: ", toolBlock['name'], " ", toolBlock['input'])
                    let toolBacking = await loadTool(tool.path)
                    if (toolBacking.callback !== undefined) {
                        let res = await toolBacking.callback(standard_complete, quick_sys_call, toolBlock['input'])
                        console.log("TOOL-OUTPUT:\n", res)
                        return [messageBlock.text, res]
                    }
                }
                return messageBlock.text
            }
        } catch (error) {
            console.error(error)   
        }
    }

    if (debug) {
        console.log(response)
        console.log('')
        console.log(response.content)
    }
    return response.content
}

export function print_tools() {
    console.log("TOOLS:")
    for (let val in tools) {
        console.log(`  - ${val}`)
    }
}

export function getSchemasByToolNames(toolNames: any) {
    let schemas: any = [];

    for (let toolName of toolNames) {
        if (toolName in tools) {
            schemas.push(tools[toolName].schema)
        }
    }

    return schemas;
}

export function getSchemasFromProfile(profile: any) {
    let toolNames: any = [];

    for (let pluginName in profile) {
        let pluginTools = profile[pluginName];
        
        for (let toolName of pluginTools) {
            if (toolName in tools) {
                toolNames.push(toolName);
            }
        }
    }

    return getSchemasByToolNames(toolNames);
}
