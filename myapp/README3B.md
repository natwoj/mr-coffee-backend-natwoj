# Mustache template engine - implementation to the project 

## About 

Mustache is a template engine that can be used with express.
[More on express.js.com](http://expressjs.com/en/guide/using-template-engines.html#using-template-engines-with-express)

## Install


```bash
1. npm i --save mustache-express
```

/ In index.js: 
```bash
2. const mustacheExpress = require('mustache-express');
```

/ App configuration in index.js: 
```bash
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());
```

## Creating views 

```bash 
1. cd myapp 
```
 
```bash 
2. mkdir views  
```

```bash 
3. touch index.mustache  
open index.mustache 
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
