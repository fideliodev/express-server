const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
app.set('view engine', 'ejs')
//caminhos de pasta



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


//habilita o sv receber dados de um form
app.use(express.urlencoded({extends: true}))


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
        title: 'post',
        posts: [{
            title: 'Novidade por agora',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsam veniam nam, necessitatibus quas voluptatum fuga aliquam error aperiam autem. Fugit sapiente assumenda, id at eveniet deleniti? Dolor, eveniet provident.',
            stars: 3
        },
    
        {
            title: '10 dicas para programação',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsam veniam nam, necessitatibus quas voluptatum fuga aliquam error aperiam autem. Fugit sapiente assumenda, id at eveniet deleniti? Dolor, eveniet provident.',
        },

        {
            title: 'Javascript?!',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsam veniam nam, necessitatibus quas voluptatum fuga aliquam error aperiam autem. Fugit sapiente assumenda, id at eveniet deleniti? Dolor, eveniet provident.',
            stars: 2
        },

    ]

    })
} )

app.get('/cadastro', (request, response) => {
    const {c} = request.query
    //renderizar o html
    response.render('cadastro', {
        //olha o head.js!
        title: 'cadastrar-se',
        cadastrado: c,
    })
} )

app.post('/salvar-post', (request, response) => {
   
    //campo dos form
    const{titulo, texto} = request.body
const data = fs.readFileSync('./store/posts.json')
const posts = JSON.parse(data)

posts.push({
    titulo,
    texto,
})

const postsString = JSON.stringify(posts)
fs.writeFileSync('./store/posts.json', postsString)
    response.redirect('/cadastro?c=1')
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