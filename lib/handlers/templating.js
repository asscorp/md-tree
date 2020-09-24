const fs = require("fs");
const path = require("path");
const titlevar = "%%title%%"
const bodyvar = "%%body%%"

module.exports = (template, title, body) => {
    let content = fs.readFileSync(path.join(__dirname + "/../" + "/templates/" + template + "/" +  "index.html"))
    if (content.toString().indexOf(titlevar) === -1) return
    if (content.toString().indexOf(bodyvar) === -1) return
    content = content.toString().replace(titlevar, title)
    content = content.toString().replace(bodyvar, body)
    return content;
}
