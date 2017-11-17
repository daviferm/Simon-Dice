
const ALERT = document.getElementById('alert');
const STAR = document.getElementById('star');
const SELECTOR = document.getElementsByTagName('section');
const NAME = document.getElementsByTagName('span');

STAR.addEventListener("click", starGame);

let niveles = 2;
let dificultad;
let teclas = generarTeclas(niveles);
let t;
let reload;
let nivelAc;
let array = [];
let set = new Set();


function starGame () {
	console.log('Dificultad: ' + dificultad);
	reload = undefined;
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
			}else {
				SELECTOR[0].style.opacity = 0;
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
			if (inputValue === false) return false;      
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
					}else {
						SELECTOR[0].style.opacity = 0;
					}
				} )
		}     
	});
		
	}
	
}


function save (Code) {
	
	array = [...set]
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
				teclas = generarTeclas(niveles);
				siguienteNivel(0)
			}else {
				SELECTOR[0].style.opacity = 0;
			}
		})
		} , 500)
			
	}

}
// document.addEventListener('keydown', (ev) =>{
// 	console.log(ev.keyCode)
// })

function siguienteNivel (nivelAlcual) {
	
	let nivelActual = nivelAlcual;
	nivelAc = nivelActual;
	if(nivelAlcual >= niveles){
		return swal( {
			title: 'Ganaste',
			type: 'success',
			imageUrl: 'images/thumbs-up.png'
		}, function(ok){
			if(ok){
				SELECTOR[0].style.opacity = 0;
				set.clear();
				array = [];
				reload = false;
				dificultad = 2;
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

	for(let i = 0; i <= nivelAlcual; i++){
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
	teclaActual = teclas[i];

	console.log('reload' + reload);
	window.addEventListener('keydown', onkeydown);
	
	function onkeydown(ev) {
		if(ev.keyCode == teclaActual && reload == undefined){
			activate(teclaActual, {success: true})
			i++
			if (i > nivelActual){
				window.removeEventListener('keydown', onkeydown);
				setTimeout( () => siguienteNivel(i),
					1500)
			}
			teclaActual = teclas[i]
		}else if(reload){

			activate(ev.keyCode, { fail: true });
			window.removeEventListener('keydown', onkeydown);
			swal( {
				title: 'Perdiste',
				text: '¿Quieres jugar de nuevo?',
				showCancelButton: true,
				confirmButtonText: 'Si',
				cancelButtonTextr: 'No',
				closeOnConfirm: true
			}, function (ok) {
				if(ok){
					teclas = generarTeclas(niveles);
					siguienteNivel(0)
				}else {
					SELECTOR[0].style.opacity = 0;
				}
			})
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



