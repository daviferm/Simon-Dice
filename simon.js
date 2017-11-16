
const ALERT = document.getElementById('alert');
const STAR = document.getElementById('star');
const SELECTOR = document.getElementsByTagName('section')

STAR.addEventListener("click", starGame);

function starGame () {
	siguienteNivel(0)
}

let niveles = 2;
let teclas = generarTeclas(niveles);
let t;
let nivelAc;
let array = [];
let set = new Set()
const arrTeclas = document.getElementsByClassName('cell');

function save (Code) {
	if(nivelAc >= niveles){
		return swal( {
			title: 'Ganaste',
			type: 'success'
		} );
	}
	array = [...set]
	console.log("array:  " +array[t])
	console.log("code: "+Code)
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
		} );
	}
	SELECTOR[0].style.opacity = 0;
	swal( {
		timer: 1500,
		title: `Nivel ${nivelActual + 1}`,
		showConfirmButton: false,
		
	} )

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
	console.log("i: " + i)
	console.log("t: " + t)
	teclaActual = teclas[i];
	window.addEventListener('keydown', onkeydown);
	
	function onkeydown(ev) {
		if(ev.keyCode == teclaActual){
			activate(teclaActual, {success: true})
			i++
			if (i > nivelActual){
				window.removeEventListener('keydown', onkeydown);
				setTimeout( () => siguienteNivel(i),
					1500)
				
			}
			teclaActual = teclas[i]
		}else {
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



