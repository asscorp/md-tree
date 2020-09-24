// module imports
const fs = require("fs");
const path = require("path");
const klaw = require("klaw");
// custom imports
const { supported } = require('./assets_allowed_extensions.json');
const { buildFolderName } = require('../../config.json');
const templatingEngine = require('./templating');


module.exports = async (template, title, body, route) => {

    const root = path.join(__dirname + "../../../");

    let buildpath = fs.existsSync(path.join(root + "/" + buildFolderName))

    if (buildpath) return console.log(`[md-tree] The buildfolder already exists. Delete it first or specify another name to use.`)
    
    fs.mkdir(path.join(root + "/" + buildFolderName), (err) => {
        if (!err) {
            console.log(`[md-tree] Created build folder    |   ${buildFolderName}`)
            fs.mkdir(path.join(root + "/" + buildFolderName + "/" + "public"), (err) => {
                err ? console.error(err) : console.log("[md-tree] Created public folder")
            })
        } else return console.error(err)
    })


        

    

    const templated = templatingEngine(template, title, body)
    console.log(root)
    let public = "public"
    let rf = `${route}.html`
    let string = root + "/" + buildFolderName + "/" + public + "/" + route;
    fs.open(string, "w+", (err, content) => {
        if (err) console.error(err)
        else {
            fs.writeFileSync(path.join(root + "/" + buildFolderName + "/" + public +  "/" +`${route}.html`),templated, "utf8")
        }
    })
    
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



