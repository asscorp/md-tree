# md-tree

![forthebadge](https://forthebadge.com/images/badges/0-percent-optimized.svg)


Md-tree is a basic server that creates something like a website from a given folder. The folder structure will be used as navigation/routing, so lets say you have the following structure:

~~~
.
├── folder1
|   └── Another.md
└── folder2
    ├── subfolder
    |   ├── subsubfolder
    |   |   └── One.md
    |   └── Bites.md
    ├── The.md
    └── Dust.md
~~~

This will turn into the following routes:

~~~
/folder1/Another
/folder2/subfolder/subsubfolder/One
/folder2/subfolder/Bites
/folder2/The
/folder2/Dust
~~~

## Installation/Setup

**Prerequiries:**

- Node (>= v10) and npm installed

**Installation:**

1. Clone this repository and go into the folder
~~~
git clone https://github.com/MeerBiene/md-tree.git
cd md-tree
~~~
2. Install dependencies. Run `npm install` inside the projects folder
~~~
npm install
~~~
3. Place your content folder inside the projects folder

4. Start the server and pass in the port as well as your content directory. (!) The directory path has to be a **relative path**.
~~~
npm start 3000 ./content
            ^        ^
           port    content directory
~~~

## Config

These are the default values in the config.json. Edit them if needed. If you have a custom template, you need to pass in the foldername of your template.

~~~json
{
    // extension that your markdown files use
    "mdextension": ".md",
    // template that you want to use. Available templates [ "default" ]
    "template": "default",
    // name that the build folder should have
    "buildFolderName": "build"
}
~~~

## TODO/WIP Features

> - Global Navigation

## Used Libraries

This project stands on the shoulders of the following libraries/packages

> - [Express](https://www.npmjs.com/package/express),
> - [Showdown](https://www.npmjs.com/package/showdown),
> - [Klaw](https://www.npmjs.com/package/klaw)

and was heavily inspired by [markdown-tree](https://github.com/mil/markdown-tree/) ... its basically the same but in javascript ... honestly i never tested markdown tree i just liked the idea