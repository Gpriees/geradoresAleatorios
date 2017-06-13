const jStat = require('jStat').jStat,
    PD = require('probability-distributions')
const experimento = [89, 95, 5, 37, 82, 98, 63, 76, 11, 8, 64,
    81, 13, 22, 76, 81, 13, 54, 59, 72, 11,
    54, 90, 69, 52, 38, 69, 72, 97, 26, 75,
    50, 13, 20, 98, 90, 33, 10, 46, 22, 81,
    100, 77, 46, 93, 55, 61, 94, 34, 13, 35,
    88, 61, 65, 17, 4, 79, 30, 91, 23, 31,
    66, 22, 73, 92, 67, 19, 64, 64, 89, 87,
    74, 40, 32, 100, 22, 65, 74, 18, 63, 41,
    23, 67, 99, 91, 12, 90, 48, 90, 29, 3,
    9, 76, 95, 68, 63, 4, 58, 37, 38].map(amostra => Math.round(amostra))

let buscaFrequencia = (lista) => {
    let frequencia = {};

    for (let index = 0; index < lista.length; index++) {
        let numeroEncontrado = lista[index];
        frequencia[numeroEncontrado] = frequencia[numeroEncontrado] ? frequencia[numeroEncontrado] + 1 : 1;
    }
    return frequencia;
}

let experimentoCalculado = {
    media: jStat.mean(experimento)
    , variancia: jStat.variance(experimento)
    , desvioPadrao: jStat.stdev(experimento)
    , maiorValor: jStat.max(experimento)
    , menorValor: jStat.min(experimento)
    , valorMaisFrequente: jStat.mean(jStat.mode(experimento))
    , frequencias: buscaFrequencia(experimento)
}

let distribuicao = {
    poisson: {
        identificador: 1
    }
    , triangular: {
        identificador: 2
    }
    , uniforme: {
        identificador: 3
    }
    , normal: {
        identificador: 4
    }
}

let calculaQuiQuadrado = (distribuicao) => {
    let quiQuadrado = 0;

    for (var index = 0; index < distribuicao.dados.length; index++) {
        quiQuadrado += Math.pow((distribuicao.dados[index].observado - distribuicao.dados[index].esperado), 2) / distribuicao.dados[index].esperado
    }

    return quiQuadrado
}

let obterDadosFuncaoDensidadeProbabilidade = (experimento, valorExperimento, distribuicaoEscolhida) => {
    switch (distribuicaoEscolhida) {
        case distribuicao.poisson.identificador:
            return jStat.poisson.pdf(valorExperimento, experimento.media);
        case distribuicao.triangular.identificador:
            return jStat.triangular.pdf(valorExperimento, experimento.menorValor, experimento.maiorValor, experimento.valorMaisFrequente);
        case distribuicao.uniforme.identificador:
            return jStat.uniform.pdf(valorExperimento, experimento.menorValor, experimento.maiorValor);
        case distribuicao.normal.identificador:
            return jStat.normal.pdf(valorExperimento, experimento.media, experimento.desvioPadrao);
    }
};

let montarDadosQuiQuadradoPorDistribuicao = (distribuicaoEscolhida) => {

    dados = [];

    for (valorObservado in experimento) {
        dados.push({
            valorBruto: Number(valorObservado)
            , esperado: obterDadosFuncaoDensidadeProbabilidade(experimentoCalculado, Number(valorObservado), distribuicaoEscolhida.identificador)
            , observado: experimentoCalculado.frequencias[valorObservado] === undefined ? 0 : experimentoCalculado.frequencias[valorObservado] / experimento.length
        })
    }

    return {
        dados: dados,
        distribuicaoId: distribuicaoEscolhida.identificador
    };
}

let obterMelhorDistribuicao = (distribuicoes) => {

    for (var index = 0; index < distribuicoes.length; index++) {
        distribuicoes[index].quiQuadrado = calculaQuiQuadrado(distribuicoes[index]);
    }

    let menorQuiQuadrado = jStat.min(distribuicoes.map(distribuicao => distribuicao.quiQuadrado))

    return distribuicoes.filter(dado => dado.quiQuadrado === menorQuiQuadrado)[0]

}

let gerarNumeroRandomico = () => {

    let poisson = montarDadosQuiQuadradoPorDistribuicao(distribuicao.poisson, experimentoCalculado)
        , triangular = montarDadosQuiQuadradoPorDistribuicao(distribuicao.triangular, experimentoCalculado)
        , uniforme = montarDadosQuiQuadradoPorDistribuicao(distribuicao.uniforme, experimentoCalculado)
        , normal = montarDadosQuiQuadradoPorDistribuicao(distribuicao.normal, experimentoCalculado);

    let melhorDistribuicao = obterMelhorDistribuicao([poisson, triangular, uniforme, normal]);

    let valorExperimento = Math.floor(Math.random() * 100) + 1;
    switch (melhorDistribuicao.distribuicaoId) {
        case distribuicao.poisson.identificador:
            return Math.floor(PD.rpois(1, experimentoCalculado.variancia)[0])
        case distribuicao.triangular.identificador:
            return jStat.triangular.pdf(valorExperimento, experimentoCalculado.menorValor, experimentoCalculado.maiorValor, experimentoCalculado.valorMaisFrequente);
        case distribuicao.uniforme.identificador:
            return Math.floor(PD.runif(1, 1, 100)[0])
        case distribuicao.normal.identificador:
            return Math.floor(PD.rnorm(1, experimentoCalculado.media, experimentoCalculado.desvioPadrao))
    }
}

console.log(gerarNumeroRandomico())