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

```bash 
1. cd myapp 
```
 
```bash 
2. touch views  
```

```bash 
3. open index.mustache 
```
```bash 
creating html template in index.mustache
```
## Creating route to render index.mustache file 

```bash 
app.get('/', (req, res) => {
  res.render('index', {})
})
```