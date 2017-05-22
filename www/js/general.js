
function quadradoDoMeio(){
    semente= Math.floor(Math.random() * 99 + 2);
    console.log('Semente = ', semente);
    console.log('-----');
    
    x1 = semente;
    
    for(i=1; i<11; i++){
        x1 = (x1 * x1);   
        
        y=""+x1;
        
        
        if(x1 === 0 || x1 === 1){
            x1 = x1 + semente;
        }
        else if(y.length === 3 || y.length === 4){
            res = y.slice(1, 3);                
            if(x1===(res*res)){
                res++;
                x1 = res;                    
            }
            else{x1 = res;}
        }        
        else{             
            
        }
        console.log(i, ': ','x1 =', x1);
    }
    console.log('-----');
}

function congruenteLinearPotencias(){ // Xn = a^n % m
    semente= Math.floor(Math.random() * 1000 + 2);
    a = Math.E;
    m = 99;
    console.log('Semente = ', semente);
    console.log('A = ', a);
    console.log('M = ', m);
    console.log('-----');
    
    x1 = semente;
    
    for(i=1; i<100; i++){
        x1 = (Math.pow(a, x1) % m);
        console.log(x1);
        console.log(i, ': ','x1 =', parseInt(x1, 10));
    }
    console.log('-----');
    
}

function congruenteLinearAdaptado(){ // Xn+1 = (a*Xn +b) % m
    semente= Math.floor(Math.random() * 1000 + 2);
    a = Math.E;
    b = 11;
    m = 100;
    console.log('Semente = ', semente);
    console.log('A = ', a);
    console.log('B = ', b);
    console.log('M = ', m);
    console.log('-----');
    
    x1 = semente;
    
    for(i=1; i<100; i++){
        x1 = (((a*x1)+b) % m);
        x1 = x1+1;
        console.log(i, ': ','x1 =', parseInt(x1, 10));
    }
    console.log('-----');
}

function congruenteLinearMultiplicativo(){ // Xn+1 = (a*Xn) % m
    semente= Math.floor(Math.random() * 1000 + 2);
    a = Math.E;
    m = 100;
    console.log('Semente = ', semente);
    console.log('A = ', a);
    console.log('M = ', m);
    console.log('-----');
    
    x1 = semente;
    
    for(i=1; i<100; i++){
        x1 = ((a*x1) % m);
        x1 = x1+1;
        console.log(i, ': ','x1 =', parseInt(x1, 10));
    }
    console.log('-----');
}

function geradorAtrasodeFibonacci(){ // Xn = Xn-i operação Xn-j
    
}