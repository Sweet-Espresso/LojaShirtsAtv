
module.exports = validate => {
    //existe gera um erro
    function existsOrError(value, msg) {
        if (!value) throw msg//se não existir
        if (Array.isArray(value) && value.length === 0) throw msg//Se retornar um array vasio
        if (typeof value === 'string' && !value.trim()) throw msg//se a string for vasia
    }

    //se não existir está ok caso exista gera um erro 
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    //se for igual não dar erro
    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    async function existsOrErrorCEP(value, msg) {
      if(value.length !== 8) throw msg
      try{
        console.log(value)
        const url = `https://viacep.com.br/ws/${value}/json/`
        const dados = await fetch(url, {method: "GET"})
        const endereco = await dados.json()
        if(endereco.hasOwnProperty('erro')) {
          throw msg
        }
      } catch (msg) {
          throw msg
        }
    }
    return { existsOrError, notExistsOrError, equalsOrError, existsOrErrorCEP }
}