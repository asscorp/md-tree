/**
 * @fileoverview
 * 
 * Arguments:
 * 1: PORT => Number
 * 2: CONTENTDIRECTORY => Pathstring like ./dir or ./var
 * 
 * Usage:
 * node md-tree.js PORT CONTENTDIRECTORY
 * 
 * Example
 * node md-tree.js 3000 ./content
 * npm start 3000 ./content
 */

const fs = require("fs");
const klaw = require("klaw");
const express = require('express');
const showdown = require('showdown');
const converter = new showdown.Converter()

const { mdextension } = require("./config.json")

// Express App configuration
const app = new express()
app.use(express.json())
// End Express App Configuration

const PORT = process.argv[2] || 3000
const directoryToExplore = process.argv[3] || "content"

const main = () => {
    /**
     * Use this map to set the sanitized
     * path and file in relation to the 
     * real path in order to find the path
     * by file (for routing)
     * 
     * Example:
     * '/testcontent/page2/start/first.md' => 'C:\\Users\\SomeUser\\.....'
     */
    
    let sanitized = new Map();
    let items = [];

    klaw(directoryToExplore)
        .on('data', function (item) {
            items.push(item.path)
        })
        .on('end', function () {
            for (let index in items) {
                if (items[index].includes(mdextension)) {
                    sanitized.set(items[index].replace(__dirname, ""), items[index])
                }
            }

            const index = sanitized.keys()

            for (let i = 0; i < sanitized.size; i++) {
                const key = index.next().value
                const value = sanitized.get(key)
                const rawRarsedURI = key.split('\\')
                let removedwhitespaces = []
                for (let index in rawRarsedURI) {
                    // make sure the array element is not empty
                    if (rawRarsedURI[index] !== '') removedwhitespaces.push(rawRarsedURI[index].replace(".md", ""))
                }

                let parsedURI = removedwhitespaces.join('/')
                parsedURI.startsWith("/") ? parsedURI = parsedURI.replace("/", "") : null;
                console.log(`Registering the route |  ${parsedURI}`)

                
                app.get("/" + parsedURI, (req, res) => {
                    // create a writestream to the desired file
                    const readStream = fs.createReadStream(value);
                    const data = [];
                    // push the incoming chunks of data into the data array
                    readStream.on('data', (chunk) => {
                        data.push(chunk);
                    });
                    // on end, create a Buffer from the data array
                    readStream.on('end', async () => {
                        const markdowntoparse = Buffer.concat(data).toString()
                        const converted = converter.makeHtml(markdowntoparse)
                        res
                            .status(200)
                            .header("Content-Type", "text/html; charset=UTF-8")
                            .send(Buffer.from(converted));
                    })
                    readStream.on('error', (err) => {
                        console.error('error :', err)
                        // send error to user
                        res
                            .status(501)
                            .send("There was an error trying to read your markdown file:" + value + "Check if the file is corrupt")
                    })
                })
            }
            app.listen(PORT, () => {
                console.log(`Started the server on port ${PORT}`)
            })
        })
        .on('error', function (err, item) {
            console.log(err.message)
            console.log(item.path) // the file the error occurred on
        })
}

main()