

const STAR = document.getElementById('star');
const SELECTOR = document.getElementsByTagName('section');
const NAME = document.getElementsByTagName('span');
const BOARDKEYS = document.querySelectorAll('.cell');
let boardkeyslength = BOARDKEYS.length;

STAR.addEventListener("click", star);

let niveles = 12;
console.log(`Niveles: ${niveles} niveles`)
let dificultad;
let teclas = generarTeclas(niveles);
let starGame;
let messengeRepeat;

function star() {
	if(starGame == undefined){
		startGame();
		STAR.textContent = 'Star Game';
		STAR.style.backgroundColor = '#8CD4F5';
		STAR.classList.add('startGame');
	}
}

function startGame () {
	starGame = true;
	let mensaje;
	if(dificultad == 2){
		messengeRepeat = `Repite la secuencia al reves!!`
		mensaje = 'Repite la secuencia al reves!!'
	}else {
		messengeRepeat = `Repite la secuencia de letras!!`
		mensaje = 'Repite la secuencia de letras!!'
	}
	swal( {
			title: "Comienzando Nivel 1",
			text: `${mensaje}`,
			showCancelButton: true,
			confirmButtonText: 'Si',
			cancelButtonTextr: 'No',
			closeOnConfirm: true
		}, function (ok) {
			if(ok){
				teclas = generarTeclas(niveles);
				siguienteNivel(0)
				SELECTOR[0].style.opacity = 0;
			}else {
				SELECTOR[0].style.opacity = 0;
				starGame = undefined;
			}
		})
}



function siguienteNivel (nivelActual) {
	
	if(nivelActual >= niveles){
		return swal( {
			title: 'Ganaste',
			type: 'success',
			imageUrl: 'images/thumbs-up.png'
		}, function(ok){
			if(ok){
				
				SELECTOR[0].style.opacity = 0;
				array = [];
				if(dificultad==undefined){
					dificultad = 2;
					starGame = undefined;
					STAR.textContent = 'Mas Dificil!';
					STAR.style.backgroundColor = '#CC3366';
					STAR.classList.add('nextGame');
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
	for(let i = 0; i <= nivelActual; i++){
		setTimeout( () => {
			SELECTOR[0].textContent = `${messengeRepeat}`
			SELECTOR[0].style.visibility = 'visible';
			SELECTOR[0].style.opacity = 1;
		},  1500 * (i+1))
		setTimeout( () => {
			activate(teclas[i]);
		}, 1000 * (i+1) + 1500)
		
	}
	
	let i = 0;
	if(dificultad == 2){
		teclaActual = teclas[nivelActual - i]
	}else {
		teclaActual = teclas[i];
	}
	window.addEventListener('keydown', onkeydown);
	
	for(let y = 0; y < boardkeyslength; y++){
		BOARDKEYS[y].addEventListener('click', click);
	}
	function click(ev){
		keyPressed(ev.target.innerHTML.toUpperCase().charCodeAt(0))
	}
	function onkeydown (ev) {
    	keyPressed(ev.keyCode)
  	}
	
	function keyPressed(key) {
		if(dificultad == 2){
		teclaActual = teclas[nivelActual - i]
		}
		if(key == teclaActual){
			activate(teclaActual, {success: true})
			i++
			if (i > nivelActual){
				window.removeEventListener('keydown', onkeydown);
				for(let y = 0; y < boardkeyslength; y++){
					BOARDKEYS[y].removeEventListener('click', click);
				}
				setTimeout( () => siguienteNivel(i),
					1500)
			}
			teclaActual = teclas[i]
		}else if(key != teclaActual){

			activate(key, { fail: true });
			window.removeEventListener('keydown', onkeydown);
			for(let y = 0; y < boardkeyslength; y++){
				BOARDKEYS[y].removeEventListener('click', click);
			}
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
					dificultad = undefined;
					teclas = generarTeclas(niveles);
					siguienteNivel(0)
				}else {
					SELECTOR[0].style.opacity = 0;
					starGame = undefined;
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
// let sec = 0;
// let min = 0;

// const MINS = document.querySelector('#min');
// const SECS = document.querySelector('#sec');

// function cronometro () {

// 	setInterval( () => {
// 		sec++
// 		while (sec>=60) {
// 			sec = 0;
// 			min++
// 			MINS.textContent = (min<10) ? '0'+min : min
			
// 			SECS.textContent = sec;
// 		}
// 		SECS.textContent = (sec<10) ? '0'+sec : sec 
// 	}, 1000)

// }
// cronometro();


