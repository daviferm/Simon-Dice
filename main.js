
//Constantes para traer varios elementos html
const ALERT = document.getElementById('alert'); //Mensaje popup con el Nivel de la prueba
const NIVEL = document.getElementById('nivel'); //Parrafo para cambiar el número de nivel
const BOTON = document.getElementById('star'); //Boton principal para empezar la partida
const REPEAT = document.getElementsByTagName('section'); //Parrafo. Mostrar o no mensaje "Repite la secuencia"
const IMG = document.getElementsByTagName('img');

BOTON.addEventListener("click", showAlert);
ALERT.addEventListener("click", partida);

//Esto nos devuelve un array con todos los elementos con la clase "cell". Cada elemento contiene una letra.
let celda = document.getElementsByClassName('cell'); 

//Variables que utilizaremos
let cellSelec = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
let shareCell = [];
let result = [];
let arrEvent = [];
let num = 0;
let tirada;
let niveles;
let time1 = -200;
let time2 = 0;
let timeEnter;

//Funcion para obtener un número aleatorio
function aleatorio( min, max ){
  return Math.floor( Math.random() * ( max-min + 1) + min);
}

//Funcion para mostrar el mensaje de inicio de partida
function showAlert () {
	ALERT.style.display = 'block';
}
 
//Funcion para iniciar la partida con varios casos en función de las letras que hay que repetir
function partida () {
	niveles++;

 switch (tirada) {
 	case (undefined):
 		autoGame(1)
 		break;
 	default:
 		// statements_def
 		break;
 }
 switch (niveles) {
 	
 	case (1):
 		autoGame(2)
 		break;
 	case (2):
 		autoGame(3)
 		break;
 	case (3):
 		autoGame(4)
 		break;
 	case (4):
 		autoGame(5)
 		break;
 	case (5):
 		autoGame(6)
 		break;
 	case (6):
 		autoGame(7)
 		break;
 	case (7):
 		autoGame(8)
 		break;
 	case (8):
 		autoGame(9)
 		break;
 	case (9):
 		autoGame(10)
 		break;
 	default:
 		// statements_def
 		break;
 }
}

//Ejecucion del iterador que va a mostrar la secuencia a repetir en funcion del nivel "parametro(n)"
function autoGame(n) {
	celda[num].style.transform = 'scale(1)';
 	celda[num].style.border = '3px solid white';
	ALERT.style.display = "none";
	function iterador(){
		let a = aleatorio(1, 25);
		//Closure
	return {
		next: function(){

			let f = a 
			a = aleatorio(1, 25)
			shareCell.push(f);
			return { value: f, done: false}
			}
		}
	}
	const fibo = {}
	fibo[Symbol.iterator] = iterador
	
	let i = 0
	for( value of fibo ){
		
		console.log(value)
		console.log(shareCell)
		
		i++
		if(i >= n)break
	}
	
	for (let y = 0; y < shareCell.length; y++) {
		time1 += 600;
		time2 += 600;
		timeEnter = time2;
		setTimeout(function () {
			celda[shareCell[y]].style.background = '#CDA33F';
				
		}, time1)
		setTimeout( function() {
			 celda[shareCell[y]].style.background = 'black';
		}, time2)
	}
	time1 = -200;
	time2 = 0;
	setTimeout( function(){
		REPEAT[0].style.visibility = 'visible';
		REPEAT[0].style.opacity = 1;
		document.addEventListener("keydown", evento);

	}, timeEnter)
	for(let x = 0; x < shareCell.length; x++){
		result.push(cellSelec[shareCell[x]]);
	}
		
		

}
//Función para detectar la pulsación de cualquier tecla.
function secuencia () {
	
	document.addEventListener("keydown", evento);
	
}
//Función que detecta si marcamos con el mouse cuanquier tecla del teclado virtual.
function save(val) {
	console.log(arrEvent);
	for (let i = 0; i < cellSelec.length; i++) {
	
		celda[i].style.transform = 'scale(1)';
		celda[i].style.border = '3px solid white';
	}
	celda[val].style.transform = 'scale(1.1)';
	celda[val].style.border = '3px solid red';
	num = val;
	
	arrEvent.push(cellSelec[val]);
	if(arrEvent.length == result.length){
		checkResult();
	}
}

//Función que se ejecuta cada vez que pulsamos una tecla en el 
//teclado físico para marcarlo en tel teclado virtual
function evento (event) {
	for (let i = 0; i < cellSelec.length; i++) {
	
			celda[i].style.transform = 'scale(1)';
			celda[i].style.border = '3px solid white';
	}
	for (let i = 0; i < cellSelec.length; i++) {
		if (event.key == cellSelec[i]) {
			celda[i].style.transform = 'scale(1.1)';
			celda[i].style.border = '3px solid red';
			num = i;
			break;
		}
	}
	arrEvent.push(event.key);
	if(arrEvent.length == result.length){
		checkResult();
	}

}
//Función que comprueba si hemos marcado bien la secuencia.
function checkResult () {
	switch (tirada) {
 		case (undefined):
 			if(arrEvent[0]==result[0]){
 				NIVEL.textContent = 'NIVEL 2';
 				IMG[0].style.display = 'block';
 				tirada = false;
 				niveles = 0;
 				time1 += -200;
				time2 += 0;
 				nextLevel();
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				nextLevel();
 			}
 			break;
 		default:
 			// default
 			break;
	}
	switch (niveles) {
		case (1):
			if(arrEvent[0]==result[0] && arrEvent[1]==result[1]){
				NIVEL.textContent = 'NIVEL 3';
 				nextLevel();
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				niveles = undefined;
 				nextLevel();
 			}
			break;
		case (2):
			if(arrEvent[0]==result[0] && arrEvent[1]==result[1] && arrEvent[2]==result[2]){
				NIVEL.textContent = 'NIVEL 4';
 				nextLevel();
 				
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				niveles = undefined;
 				nextLevel();
 			}
 			break;
 		case (3):
			if(arrEvent[0]==result[0] && arrEvent[1]==result[1] && 
				arrEvent[2]==result[2] && arrEvent[3]==result[3]){
				NIVEL.textContent = 'NIVEL 5';
 				nextLevel();
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				niveles = undefined;
 				nextLevel();
 			}
 			break;
 		case (4):
			if(arrEvent[0]==result[0] && arrEvent[1]==result[1] && 
				arrEvent[2]==result[2] && arrEvent[3]==result[3] && 
				arrEvent[4]==result[4]){
				NIVEL.textContent = 'NIVEL 6';
 				nextLevel();
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				niveles = undefined;
 				nextLevel();
 			}
 			break;
 		case (5):
			if(arrEvent[0]==result[0] && arrEvent[1]==result[1] && 
				arrEvent[2]==result[2] && arrEvent[3]==result[3] && 
				arrEvent[4]==result[4] && arrEvent[5]==result[5]){
				NIVEL.textContent = 'NIVEL 7';
 				nextLevel();
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				niveles = undefined;
 				nextLevel();
 			}
 			break;
 		case (6):
			if(arrEvent[0]==result[0] && arrEvent[1]==result[1] && 
				arrEvent[2]==result[2] && arrEvent[3]==result[3] &&
				arrEvent[4]==result[4] && arrEvent[5]==result[5] &&
				arrEvent[6]==result[6]){
				NIVEL.textContent = 'NIVEL 8';
 				nextLevel();
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				niveles = undefined;
 				nextLevel();
 			}
 			break;
 		case (7):
			if(arrEvent[0]==result[0] && arrEvent[1]==result[1] && 
				arrEvent[2]==result[2] && arrEvent[3]==result[3] &&
				arrEvent[4]==result[4] && arrEvent[5]==result[5] &&
				arrEvent[6]==result[6] && arrEvent[7]==result[7]){
				NIVEL.textContent = 'NIVEL 9';
 				nextLevel();
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				niveles = undefined;
 				nextLevel();
 			}
 			break;
 		case (8):
			if(arrEvent[0]==result[0] && arrEvent[1]==result[1] && 
				arrEvent[2]==result[2] && arrEvent[3]==result[3] &&
				arrEvent[4]==result[4] && arrEvent[5]==result[5] &&
				arrEvent[6]==result[6] && arrEvent[7]==result[7] &&
				arrEvent[8]==result[8]){
 				NIVEL.textContent = 'NIVEL 10';
 				nextLevel();
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				niveles = undefined;
 				nextLevel();
 			}
 			break;
 		case (9):

			if(arrEvent[0]==result[0] && arrEvent[1]==result[1] && 
				arrEvent[2]==result[2] && arrEvent[3]==result[3] &&
				arrEvent[4]==result[4] && arrEvent[5]==result[5] &&
				arrEvent[6]==result[6] && arrEvent[7]==result[7] &&
				arrEvent[8]==result[8] && arrEvent[9]==result[9]){
 				NIVEL.textContent = 'Último NIVEL';
 				nextLevel();
 			}else {
 				NIVEL.textContent = "Fallaste. Comienza de nuevo. NIVEL 1";
 				IMG[0].style.display = 'none';
 				tirada = undefined;
 				niveles = undefined;
 				nextLevel();
 			}
 			break;
		default:
			// statements_def
			break;
	}
}
//Función con varias acciones que se repiten.
function nextLevel() {
	REPEAT[0].style.opacity = 0;
 	ALERT.style.display = 'block';
 	arrEvent = [];
 	result = [];
 	shareCell = [];
}







