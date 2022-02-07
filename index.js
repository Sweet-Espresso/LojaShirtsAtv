const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const connection = require('./mysqlFile')
const db = require('mysql').createPool(connection)

//Validações
const validate = require('./validation')

app.use(express.json())
app.use('/public', express.static('public'))
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main', extname: 'hbs'
}))

app.set('view engine', '.hbs')

app.get('/', (req, res) => {
  db.query('SELECT * FROM estoqueShirts', (error, produtos) => {
    if (error) return res.status(500).send(error.sqlMessage)
    db.query('SELECT * FROM desenhoCamisa', (error, estampas) => {
      if (error) return res.status(500).send(error.sqlMessage)
      // console.log(produtos, estampas)
      return res.status(200).render('home', { produtos, estampas })
    })
  })
})

app.post('/vendasCamisas', (req, res) => {
  const info = { ...req.body }
  try {
    validate().existsOrError(info.nome, 'Nome não informado!')
    validate().existsOrError(info.numero, 'Número do cartão não informado!')
    validate().existsOrError(info.validade, 'Data de validade não informada!')
    validate().existsOrError(info.cvc, 'CVC não informado!')
    db.query(`INSERT INTO vendasCamisas (idCliente, idProduto, idDesenho, quant, valor) 
    VALUES (${info.idCliente}, ${info.idProduto}, ${info.idDesenho}, ${info.quant}, ${info.valor})`, (error) => {
      if (error) return res.status(500).send(error.sqlMessage)
      res.status(200).send()
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

//Adicionar clientes
app.post('/clientes', (req, res) => {
  const cliente = { ...req.body }
  try {
    validate().existsOrError(cliente.nome, 'Nome não informado')
    validate().existsOrError(cliente.email, 'Email não informado')
    validate().existsOrError(cliente.password, 'Senha não informada')
    validate().equalsOrError(cliente.password, cliente.repitPassword, 'Senhas não conferem!')
    validate().existsOrError(cliente.cep, 'CEP não informado')
    validate().existsOrError(cliente.cpf, 'CPF não informado')
    //validate().existsOrErrorCEP(cliente.cep, 'CEP inválido')
    //validate().existsOrErrorComprovantes(cliente.cpf, 'CPF inválido', 11)
    db.query(`SELECT * FROM clienteShirts
      WHERE emailCliente = '${cliente.email}'`, (error, email) => {
      if (error) return res.status(500).send(error.sqlMessage)
      if (email[0]) return res.status(400).send('Email já cadastrado')
      db.query(`INSERT INTO clienteShirts (nomeCliente, emailCliente, senha, cep, cpf) 
      VALUES ('${cliente.nome}','${cliente.email}', '${cliente.password}', '${cliente.cep}', '${cliente.cpf}')`, (error) => {
        if (error) return res.status(500).send(error.sqlMessage)
        res.status(200).send()
      })
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/signins', (req, res) => {
  try {
    if (!req.body.email || !req.body.password) throw { error: 'Email ou senha não informado!' }
    db.query(`SELECT idCliente, nomeCliente, emailCliente, cpf, cep FROM clienteShirts
    WHERE emailCliente = '${req.body.email}'
    AND senha = ${req.body.password}`, (error, cliente) => {
      if (error) return res.status(500).json({ error: error.sqlMessage })
      if (!cliente[0]) return res.status(400).json({ error: 'Email ou senha inválido!' })
      res.status(200).json(cliente)
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

/*this.db = {}
app.get('/', (req, res) => {
  db.query(`SELECT * FROM desenhoCamisa`, (error, results) => {
    if (error) return res.status(500).send(error)
    this.db['desenhoCamisa'] = results
  })
  db.query(`SELECT * FROM estoqueShirts`, (error, results) => {
    if (error) return res.status(500).send(error)
    this.db['estoqueShirts'] = results
  })
  {
    desenhoCamisa: [{}, {}],
    estoqueShirts: [{}, {}]
  }
  res.status(200).render('home', this.db)
})*/

app.get('/checkout', (req, res) => {
  res.status(200).json()
})

app.listen(3000, () => {
  console.log("Backend executando...")
})