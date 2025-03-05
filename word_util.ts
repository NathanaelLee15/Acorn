

export function wordStartsWithOneOf(word:string, keys:string[]): boolean {
    let success = false
    for (let key of keys) {
        if (word.startsWith(key)) {
            success = true
            break
        }
    }
    return success
}

export function wordContainsOneOf(word:string, keys:string[]): boolean {
    let success = false
    for (let key of keys) {
        if (word.includes(key)) {
            success = true
            break
        }
    }
    return success
}
