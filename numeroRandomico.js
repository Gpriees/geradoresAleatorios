const jStat = require('jStat').jStat;

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

let experimentoCalculado = {
    dados: experimento
    , media: jStat.mean(experimento)
    , variancia: jStat.variance(experimento)
    , desvioPadrao: jStat.stdev(experimento)
    , maiorValor: jStat.max(experimento)
    , menorValor: jStat.min(experimento)
    , valorMaisFrequente: jStat.mode(experimento)[0]
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

let calculaQuiQuadrado = (amostra) => {
    let quiQuadrado = 0;
    for (var index = 0; index < amostra.length; index++) {
        quiQuadrado += Math.pow((amostra[index].observado - amostra[index].esperado), 2) / amostra[index].esperado
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

let obterAmostraCalculadaPorDistribuicao = (distribuicaoEscolhida, experimento) => {

    amostra = {
        dados: []
    }

    for (var index = 0; index < experimento.dados.length; index++) {
        amostra.dados.push({
            valor: experimento.dados[index],
            observado: obterDadosFuncaoDensidadeProbabilidade(experimento, experimento.dados[index], distribuicaoEscolhida.identificador),
            esperado: 1 / experimento.dados.length,
        })
    }
    amostra.distribuicaoId = distribuicaoEscolhida.identificador;

    amostra.quiQuadrado = calculaQuiQuadrado(amostra.dados);

    return amostra;
}

let obterMelhorDistribuicao = (distribuicoes) => {

    let menorQuiQuadrado = jStat.min(distribuicoes.map(distribuicao => distribuicao.quiQuadrado))

    return distribuicoes.filter(dado => dado.quiQuadrado === menorQuiQuadrado)[0]

}

let gerarNumeroRandomico = () => {

    const poisson = obterAmostraCalculadaPorDistribuicao(distribuicao.poisson, experimentoCalculado)
        , triangular = obterAmostraCalculadaPorDistribuicao(distribuicao.triangular, experimentoCalculado)
        , uniforme = obterAmostraCalculadaPorDistribuicao(distribuicao.uniforme, experimentoCalculado)
        , normal = obterAmostraCalculadaPorDistribuicao(distribuicao.normal, experimentoCalculado);

    let melhorDistribuicao = obterMelhorDistribuicao([poisson, triangular, uniforme, normal]);

    let valorExperimento = Math.floor(Math.random() * 100) + 1;
    switch (melhorDistribuicao.distribuicaoId) {
        case distribuicao.poisson.identificador:
            return jStat.poisson.pdf(valorExperimento, experimentoCalculado.media);
        case distribuicao.triangular.identificador:
            return jStat.triangular.pdf(valorExperimento, experimentoCalculado.menorValor, experimentoCalculado.maiorValor, experimentoCalculado.valorMaisFrequente);
        case distribuicao.uniforme.identificador:
            return jStat.uniform.pdf(valorExperimento, experimentoCalculado.menorValor, experimento.maiorValor);
        case distribuicao.normal.identificador:
            return jStat.normal.pdf(valorExperimento, experimentoCalculado.media, experimentoCalculado.desvioPadrao);
    }
}

console.log(gerarNumeroRandomico())