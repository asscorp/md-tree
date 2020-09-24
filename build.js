const fs = require("fs");
const klaw = require("klaw");
const templatingEngine = require('./lib/handlers/templating')

const buildFolderName = "build"

module.exports = async (template, title, body, route) => {

    let buildpath = fs.existsSync(__dirname + "/" + buildFolderName)

    if (buildpath) return console.log(`[md-tree] The buildfolder already exists. Delete it first or specify another name to use.`)
    
    fs.mkdir(buildFolderName, (err) => {
        if (!err) {
            console.log(`[md-tree] Created build folder    |   ${buildFolderName}`)
            fs.mkdir(__dirname + `/${buildFolderName}/public`, (err) => {
                err ? console.error(err) : console.log("[md-tree] Created public folder")
            })
        } else return console.error(err)
    })


        

    

    const templated = templatingEngine(template, title, body)
    console.log(templated)
    
    fs.writeFileSync(__dirname + `/${buildFolderName}/public/${route}.html`, templated, 'utf8')
        console.log(`[md-tree] Generated & saved    |   ${route}.html`)
    

    let items = [];

    let assets = fs.existsSync(`./lib/templates/${template}/assets`)

    if (assets) {
        klaw(`./lib/templates/${template}/assets`)
        .on('data', (item) => {
            items.push(item.path)
        })
        .on('end', () => {
            console.log(items)
        })
        .on('error', (err) => {
            console.error(err)
        })
    }

}



