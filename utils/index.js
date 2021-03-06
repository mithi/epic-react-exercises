import fs from "fs"
import path from "path"

const CONTENT_DIRECTORY = path.join(process.cwd(), "content")

/*
**************
directory structure
**************
content
    |-topic
        |-section
            |-1
            |   |- notes.md
            |   |- app.js
            |-2
            |   |- notes.md
            |   |- app.js
            |-3
            | ....

**************
return value structure
**************
{
    sectionName: { numberOfPages, properties: {title, repository, deployedApp} },
    sectionName2: { numberOfPages, properties: {title, repository, deployedApp} }
    sectionName3: ...

}
 */
export function sectionProperties(topic) {
    const sections = fs.readdirSync(path.join(CONTENT_DIRECTORY, topic))
    let result = {}

    for (let section of sections) {
        const sectionDir = path.join(CONTENT_DIRECTORY, topic, section)
        const propertiesContent = fs.readFileSync(
            path.join(sectionDir, "properties.json"),
            "utf8"
        )

        const numberOfPages = fs
            .readdirSync(sectionDir, { withFileTypes: true })
            .filter(f => f.isDirectory()).length

        result = {
            ...result,
            [section]: {
                numberOfPages,
                properties: JSON.parse(propertiesContent),
            },
        }
    }

    return result
}

export function pageContents(topic, section, pageId) {
    const directory = path.join(CONTENT_DIRECTORY, topic, section, pageId.toString())

    const files = fs.readdirSync(directory)
    const hasApp = files.includes("app.js") ? true : false

    let notesString = "No note"

    try {
        if (files.includes("notes.md")) {
            notesString = fs.readFileSync(path.join(directory, "notes.md"), "utf8")
        }
    } catch (error) {
        console.log(`Error reading note.md in ${directory}`)
    }

    return { notesString, hasApp }
}
