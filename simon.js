

// Solucionar error que provoca un error cuando se usa el teclado físico
// despues de jugar una partida con el teclado virtual.
const ALERT = document.getElementById('alert');
const STAR = document.getElementById('star');
const SELECTOR = document.getElementsByTagName('section');
const NAME = document.getElementsByTagName('span');

STAR.addEventListener("click", star);

let niveles = 4;
let dificultad;
let teclas = generarTeclas(niveles);
let t;
let starGame;
//La variable "reload" se pone false cuando se use el teclado virtual
//para que no se produzca una error al pulsar el teclado físico. 
let reload;
let nivelAc;
let array = [];
let set = new Set();

function star() {
	if(starGame == undefined){
		startGame();
	}
}

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
		} )
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


function save(Code) {
	
	reload = false;
	array = [...set]
	if(dificultad == 2){
		array = array.reverse()
	}
	if(Code == array[t]){
		activate(Code, {success: true})
		t++;
		if(t > nivelAc){
			setTimeout( () => siguienteNivel(t), 1000)
		}
	}else {
		activate(Code, { fail: true });
		set.clear();
		setTimeout( () => {
			swal( {
			title: 'Has Perdido',
			text: '¿Quieres jugar de nuevo?',
			showCancelButton: true,
			confirmButtonText: 'Si',
			cancelButtonTextr: 'No',
			closeOnConfirm: true
		}, function (ok) {
			if(ok){
				SELECTOR[0].style.opacity = 0;
				nivelAc = 0;
				dificultad = undefined;
				reload = undefined;
				teclas = generarTeclas(niveles);
				siguienteNivel(0)

			}else {
				SELECTOR[0].style.opacity = 0;
				nivelAc = 0;
				starGame = undefined;
				dificultad = undefined;
			}
		})
		} , 500)
			
	}

}
// document.addEventListener('keydown', (ev) =>{
// 	console.log(ev.keyCode)
// })

function siguienteNivel (nivelActual) {
	
	nivelAc = nivelActual;
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
			set.add(teclas[i]);
		}, 1000 * (i+1) + 1500)
		
	}
	
	let i = 0;
	t = i;
	if(dificultad == 2){
		teclaActual = teclas[nivelActual - i]
	}else {
		teclaActual = teclas[i];
	}

	window.addEventListener('keydown', onkeydown);
	
	function onkeydown(ev) {
		console.log("nivel Actual: "+ nivelActual)
		console.log("tecla Actual: "+ teclaActual)
		console.log("ev.keyCode: "+ ev.keyCode)
		console.log("valor i: "+ i)
		if(dificultad == 2){
		teclaActual = teclas[nivelActual - i]
		}
		if(ev.keyCode == teclaActual && reload == undefined){
			activate(teclaActual, {success: true})
			i++
			if (i > nivelActual){
				window.removeEventListener('keydown', onkeydown);
				setTimeout( () => siguienteNivel(i),
					1500)
			}
			teclaActual = teclas[i]
		}else if(ev.keyCode != teclaActual && reload == undefined){

			activate(ev.keyCode, { fail: true });
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
					reload = undefined;
					teclas = generarTeclas(niveles);
					siguienteNivel(0)
				}else {
					SELECTOR[0].style.opacity = 0;
					reload = undefined;
					starGame = undefined;
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



