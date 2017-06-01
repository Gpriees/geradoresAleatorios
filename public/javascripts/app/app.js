(function (global, angular) {

    if (!global.APP) {
        global.APP = {};
    }

    global.APP = angular.module('app', ["ngMaterial"])

        .controller('AppController', AppController)

    AppController.$inject = ['$scope', '$http'];

    function AppController($scope, $http) {

        var appViewModel = this;



        $http.get('https://www.random.org/integers/?num=10&min=0&max=100&col=1&base=10&format=plain&rnd=new')
            .then(function (resposta) {
                appViewModel.semente = resposta.data.trim().replace(/^|\s/g, '') % 100 + 1
            })

        

        function quadradoDoMeio() {
            console.log('semente = ', appViewModel.semente);
            console.log('-----');

            x1 = appViewModel.semente;

            for (i = 0; i < 500; i++) {
                x1 = (x1 * x1);

                y = "" + x1;


                if (x1 === 0 || x1 === 1) {
                    x1 = x1 + appViewModel.semente;
                }
                else if (y.length === 3 || y.length === 4) {
                    res = y.slice(1, 3);
                    if (x1 === (res * res)) {
                        res++;
                        x1 = res;
                    }
                    else {x1 = res; }
                }
                else {

                }

                console.log(x1);
            }
            console.log('-----');
        }

        function congruenteLinearPotencias() { // Xn = a^n % m
            a = Math.E;
            m = 100;
            console.log('semente = ', appViewModel.semente);
            console.log('A = ', a);
            console.log('M = ', m);
            console.log('-----');

            x1 = appViewModel.semente;

            for (i = 0; i < 500; i++) {
                x1 = (Math.pow(a, x1) % m);
                x1 = x1+1;
                console.log(parseInt(x1, 10));
            }
            console.log('-----');

        }

        function congruenteLinearAdaptado() { // Xn+1 = (a*Xn +b) % m
            a = Math.E;
            b = 1234;
            m = 100;
            console.log('semente = ', appViewModel.semente);
            console.log('A = ', a);
            console.log('B = ', b);
            console.log('M = ', m);
            console.log('-----');

            x1 = appViewModel.semente;

            for (i = 0; i < 500; i++) {
                x1 = (((a * x1) + b) % m);
                x1 = x1 - 1;
                console.log(parseInt(x1, 10));
            }
            console.log('-----');
        }

        function congruenteLinearMultiplicativo() { // Xn+1 = (a*Xn) % m
            a = Math.E;
            m = 100;
            console.log('appViewModel.semente = ', appViewModel.semente);
            console.log('A = ', a);
            console.log('M = ', m);
            console.log('-----');

            x1 = appViewModel.semente;

            for (i = 0; i < 500; i++) {
                x1 = ((a * x1) % m);
                x1 = x1 + 1;
                console.log(parseInt(x1, 10));
            }
            console.log('-----');
        }

        function geradorAtrasodeFibonacci() { // Xn = Xn-i operação Xn-j

        }

        function vincularMetodosAInterface() {
            appViewModel.quadradoDoMeio = quadradoDoMeio;
            appViewModel.congruenteLinearPotencias = congruenteLinearPotencias;
            appViewModel.congruenteLinearAdaptado = congruenteLinearAdaptado;
            appViewModel.congruenteLinearMultiplicativo = congruenteLinearMultiplicativo;
        }

        vincularMetodosAInterface();
    }

})(window, angular);