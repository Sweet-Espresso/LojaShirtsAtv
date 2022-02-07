const countProdutos = document.querySelector('.btn-car')
const elementosNoCarrinho = document.querySelector('.dropCarrinho')
const headerCloseModal = document.querySelector('.iconClose')

let produtos = !getCarrinho()
? [] : [getCarrinho()]

//Adiciona um array de ids no localStorage
function addCarrinho(id) {
    try {
        let urlCor = !this.urlCor ? 'https://i.ibb.co/nfM4JGr/camisa-branca.png' : this.urlCor
        let cor = !this.cor ? 'Branca' : this.cor
        let valor = !this.valor ? 19.99 : this.valor
        //Só adiciona ao localStorage se a estampa for selecionada, this.urlCor, this.urlEstampa e this.idEstampa estão vindo de home.js dos métodos selectEstampa e selectCor
        if (!this.idEstampa) throw 'Por favor é preciso selecionar a estampa!'
        produtos.push({ idProduto: id, idEstampa: this.idEstampa, urlCor: urlCor, cor: cor, urlEstampa: this.urlEstampa, valor: valor })
        //Transforma array dentro de array em um único array
        array = produtos.reduce((list, sub) => list.concat(sub), [])

        let keys = JSON.stringify(array)
        localStorage.setItem('produto', keys)
        carregarquantidade()
        msg("Operação realizada com sucesso!", 'success')
    } catch (error) {
        msg(error, 'erro')
    }
}

//Consulta no localStorage
function getCarrinho() {
    let items = localStorage.getItem('produto')
    return JSON.parse(items)
}

//Retorna a contagem dos produtos adicionados ao carrinho
function carregarquantidade() {
    countCarrinho = getCarrinho()
    carregarListaCarrinho()
    countProdutos.innerHTML = countCarrinho ? `Carrinho (${countCarrinho.length})` : "Carrinho (0)"
}

//Limpar item do localStorage
function limpar() {
    localStorage.removeItem('produto')
    countProdutos.innerHTML = "Carrinho (0)"
}

//Limpa um item por vez
function limparPorItem(id = 0) {
    let arrayPorIds = getCarrinho() ? getCarrinho() : []
    arrayPorIds.splice(id, 1)

    let keys = JSON.stringify(arrayPorIds)
    !arrayPorIds[0] ? limpar() : localStorage.setItem('produto', keys)
    //Recarrega a página toda vez que o carrinho for totalmente limpo
    !getCarrinho() ? location.reload() : null
    carregarquantidade()
}

//Ativa lista de produto no carrinho carrinho
function dropCar() {
    elementosNoCarrinho
        .style.display = "flex"
    headerCloseModal
        .style.display = "flex"
}

//Desativa lista de produto no carrinho carrinho
function downCar() {
    elementosNoCarrinho
        .style.display = "none"
    headerCloseModal
        .style.display = "none"
}

//Trata elementos para ser renderizados na lista do carrinho
function newCarregarListaCarrinho() {
    let produtosNoCarrinho = getCarrinho() ? getCarrinho().map(a => a.idEstampa) : []
    let keyUnique = [...new Set(produtosNoCarrinho)]
    let newObj = {}
    const newArrayElementosCarrinho = []
    const newValores = []

    keyUnique.map(a => {
        getCarrinho().map((b, i) => {
            while (a === b.idEstampa) {
                const somarQuantidade = newArrayElementosCarrinho.push(a)
                newValores.push(b.valor)
                const somarValores = newValores.reduce((vl, ac) => vl + ac)
                newObj = {
                    idProduto: b.idProduto,
                    idEstampa: b.idEstampa,
                    quant: somarQuantidade,
                    position: i,
                    urlCor: b.urlCor,
                    cor: b.cor,
                    urlEstampa: b.urlEstampa,
                    valor: parseFloat(somarValores.toFixed(2))
                }
                break
            }
        })
    })
    return [newObj]
}

//Responsável por carregar lista carrinho
function carregarListaCarrinho() {
    elementosNoCarrinho.innerHTML = null
    if (getCarrinho()) {
        newCarregarListaCarrinho().map((a, i) => {
            elementosNoCarrinho.innerHTML += `
                <div class="contentCarrinho">
                    <div class="title-carrinho-drop">${a.cor} 
                        <div class="quantCarrinho">${a.quant}</div>
                        <div class="valorCarrinho">${a.valor}</div>
                        <div onclick="limparPorItem(${i})" class="remove-item-carrinho"><i class="fa fa-minus" ></i></div>
                    </div>
                    <ul>
                       <img src="${a.urlCor}" >
                       <img class="drop-car-img-estampa" src="${a.urlEstampa}" >
                    </ul>
                </div>
            `
        })
    } else {
        elementosNoCarrinho.innerHTML += `<div class="carrinhoVazio">Desculpe carrinho vazio</div>` 
    }
}

carregarquantidade()
