var PD = require("probability-distributions");

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

Array.prototype.min = function () {
    return Math.min.apply(null, this);
};

var amostra = [1, 2, 3, 4, 5];

var stdev = function (amostra) {
    var tamanhoAmostra = amostra.length;
    var soma = 0;

    amostra.map(function (amostra) {
        soma += amostra;
    });

    var media = soma / tamanhoAmostra;

    var variancia = 0.0;
    var variancia1 = 0.0;
    var variancia2 = 0.0;

    if (tamanhoAmostra != 1) {
        for (var i = 0; i < tamanhoAmostra; i++) {
            variancia1 = variancia1 + (amostra[i] - media) * (amostra[i] - media);
            variancia2 = variancia2 + (amostra[i] - media);
        }

        variancia2 = variancia2 * variancia2 / tamanhoAmostra;
        variancia = (variancia1 - variancia2) / (tamanhoAmostra - 1);
        if (variancia < 0) { variancia = 0; }
        stddev = Math.sqrt(variancia);
    }

    return {
        media: Math.round(media * 100) / 100,
        variancia: variancia,
        desvioPadrao: Math.round(stddev * 100) / 100
    };
};

var distribuicao = {
    poisson: { identificador: 1 }
    , triangular: { identificador: 2 }
    , uniforme: { identificador: 3 }
    , normal: { identificador: 4 }
}

function obterMelhorDistribuicao(amostra) {
    var amostraCalculada = stdev(amostra), poisson, triangular, uniforme, normal;

    distribuicao.poisson.soma = amostra.reduce(function (numero, unidadeAmostra) {
        return numero += PD.dpois(unidadeAmostra, amostraCalculada.media);
    });

    distribuicao.uniforme.soma = amostra.reduce(function (numero, unidadeAmostra) {
        return numero += PD.dunif(unidadeAmostra, amostra.min(), amostra.max());
    });

    distribuicao.normal.soma = amostra.reduce(function (numero, unidadeAmostra) {
        return numero += PD.dnorm(unidadeAmostra, amostraCalculada.media, amostraCalculada.desvioPadrao)
    });
    var menorDistribuicao = Math.min.apply(null, Object.keys(distribuicao).map(function (nome) { return distribuicao[nome].soma }));

    return obterDistribuicaoComMenorValor(distribuicao)
}

function obterDistribuicaoComMenorValor(distribuicao) {

    var verificaUndefined = function (elemento) { return elemento !== undefined }

    var distribuicaoFiltradaPorValor = Object.keys(distribuicao).map(
        function (nome) {
            return distribuicao[nome].soma
        }).filter(verificaUndefined)
    
    distribuicaoFiltradaPorValorQuiQuadrado = distribuicaoFiltradaPorValor.map(function(distribuicao) {
   //    return PD.rchisq(distribuicao,amostra.length - 1)
    })

    var menorDistribuicao = Math.min.apply(null, distribuicaoFiltradaPorValor);

    var nomeDistribuicao = Object.keys(distribuicao).filter(function (nome) { return distribuicao[nome].soma === menorDistribuicao; })[0]

    return distribuicao[nomeDistribuicao];
}

function gerarNumeroRandomico(melhorDistribuicao) {
    switch (melhorDistribuicao.identificador) {
        case distribuicao.poisson.identificador:
            console.log(melhorDistribuicao)    
            break;
        case distribuicao.triangular.identificador:
            break;
        case distribuicao.uniforme.identificador:
            break;
        case distribuicao.normal.identificador:
            break
    }
}

gerarNumeroRandomico(obterMelhorDistribuicao(amostra))