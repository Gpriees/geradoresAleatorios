(function (global, angular) {

    if (!global.APP) {
        global.APP = {};
    }

    global.APP = angular.module('app', ["ngMaterial"])

        .controller('AppController', AppController)

    AppController.$inject = ['$scope', '$http'];

    function AppController($scope, $http) {

        var appViewModel = this;

        var posX,
            posY; 

        $http.get('https://www.random.org/integers/?num=10&min=0&max=100&col=1&base=10&format=plain&rnd=new')
            .then(function (resposta) {
                appViewModel.semente = resposta.data.trim().replace(/^|\s/g, '') % 100 + 1;               
            
            })
        
        document.querySelector('body').addEventListener('mousemove', function(event) {
            posX = event.clientX,
            posY = event.clientY;            
        });

        setTimeout(function(){appViewModel.semente = (posX*posY)%100;},2000);
        

        function quadradoDoMeio() {
            console.log('semente = ', appViewModel.semente);
            console.log('-----');
            
            $scope.arrayResultadoQuadradoDoMeio = "";

            x1 = appViewModel.semente;

            for (i = 0; i < 1500; i++) {
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

                $scope.arrayResultadoQuadradoDoMeio = $scope.arrayResultadoQuadradoDoMeio+'\r\n' + x1;
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
            
            $scope.arrayResultadoCongruenteLinearBaseadoEmPotencias = "";

            x1 = appViewModel.semente;

            for (i = 0; i < 1500; i++) {
                x1 = (Math.pow(a, x1) % m);
                x1 = x1+1;
                $scope.arrayResultadoCongruenteLinearBaseadoEmPotencias = $scope.arrayResultadoCongruenteLinearBaseadoEmPotencias+'\r\n' + parseInt(x1, 10);
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
            
            $scope.arrayCongruenteLinearAdaptado = "";

            x1 = appViewModel.semente;

            for (i = 0; i < 1500; i++) {
                x1 = (((a * x1) + b) % m);
                x1 = x1 - 1;
                $scope.arrayCongruenteLinearAdaptado = $scope.arrayCongruenteLinearAdaptado+'\r\n' + parseInt(x1, 10);
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
            
            $scope.arrayCongruenteLinearMultiplicativo = "";

            x1 = appViewModel.semente;

            for (i = 0; i < 1500; i++) {
                x1 = ((a * x1) % m);
                x1 = x1 + 1;
                $scope.arrayCongruenteLinearMultiplicativo = $scope.arrayCongruenteLinearMultiplicativo+'\r\n' + parseInt(x1, 10);
            }
            console.log('-----');
        }

        function geradorAtrasodeFibonacci() { // Xn = Xn-i operação Xn-j
            i = 2401;
            j = Math.PI;
            console.log('semente = ', appViewModel.semente);
            console.log('I = ', i);
            console.log('J = ', j);
            console.log('Operação = ', '*');
            console.log('-----');
            
            $scope.arrayGeradorAtrasodeFibonacci = "";

            x1 = appViewModel.semente;

            for (i = 0; i < 3000; i++) {                
                x1 = (x1-i)*(x1-j);                
                x1 = x1 % 100;
                x1 = parseInt(Math.abs(x1), 10);
                console.log(x1);
                $scope.arrayGeradorAtrasodeFibonacci = $scope.arrayGeradorAtrasodeFibonacci+'\r\n' + x1;
            }
            console.log('-----');
        }
        
        function congruenteLinearMultiplicativo2() { // Xn+1 = (a*Xn) % m
            a = Math.PI;
            m = (Math.pow(7, 12) -1);
            //appViewModel.semente =80;
            console.log('appViewModel.semente = ', appViewModel.semente);
            console.log(posX,posY);
            console.log('A = ', a);
            console.log('M = ', m);
            console.log('-----');
            
            $scope.arrayCongruenteLinearMultiplicativo2 = "";

            x1 = appViewModel.semente;

            for (i = 0; i < 3000; i++) {
                x1 = ((a * x1) % m);
                x1 = x1 + 1;
                $scope.arrayCongruenteLinearMultiplicativo2 = $scope.arrayCongruenteLinearMultiplicativo2+'\r\n' + parseInt(Math.abs(x1%101), 10), 10;
            }
            console.log('----');
        }

        function vincularMetodosAInterface() {
            appViewModel.quadradoDoMeio = quadradoDoMeio;
            appViewModel.congruenteLinearPotencias = congruenteLinearPotencias;
            appViewModel.congruenteLinearAdaptado = congruenteLinearAdaptado;
            appViewModel.congruenteLinearMultiplicativo = congruenteLinearMultiplicativo;
            appViewModel.geradorAtrasodeFibonacci = geradorAtrasodeFibonacci;
            appViewModel.congruenteLinearMultiplicativo2 = congruenteLinearMultiplicativo2;
        }
        
        

        vincularMetodosAInterface();
    }

})(window, angular);