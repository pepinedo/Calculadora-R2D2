let nuevaOperacion = false;

const addToScreen = (dato) => {
    playSound("./sounds/click_effect.mp3");
    if(nuevaOperacion){
        clearScreen(false);
        nuevaOperacion = false;
    }
    document.getElementById("pantalla").value += dato;
}

const clearScreen = (a) => {
    document.getElementById("pantalla").value = "";
    if(a){
        playSound("./sounds/2.mp3");
    }
}

const calculate = () => {
    let result = "E";

    let operation = document.getElementById("pantalla").value;

    result = parseo(operation);

    if(result == "E"){
        document.getElementById("pantalla").value = "E";
        playSound("./sounds/1.mp3");
    }
    else{
        result = hacerElCalculo(result);
        document.getElementById("pantalla").value = `${result}`;
        playSound("./sounds/5.mp3");
    }
    nuevaOperacion = true;
}

function parseo(pantalla){
    let res = "E";

    let primerNumero = getNumero(0, pantalla);
    let signo = getOperator(primerNumero.length, pantalla);
    let segundoNumero = getNumero(primerNumero.length + signo.length, pantalla);
    let fin = noHayNadaMas(primerNumero.length + signo.length + segundoNumero.length, pantalla);

    if(primerNumero != "E" && signo != "E" && segundoNumero != "E" && fin == ""){
        res = [primerNumero, signo, segundoNumero];
    }
    if(signo == "/" && segundoNumero == 0){
        res = "E";
    }

    return res;
}

function getNumero(i, a){
    let res = "E";

    if(a[i] == '+' || a[i] == '-'){
        res = a[i];
        i++;
    }
    while(!isNaN(a[i])){
        if(res == "E"){
            res = "";
        }
        res += a[i];
        i++;
    }
    while(i < a.length){
        if(i > 19){
            res = "E";
        }
        i++;
    }

    return res;
}

function getOperator(i, a){
    let res = "E";

    if(a[i] == '+' || a[i] == '-' || a[i] == '*' || a[i] == '/'){
        res = a[i];
    }

    return res;
}

function noHayNadaMas(i, a){
    let res = "";
    if(a[i]){
        res = "E"; 
    }
    return res;
}

function hacerElCalculo(array){
    let primerNumero = parseInt(array[0]);
    let signo = array[1];
    let segundoNumero = parseInt(array[2]);

    let res = "E";
    if(signo == "+"){
        res = sumar(primerNumero, segundoNumero);
    }
    else if(signo == "-"){
        res = restar(primerNumero, segundoNumero);
    }
    else if(signo == "*"){
        res = multiplicar(primerNumero, segundoNumero);
    }
    else if(signo == "/"){
        res = dividir(primerNumero, segundoNumero);
    }

    return res
}

function sumar(a, b){
    return a + b;
}

function restar(a, b){
    return a - b;
}

function multiplicar(a, b){
    return a * b;
}

function dividir(a, b){
    let res = "E";

    if(b != 0){
        res = a / b;
    }

    return res;
}

function playSound(input) {
      let audio = new Audio(input);
      audio.currentTime = 0;
      audio.volume = 0.3;
      audio.play();
}