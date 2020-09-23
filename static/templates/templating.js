const fs = require("fs");
const titlevar = "%%TITLE%%"
const bodyvar = "%%BODY%%"

module.exports = (path, title, body) => {
    let content = fs.readFileSync(path)
    if (content.toString().indexOf(titlevar) === -1) return
    if (content.toString().indexOf(bodyvar) === -1) return
    content = content.replace(titlevar, title)
    content = content.replace(bodyvar, body)
    return content;
}
