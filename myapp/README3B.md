# Mustache template engine

## About 

Mustache is a template engine that can be used with express.
[More on express.js.com](http://expressjs.com/en/guide/using-template-engines.html#using-template-engines-with-express)

## Install

1/
```bash
npm i --save mustache-express
```
2/ in index.js: 

const mustacheExpress = require('mustache-express');

3/ app configuration in index.js: 
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

## Creating views 
1/
```bash 
cd myapp 
```
2/ 
```bash 
touch views  
```
3/
```bash 
open index.mustache 
```
4/ creating html template in index.mustache
