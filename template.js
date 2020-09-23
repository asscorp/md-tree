// takes in body and places it in html
// template string, returns said template
// string
const templateString = (title, body) => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
        <div style="margin-left: 18vw; margin-right: 18vw; padding: 2vw;">
        ${body}
        </div>
    </body>
    </html>`

};

module.exports = { templateString }