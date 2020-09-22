# md-tree

![forthebadge](https://forthebadge.com/images/badges/0-percent-optimized.svg)


Md-tree is a basic server that creates something like a website from a given folder. The folder structure will be used as navigation/routing, so lets say you have the following structure:

~~~
.
├── folder1
|   └── FirstPage.md
|
└── folder2
    ├── SecondPage.md
    └── ThirdPage.md
~~~

This will turn into the following routes:

~~~
/folder1/FirstPage
/folder2/SecondPage
/folder2/ThirdPage
~~~

## TODO/WIP Features:

> - Global Navigation

## Used Libraries

This project stands on the shoulders of the following libraries/packages

> - [Express](https://www.npmjs.com/package/express),
> - [Showdown](https://www.npmjs.com/package/showdown),
> - [Klaw](https://www.npmjs.com/package/klaw)

and was heavily inspired by [markdown-tree](https://github.com/mil/markdown-tree/) ... its basically the same but in javascript ... honestly i never tested markdown tree i just liked the idea