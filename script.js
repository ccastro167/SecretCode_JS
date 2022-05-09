
/*VARIABLES GLOBALES*/
const codigo = [];
const maxIntento = 6;
var intento = 0;
var numbersUser = document.getElementById("numero");
var isWinner = false

/*1. Genera una constante CODIGO_SECRETO de tipo array de 5 número aleatorios entre 0 y 9 usando la libreria Math.random();*/
function codigoSecreto() {
    for (let i = 0; i < 5; i++) {
        codigo[i] = Math.floor((Math.random() * 10));
    }
}

/*FUNCIONALIDADES AL INICIAR EL JUEGO*/
window.onload = function () {
    numbersUser.focus()
    alert("Instrucciones: Tienes 5 oportunidades para averiguar el número secreto. \n" 
          + "Si la casilla está en amarillo, indica que el número está pero no en la casilla correcta.\n" 
          + "Y la casilla verde cuando aciertas el número")
}
codigoSecreto();
startGame();


/*FUNCION DEL BOTON*/
function Comprobar() {
    console.log(codigo);
    play()
    numbersUser.focus() //Situe la pagina en el input de los datos
    numbersUser.value = "" //Lo vacio 
}

function play() {
    let numberUser = document.getElementById("numero").value; //Recojo el array de número del usuario
    let buttonCheck = document.getElementById("check"); //BOTON COMPROBAR
    let secretBox = document.getElementsByClassName("cel flex"); //CONTENIDO CONTRASEÑA
    let bodyItem = document.querySelector("body")
    let infoToUser = document.getElementById("info");
    let numberOk = 0;
    intento++

    if(isWinner){
        location.reload();
    }

    mostrarIntento(intento, maxIntento, infoToUser, bodyItem);
    
    let sectionResult = document.getElementById("Result"); //Section a completar

    //ESTO SOLO SE GENERA 1 VEZ 
    let divPadre = document.createElement("div"); //CONTENEDOR PADRE    
    divPadre.className = "rowResult w100 flex wrap"; 
    sectionResult.appendChild(divPadre); 

    /* GENERO 5 CAJAS */   

    for (let i = 0; i < 5; i++) { //Puedo usar tambien i<5 == i<number.length -> En este caso si
        /*MIDDLE BOX*/
        let middleBox = document.createElement("div");
        middleBox.className = "w20"; 
        divPadre.appendChild(middleBox); //Añado a mi divPadre la caja intermedia

        /*RESULT BOX*/
        let boxResult = document.createElement("div"); 
        boxResult.className = "celResult flex";        
        boxResult.textContent = numberUser[i];  //MUESTRO EL VALOR DEL USUARIO EN LA CAJA RESULTADO
        middleBox.appendChild(boxResult);

        /*COLOREADO*/
        if (codigo[i] == parseInt(numberUser[i])) {
            boxResult.style.background = "green"
            secretBox.item(i).textContent = codigo[i]; 
            numberOk++
        } else if (codigo.includes(parseInt(numberUser[i]))) {
            boxResult.style.background = "yellow"
        } else {
            boxResult.style.background = "grey"
        }

        /*IS WINNER?*/
        if (numberOk == 5) {
            bodyItem.style.background = "url('./img/finishGame.gif')"
            infoToUser.textContent = "HAS GANADO";
            buttonCheck.innerHTML = "Recarga la Página";
            isWinner = true;
        }
    }

}

function mostrarIntento(intento, maxIntento, infoToUser, bodyItem) {
    switch (intento) {
        case maxIntento:
            if (confirm("¡¡Volvamos a intentarlo!!!") == true) {
                location.reload();
            } else { location.reload() }
        case 5: infoToUser.textContent = "¡Último Intento!"; break;
        case 4: infoToUser.textContent = "¡Penúltimo Intento!"; break;
        case 3: infoToUser.textContent = "¡Tercer Intento!"; break;
        case 2: infoToUser.textContent = "¡Segundo Intento!"; break;
        case 1: infoToUser.textContent = "¡Primer Intento!"; break;       
    }
}

function startGame() {
    let numbersUser = document.getElementById("numero");
    let indicaciones = document.createAttribute("placeholder");
    let maxLength = document.createAttribute("maxlength");
    maxLength.value = 5;
    indicaciones.value = "Escriba números";
    numbersUser.setAttributeNode(indicaciones);
    numbersUser.setAttributeNode(maxLength);
}


function valideKey(evt) {
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;

    if (code == 8) { // backspace.
        return true;
    } else if (code >= 48 && code <= 57) { // is a number.
        return true;
    } else { // other keys.
        return false;
    }
}






