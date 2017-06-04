var PD = require("probability-distributions");

const amostra = [1, 2, 3.9, 4, 5.13];

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
        media: (media * 100) / 100,
        variancia: variancia,
        desvioPadrao: (stddev * 100) / 100
    };
};

var distribuicao = {
    poisson: 0
    , triangular: 1
    , uniforme: 2
    , normal: 3
}

function definirMelhorDistribuicao(distribuicao) {

}

function gerarNumeroRandomico(distribuicao) {

    switch (distribuicao) {
        case distribuicao.poisson:
            PD.dpois(x, )
            break;
        case distribuicao.triangular:
            break;
        case distribuicao.uniforme:
            PD.runif(100);
            break;
        case distribuicao.normal:
            PD.lnorm(10);
            break
    }

}