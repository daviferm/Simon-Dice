


const ALERT = document.getElementById('alert');
const STAR = document.getElementById('star');
const SELECTOR = document.getElementsByTagName('section');
const NAME = document.getElementsByTagName('span');
const KEYBOARDKEYS = document.querySelectorAll('.cell');
let keyboardkeyslength = KEYBOARDKEYS.length;

STAR.addEventListener("click", star);

let niveles = 2;
let dificultad;
let teclas = generarTeclas(niveles);
let i;
let starGame;
//La variable "reload" se pone false cuando se use el teclado virtual
//para que no se produzca una error al pulsar el teclado físico. 
let reload;
let nivelAc;
let teclaActual;
let array = [];
let set = new Set();

//Esta función empieza el juego solo si no ha sido iniciado ya..
function star() {
	if(starGame == undefined){
		startGame();
		STAR.textContent = 'Star Game';
		STAR.style.backgroundColor = '#8CD4F5';
		STAR.classList.add('startGame');
	}
}

//Esta función inicia el juego
function startGame () {
	starGame = true;

	if(dificultad == 2){
		swal( {
			title: "Comienza Nivel 1",
			text: "Pero ahora aumentamos la dificultad!!",
			showCancelButton: true,
			confirmButtonText: 'Si',
			cancelButtonTextr: 'No',
			closeOnConfirm: true
		}, function (ok) {
			if(ok){
				teclas = generarTeclas(niveles);
				siguienteNivel(0)
				SELECTOR[0].style.opacity = 0;
				reload = undefined;
			}else {
				SELECTOR[0].style.opacity = 0;
				starGame = undefined;
			}
		})
	}else {
		swal({   
			title: "Simon dice!",   
			text: "Escribe tu nombre a continuación:",   
			type: "input",   
			showCancelButton: true,   
			closeOnConfirm: false,   
			animation: "slide-from-top",   
			inputPlaceholder: "Tu nombre..." 
			}, 
			function(inputValue){   
				if (inputValue === false) {
					false;
					starGame = undefined; 
				}      
				if (inputValue === "") {     
					swal.showInputError("Necesitas escribir un nombre válido!");     
					return false   
				} else {
					swal( {
						title: "Comienza Nivel 1",
						text: "Bienvenido " + inputValue,
						showCancelButton: true,
						confirmButtonText: 'Si',
						cancelButtonTextr: 'No',
						closeOnConfirm: true
					}, function (ok) {
						if(ok){
							teclas = generarTeclas(niveles);
							siguienteNivel(0)
							SELECTOR[0].style.opacity = 0;
							NAME[0].textContent = inputValue
							reload = undefined;
						}else {
							SELECTOR[0].style.opacity = 0;
						}
					} )
			}     
		});
		
	}
	
}


// function save(Code) {
	
// 	reload = false;
// 	array = [...set]
// 	if(dificultad == 2){
// 		array = array.reverse()
// 	}
// 	if(Code == array[t]){
// 		activate(Code, {success: true})
// 		t++;
// 		if(t > nivelAc){
// 			setTimeout( () => siguienteNivel(t), 1000)
// 		}
// 	}else {
// 		activate(Code, { fail: true });
// 		set.clear();
// 		setTimeout( () => {
// 			swal( {
// 			title: 'Has Perdido',
// 			text: '¿Quieres jugar de nuevo?',
// 			showCancelButton: true,
// 			confirmButtonText: 'Si',
// 			cancelButtonTextr: 'No',
// 			closeOnConfirm: true
// 		}, function (ok) {
// 			if(ok){
// 				STAR.textContent = 'Star Game';
// 				STAR.style.backgroundColor = '#8CD4F5';
// 				STAR.classList.add('startGame');
// 				SELECTOR[0].style.opacity = 0;
// 				nivelAc = 0;
// 				dificultad = undefined;
// 				reload = undefined;
// 				teclas = generarTeclas(niveles);
// 				siguienteNivel(0)
// 			}else {
// 				STAR.textContent = 'Star Game';
// 				STAR.style.backgroundColor = '#8CD4F5';
// 				STAR.classList.add('startGame');
// 				SELECTOR[0].style.opacity = 0;
// 				nivelAc = 0;
// 				starGame = undefined;
// 				dificultad = undefined;
// 				NAME[0].textContent = 'Simon';
// 			}
// 		})
// 		} , 500)
			
// 	}

// }
// document.addEventListener('keydown', (ev) =>{
// 	console.log(ev.keyCode)
// })

function siguienteNivel (nivelActual) {
	console.log('anterior nivelActual: '+nivelActual);
	nivelAc = nivelActual;
	console.log('posterior nivelActual: '+nivelActual);

	if(nivelActual >= niveles){
		return swal( {
			title: 'Ganaste',
			type: 'success',
			imageUrl: 'images/thumbs-up.png'
		}, function(ok){
			if(ok){
				
				SELECTOR[0].style.opacity = 0;
				set.clear();
				array = [];
				if(dificultad==undefined){
					STAR.textContent = 'Next Game';
					STAR.style.backgroundColor = '#FD6666';
					STAR.classList.add('nextGame');
					dificultad = 2;
					starGame = undefined;
				}else {
					dificultad = undefined;
					starGame = undefined;
				}
			}
		} );
	}
	SELECTOR[0].style.opacity = 0;
	if(nivelActual > 0){
		swal( {
		timer: 1500,
		title: `Nivel ${nivelActual + 1}`,
		showConfirmButton: false,
		imageUrl: 'images/thumbs-up.png',
		} )
	}
	console.log("nivel Actual: " + nivelActual)
	for(let i = 0; i <= nivelActual; i++){
		setTimeout( () => {
			SELECTOR[0].style.visibility = 'visible';
			SELECTOR[0].style.opacity = 1;
		},  1500 * (i+1))
		setTimeout( () => {
			activate(teclas[i]);
			// set.add(teclas[i]);
		}, 1000 * (i+1) + 1500)
		
	}
	i = 0;
	
	
	onkey(nivelActual);
	

}
function onkey (nivelActual, ev = "") {
	nivelActual = nivelAc;
	console.log("ev: "+ev)
	console.log("nivel actual: "+nivelActual)
	
	
	if(dificultad == 2){
		teclaActual = teclas[nivelActual - i]
	}else {
		teclaActual = teclas[i];
	}
	evTactil = ev;
	if(typeof evTactil === "number"){
	onkeydown(evTactil);
	console.log("evTactil... "+evTactil)
	}
	if(starGame = true){

	window.addEventListener('keydown', onkeydown);
	}

	function onkeydown(ev) {
		console.log('tecla actual: '+teclaActual)
		console.log('tecla pulsada: '+evTactil)
		console.log('i: '+i)
	if(dificultad == 2){
		teclaActual = teclas[nivelAc - i]
	}else {
		teclaActual = teclas[i]
	}
	if(ev.keyCode == teclaActual && reload == undefined ||
		evTactil == teclaActual && reload == undefined){
		activate(teclaActual, {success: true})
		i++
		if (i > nivelActual){
			window.removeEventListener('keydown', onkeydown);
			setTimeout( () => siguienteNivel(i),
				1500)

		}
			

	}else if(ev.keyCode != teclaActual && reload == undefined ||
		evTactil == teclaActual && reload == undefined){

		activate(ev.keyCode || evTactil, { fail: true });
		window.removeEventListener('keydown', onkeydown);
		setTimeout( () => {

		swal( {
			title: 'Perdiste',
			text: '¿Quieres jugar de nuevo?',
			showCancelButton: true,
			confirmButtonText: 'Si',
			cancelButtonTextr: 'No',
			closeOnConfirm: true
		}, function (ok) {
			if(ok){
				STAR.textContent = 'Star Game';
				STAR.style.backgroundColor = '#8CD4F5';
				STAR.classList.add('startGame');
				nivelAc = 0;
				dificultad = undefined;
				reload = undefined;
				teclas = generarTeclas(niveles);
				siguienteNivel(0)

			}else {
				SELECTOR[0].style.opacity = 0;
				reload = undefined;
				starGame = undefined;
				nivelAc = 0;
				dificultad = undefined;
				STAR.textContent = 'Star Game';
				STAR.style.backgroundColor = '#8CD4F5';
				STAR.classList.add('startGame');
			}
		})
		}, 600)
	}

	}
}


function aleatorio(){
	const min = 65;
	const max = 90;
  return Math.floor( Math.random() * ( max-min) + min);
}
function getElemenByKeyCode (keyCode) {
	return document.querySelector(`[data-key="${keyCode}"]`);
}
function activate (keyCode, opts = {}) {
	const el = getElemenByKeyCode(keyCode);
	el.classList.add('active');
	if(opts.success){
		el.classList.add('success');
	}else if (opts.fail) {
		el.classList.add('fail');
	}
	setTimeout( () => {
		deactivate(el)
	}, 500)
}
function deactivate (el) {
	el.className = 'cell';
}
function generarTeclas (niveles) {
	return new Array(niveles).fill(0).map(
		aleatorio)
}

// Reloj
let sec = 0;
let min = 0;

const MINS = document.querySelector('#min');
const SECS = document.querySelector('#sec');

function cronometro () {

	setInterval( () => {
		sec++
		while (sec>=60) {
			sec = 0;
			min++
			MINS.textContent = (min<10) ? '0'+min : min
			
			SECS.textContent = sec;
		}
		SECS.textContent = (sec<10) ? '0'+sec : sec 
	}, 1000)

}
cronometro();






