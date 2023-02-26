const express = require('express')
const app = express()
app.set('view engine', 'ejs')
//caminhos de pasta
const path = require('path')


//rotas
//MVC - MODEL VIEW CONTROLLER
//MODEL = TODO QUE VAI LIGAR COM O DB
//ViEW = HTML
//CONTROLLER = GERENCIAR OS DADOS 
//arquivos estáticos e publicos|| estaticos = arquivo.html

//mostrar o caminho dos arquivos html
const StaticFolder = path.join(__dirname, 'views')
//mostrar os arquivos
const expressStatic = express.static(StaticFolder)
//app usa o expressStatic
app.use(expressStatic)





//pasta publica/ no caso arquivos/ sem isso o js e o css não funciona
//olha no html
const publicFolder = path.join(__dirname, 'public')
const expressPublic = express.static(publicFolder)
app.use(expressPublic)




//views
app.get('/', (request, response) => {
    //renderizar o html
    response.render('index', {
        //olha o head.js!
        title: 'inicio'
    })
} )

app.get('/post', (request, response) => {
    //renderizar o html
    response.render('posts', {
        title: 'post'

    })
} )

app.get('/sobre', (request, response) => {
    response.send('Teste rota sobre')
} )
//direcionar para algum erro
app.use((request, response) => {
    response.send('Pagina não encontrada')
})

//qual porta que ele quer rodar
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Servidor ligado na porta ${port}`))