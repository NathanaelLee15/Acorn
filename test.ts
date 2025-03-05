
import Anthropic from "@anthropic-ai/sdk";

const testModel = "claude-3-5-haiku-20241022"

const anthropic = new Anthropic()

let promptText = "hello Claude"

let response = await anthropic.messages.create({
    model: testModel,
    max_tokens: 512,
    messages: [
        {
            "role": "user",
            "content": promptText,
        }
    ],
});

console.log(response) 
