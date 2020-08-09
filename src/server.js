// Servidor
const express = require('express');
const server = express();

const { pageLanding, pageAbout, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

// Configurar nunjucks (template engine)
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

// Inicio e configuração do servidor
server
//receber os dados do req body
.use(express.urlencoded({extended: true}))
// Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// Rotas da aplicação
.get("/", pageLanding)
.get("/about", pageAbout)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

// start do servidor
.listen(5500);