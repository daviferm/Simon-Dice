
const ALERT = document.getElementById('alert');

let niveles = 10;
let teclas = generarTeclas(niveles);
let t;
let nivelAc;
let array = [];
let set = new Set()
const arrTeclas = document.getElementsByClassName('cell');

function save (Code) {
	array = [...set]
	console.log(array[t])
	if(Code == array[t]){
		console.log("Code: "+Code)
		activate(Code, {success: true})
		t++;
		if(t > nivelAc){
			setTimeout( () => siguienteNivel(t), 1000)
		}
	}else {
			activate(Code, { fail: true });
			setTimeout( () => alert("Perdiste :("), 500)
			
		}

}
document.addEventListener('keydown', (ev) =>{
	console.log(ev.keyCode)
})

function siguienteNivel (nivelAlcual) {
	let nivelActual = nivelAlcual;
	nivelAc = nivelActual;
	if(nivelAlcual == niveles){
		return alert("Ganaste");
	}
	alert(`Nivel ${nivelAlcual + 1}`)

	for(let i = 0; i <= nivelAlcual; i++){
		setTimeout( () => {
			activate(teclas[i]);
			set.add(teclas[i]);
		}, 1000 * (i+1))
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
			alert("Perdiste :(")
		}
	}

}
siguienteNivel(0)

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



