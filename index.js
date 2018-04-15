const types = {
    string: "string",
    number: "number",
    null: "null",
    undefined: "undefined",
    object: "object"
}

//This is just a sketch, its still under development
//const client = Redis.Client...

//FUNCTION STORE

function _(hmsetId, object) {
    const keys = object.keys()
    keys.forEach(key => {
        const property = object[key]
        switch (typeof property) {
            case types.string, types.number, types.null, types.undefined:
                client.hset(hmsetId, key, property)
                break
            case types.object:
                //TODO: if(Array.isArray(property) --> set flag to attach arr proto when reading
                const nestedHmsetId = `${hmsetId}.${key}`
                client.hset(hhmsetId, key, nestedHmsetId)
                _(nestedHmSetId, property)
                break
            default:
                client.hset(hmsetId, key, JSON.Stringify(property))
        }
    })
}

//FUNCTION READ

function __(hmSetId, includeChildren) {
    client.hgetAll(hmSetId, (err, reply) => {
        err && console.log(err) //handle err
        const keys = Object.keys(reply)
        const ___ = keys.map(key => (
            reply[key].includes(`${hmSetId}.`)
                ? __(key, includeChildren)
                : reply[key]
        ))
    })
}

