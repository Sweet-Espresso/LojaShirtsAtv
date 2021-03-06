var bodyDrop = document.querySelector('.drop')
function drop(prod, a) {
  bodyDrop.style.display = 'flex'
  bodyDrop.innerHTML = null
  if(a === 'entrar') {
    bodyDrop.innerHTML += `
  <div class="container-form">
          <a class="iconCloseLoginOrCad" onclick="down()"><i class="fa fa-window-close"></i></a>
    <div class="form-login-or-cad">
    <div class="cad row mt-2 mb-2 w-75">
        <input class="nome form-control" placeholder="Nome" type="text" id="nome" />
    </div>
    <div class="login row mb-2 w-75">
        <input class="form-control" placeholder="E-mail" type="email" id="email" />
    </div>
    <div class="login row mb-2 w-75">
        <input class="form-control" placeholder="Senha" type="password" id="password" />
    </div>
    <div class="cad row mb-2 w-75">
        <input class="form-control" placeholder="Repetir senha" type="password" id="repit-password" />
    </div>
    <div class="cad row mb-2 w-75">
        <input class="form-control" placeholder="CPF" onkeyup="apenasNumeros('cpf')" maxlength="11" type="text" id="cpf" />
    </div>
    <div class="cad row mb-2 w-75">
        <input class="form-control" placeholder="CEP" maxlength="11" type="text" onkeyup="apenasNumeros('cep')" id="cep" />
    </div>
    <div class="row mb-2 w-75">
        <button class="btn-login-or-cad btn btn-primary btn-block" onclick="signinOrCad()" id="login-or-cad"></button>
    </div>
    <div class="mb-2 w-75">
        <a class="a-login-or-cad" onclick="metodoCadOrLogin()" id="cad-button">Criar Conta</a>
    </div>
</div>
</div>`
 signOut()
 metodoCadOrLogin()
  } else {if (a === 'dropCheckOut') {
    bodyDrop.innerHTML = `<div class="containerCheckout">
    <a class="iconCloseLoginOrCad" onclick="down()"><i class="fa fa-window-close"></i></a>
    <div class="contentCheckOut">
        <div class="parte-checkout">
            <div class="camisa-checkout">
                <img class="img-camisa-checkout" src="${this.produto.urlCor}" >
                <img class="img-estampa-checkout" src="${this.produto.urlEstampa}" >
            </div>
            <div class="input-quant-valor">
                <span>Quantidade </span>
                <input class="form-control mb-2 ml-2 w-50" onkeyup="soma()" value="${this.produto.quant}" type="text" id="quantidade">
                <input class="form-control" type="hidden" id="valor" value="">
                <div class="valor-checkout" type="text" id="valor-total">19.99</div>
            </div>
        </div>
        <div class="parte-checkout">
            <div class="endereco-entrega">
                <h1>Endere??o de entrega</h1>
                <div>
                    <span class="localidade"></span> - <span class="uf"></span>
                </div>
                <div>
                    <span class="logradouro"></span> - <span class="bairro"></span>
                </div>
            </div>
        </div>
        <div class="parte-checkout">
            <div class="cartao-credito">
                Nome: <input class="form-control mb-2" id="nome">
                N??mero do Cart??o: <input class="form-control mb-2" maxlength="16" id="numero" >
                <div class="row">
                    <div class="col-6">
                        Data de Validade: <input class="form-control mb-2 w-100" maxlength="5" id="validade">
                    </div>
                    <div class="col-6">
                        CVC: <input class="form-control mb-2 w-50" maxlength="3" id="cvc">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary mt-2" onclick="finalizar()">Finalizar</button>
</div>
`
preencheCEP()
    }
  }
}
function down() {
  this.mode = 'login'
  bodyDrop.style.display = 'none'
  reset()
}