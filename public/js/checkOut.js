function finalizar() {
  info = {
    nome: document.getElementById('nome').value,
    numero: Number(document.getElementById('numero').value),
    validade: Number(document.getElementById('validade').value),
    cvc: Number(document.getElementById('cvc').value),
    idCliente: Number(this.user.idCliente),
    idProduto: Number(this.produto.idProduto),
    idDesenho: Number(this.produto.idEstampa),
    quant: !Number(this.quantidade) ? document.getElementById('quantidade').value : Number(this.quantidade),
    valor: !Number(this.valorTotal) ? this.produto.valor : Number(this.valorTotal)
  }
  const body = JSON.stringify(info)
  fetch('/vendasCamisas', {
        method: "POST",
        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.text())
        .then((textContent) => {
            if (textContent) throw textContent
            reset()
            down()
            msg()
        })
        .catch(err => msg(err))
}

function soma() {
  let quantidade = document.getElementById('quantidade').value
  let valorProduto = this.produto.valor
  let valorTotal = document.getElementById('valor')
  let valor = document.getElementById('valor-total')
  if(Number(quantidade) < 1) {
    this.quantidade = 1
    resultado = parseFloat(Number(this.quantidade) * Number(valorProduto)).toFixed(2)
    this.valorTotal = resultado
    return
  }
  resultado = parseFloat(Number(quantidade) * Number(valorProduto)).toFixed(2)
  this.quantidade = quantidade
  this.valorTotal = resultado
  valorTotal.value = resultado
  valor.innerHTML = resultado
}

function preencheCEP() {
  let localidade = document.querySelector('.localidade')
  let uf = document.querySelector('.uf')
  let logradouro = document.querySelector('.logradouro')
  let bairro = document.querySelector('.bairro')
  fetch(`https://viacep.com.br/ws/${this.user.cep}/json/`, {method: "GET"})
  .then((res) => res.json())
  .then(loc => {
    localidade.innerHTML = loc.localidade
    uf.innerHTML = loc.uf
    logradouro.innerHTML = loc.logradouro
    bairro.innerHTML = loc.bairro
  })
  .catch(err => console.log(err))
}