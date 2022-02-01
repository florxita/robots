const activeSlider = document.getElementById('contenedorRobots')
//<--inserto vista previa del robot --> crearSliderRobot 

const header = document.getElementById('header'),
	main = document.getElementById('main'), //<-- solo contiene el home/inicio

	perfilRobot = document.getElementById('perfilRobot'),
	sectionPerfilRobots = document.getElementById('sectionPerfilRobots')



let indiceRobot = 0 // ya le indico que arranca desde el 0 (el 0 es Winston)

/////////////////////////////////////////

//Espero que cargue en el window
if (window) {
	window.addEventListener('DOMContentLoaded', () => {
		obtenerDatos(indiceRobot)
	})
}
//llamo a mi archivo json
async function obtenerDatos(indiceRobot) {
	const response = await fetch("http://127.0.0.1:5500/robots.json");
	const robots = await response.json();

	console.log(robots) //<--- es para guiarme 

	////////  FUNCIONES QUE SE EJECUTAN AL CARGAR EL .JSON  ////////

	crearSliderRobot(robots, indiceRobot)

	capturarEventoBotonVerFicha() // <-- guarde el evento click sobre el boton "ver ficha" y "back"


}

crearSliderRobot = (robots, indiceRobot) => {
	energy = robots[indiceRobot][0].statistics[0].energy[0].value,
		maintenance = robots[indiceRobot][0].statistics[0].maintenance[0].value,
		complexity = robots[indiceRobot][0].statistics[0].complexity[0].value,
		security = robots[indiceRobot][0].statistics[0].security[0].value

	activeSlider.innerHTML = `
            <i id="arrowLeft" class='bx bx-chevron-left'></i>
            <div id="sliderElement">
                        <img class="image__preview" src="${robots[indiceRobot][0].preview}" alt="robot">
                        <div class ="text__robot__slider">
                             <h2 class="robot__name title">${robots[indiceRobot][0].name}</h2>
                             <h3 class="s__work">${robots[indiceRobot][0].type}</h3>
                             <p class="description__text">${robots[indiceRobot][0].description}</p>
                        </div>
                        <a href="#" id="fileRobotBtn" class="btn lineal__btn lineal__warning">Ver Ficha Completa</a>                   
            </div>
            <i id="arrowRight" class='bx bx-chevron-right'></i>
    `
	capturarEventoArrow(robots, indiceRobot)
}

//VISTA PREVIA DEL ROBOT EN EL INICIO

//eventListener de arrows // al hacer click activa la funcion de crearSliderRobot
const capturarEventoArrow = (robots, indice) => {
	document.addEventListener('click', (e) => {
		e.preventDefault
		//e.cancelBubble  
		if (e.target.id === 'arrowRight') {
			indice++ //incremento el indice
			indiceRobot++
			// console.log('-----------');
			// console.log('Aumentando' + indiceRobot)
			//console.log('Aumentando' + robots.length)
			if (indice == robots.length) {
				indice = 0
			}
			crearSliderRobot(robots, indice);
			crearPerfil(robots, indice)
			crearEstadisticas(robots, indice)

		} else if (e.target.id === 'arrowLeft') {
			indiceRobot-- //resto el indice
			indice--
			//console.log('-----------');
			//console.log('Restando' + robots.length)
			//console.log('Aumentando' + indiceRobot)
			if (indice < 0) {
				indice = robots.length - 1
				crearSliderRobot(robots, indice);
				crearPerfil(robots, indiceRobot)
				crearEstadisticas(robots, indiceRobot)

			}

		}
	})
}
//EVENTLISTENER DEL BOTON "VER FICHA"
const fileRobotBtn = document.getElementById('fileRobotBtn') //este es el boton que crea la seccion completa

const capturarEventoBotonVerFicha = () => { // guardo el evento al clikear el boton "Ver Ficha Robot"
	document.addEventListener('click', e => {
		e.preventDefault()
		e.stopPropagation()

		if (e.target.id == 'fileRobotBtn') {
			main.classList.add('display__none');
			header.classList.add('display__none');
			sectionPerfilRobots.classList.remove('display__none')
			sectionPerfilRobots.classList.add('perfilRobotActive');
			obtenerCircunsferencia()

		}
		if (e.target.id === 'backBtn') { // y ahora la flecha back le devuelve el display anterior
			main.classList.remove('display__none');
			header.classList.remove('display__none');
			sectionPerfilRobots.classList.remove('perfilRobotActive')
		}
	})
}

///////////////////////////////////////////////////////////////////////////////////////////





//OBJETO TABLA PRECIOS

const prices = document.getElementById('prices')

const planes = {
	title: 'Plan Anual',
	anualprice: 60000,
	mensualprice: 5000,
	item: ['Control Remoto y Accesorios', 'Cobertura 100% en daños de la unidad',
		'Asistencia Técnica Virtual 24/7', 'Mantenimiento mensual sin cargo', 'Elección de Color de pintura', 'Beneficios Socio Robot'
	]
}

//cargo los items del objeto tabla de precios como un li
const cargarItemsTabla = () => {
	let datosPlanes = Object.entries(planes)
	let itemsArray = planes.item

	return datosPlanes.map(([key, value]) => {
		if (key == "item") {
			return itemsArray.map(x => `<li>${x}</li>`).join('')
		}
	}).join('')
}
//template de tabla de precios
window.addEventListener('DOMContentLoaded', () => {
	prices.innerHTML = `
    <div class="slider__section">
                <i class='bx bx-chevron-left'></i>
                <div class="card__price">
                    <h2>${planes.title}</h2>
                    <p class="price__final">$ ${planes.anualprice}</p>
                    <p class="price__mensual">$${planes.mensualprice} x mes</p>
                    <ul id="lista" class="items__list">
                         ${cargarItemsTabla()}
                    </ul>                   
                    <btn id="btnPlan" href="#" class=" btn fill__btn">Contratar este plan</btn>   
                </div>
                <i class='bx bx-chevron-right'></i>
    </div>
    `
})

///////////////// PERFIL ROBOT ///////////////////////////

//console.log(robots[0][0].statistics[0].complexity[0].value)  

crearPerfil = (robots, indiceRobot) => {
	perfilRobot.innerHTML = `
    <div id="sliderElement">
         <img class="image__robot" src="${robots[indiceRobot][0].src}" alt="robot">
                <div class ="text__robot__slider">
                    <h2 class="robot__name title">${robots[indiceRobot][0].name}</h2>
                    <h3 class="s__work">${robots[indiceRobot][0].type}</h3>
                    <p class="description__text">${robots[indiceRobot][0].description}</p>
                </div>
    </div>
    `
}
//-----------------------------------------------------------

crearEstadisticas = (robots) => {
	const contentActive = document.getElementById('contentActive')
	const others = robots[indiceRobot][0].statistics[0].other[0]

	contentActive.innerHTML = `
            <div id="stadisticsItems" class="stadistics__items">
                <div class="bar__item" id="energyBar">
                    <p>Energia</p>
                    <div class="bar__color">
                        <div id="barBlue" class="clr"></div>
                    </div>
                    <div> </div>
                </div>

                <div class="bar__item" id="maintenanceBar">
                    <p>Mantenimiento</p>
                    <div class="bar__color">
                        <div id="barPink" class="clr"></div>
                    </div>
                </div>

                <div class="bar__item" id="complexBar">
                    <p>Complejidad</p>
                    <div class="bar__color">
                        <div id= "barOrange" class="clr"></div>
                    </div>
                </div>

                <div class="bar__item" id="securityBar">
                    <p>Seguridad</p>
                    <div class="bar__color">
                        <div id="barGreen" class="clr"></div>
                    </div>
                </div>

                <div class="time__items">
                    <div class="circle__load">
                         <div class="text__circle">
                               <span>Uso máximo de 1 carga</span>
                               <span class="number">${others.batteryLife[0].value}</span>
                               <span>HORAS</span>
                         </div>
                         <svg class="circ__main"
                              xmlns="http://www.w3.org/2000/svg"version="1.1" width="7rem" height="7rem" viewBox="0 0 90 90">
                              <circle cx="50%" cy="50%" r="40" stroke="#1B262C" stroke-linecap="round"/> 
                         </svg>
                         <svg class="circle__color"
                             xmlns="http://www.w3org/2000/svg" version="1.1" width="7rem" height="7rem"viewBox="0 0 90 90">
                             <defs>
                                 <linearGradient id="gradient1">
                                     <stop offset="0%" stop-color="#7AD3FF" />
                                     <stop offset="100%" stop-color="#11AFFF" />
                                 </linearGradient>
                             </defs>
                             <circle class="progress__circle batteryLife" cx="50%" cy="50%" r="40" stroke-linecap="round"/>
                         </svg>             
                    </div>
                    <div class="circle__load">
                        <div class="text__circle">
                              <span>Tiempo de carga</span>
                              <span class="number">${others.chargeTime[0].value}</span>
                              <span>MINUTOS</span>
                        </div>
                        <svg class="circ__main"
                             xmlns="http://www.w3.org/2000/svg"version="1.1" width="7rem" height="7rem" viewBox="0 0 90 90">
                             <circle cx="50%" cy="50%" r="40" stroke="#1B262C" stroke-linecap="round"/> 
                        </svg>
                        <svg id="#chargeTime" class="circle__color"
                            xmlns="http://www.w3org/2000/svg" version="1.1" width="7rem" height="7rem"viewBox="0 0 90 90">
                            <defs>
                                <linearGradient id="gradient2">
                                    <stop offset="0%" stop-color="#DD486B" />
                                    <stop offset="100%" stop-color="#FB93AC" />
                                </linearGradient>
                            </defs>
                            <circle class="progress__circle chargeTime" cx="50%" cy="50%" r="40" stroke-linecap="round"/>
                        </svg>             
                    </div>
                    
                </div>
        </div>
`
	// capturo los ids de cada barrita       
	barBlue = document.getElementById('barBlue');
	barPink = document.getElementById('barPink');
	barOrange = document.getElementById('barOrange');
	barGreen = document.getElementById('barGreen')

	circleBarBlue = document.querySelector('.batteryLife')
	circleBarPink = document.querySelector('.chargeTime')

	darEstilos() // le doy los estilos
	insertarTooltips()
}

const darEstilos = () => { // para darle elcolor y % a cada barra
	barBlue.style.width = `${energy}%`;
	barBlue.style.background = "var(--blueGradient)";
	barPink.style.width = `${maintenance}%`;
	barPink.style.background = "var(--pinkGradient)";
	barOrange.style.width = `${complexity}%`;
	barOrange.style.background = "var(--orangeGradient)";
	barGreen.style.width = `${security}%`;
	barGreen.style.background = "var(--greenGradient)";

	circleBarBlue.style.strokeDasharray = 200;
	circleBarPink.style.strokeDasharray = 170;
}
// ------------------------------------------------------
//EN LA PESTANA CONSEJOS
 const crearConsejos = ( robots, indiceRobot) => {
    const adviceRobot = robots[indiceRobot][0].advice[0]
	contentActive.innerHTML = `
             <div id="adviceItems" class="advice">
                <ul class="advice__list">
                    ${crearLiConsejos(robots, indiceRobot)}
                    <li>Activar el comando de voz en el primer encendido simplificará su configuración, ya que {nombreRobot} seguirá sus ordenes al instante y lo ayudará  con los pasos de la instalación.</li>
                    <li>Cargar el dispositivo al menos 2hs. antes de la primer configuración.</li>
                    <li>{nombreRobot} funcionará alrededor de 72 hs. con una sola carga, pero aconsejamos conectar su batería a la eléctricidad durante al menos 30 minutos diarios para garantizar la ejecución de todas sus funciones.</li>
                    <li>{nombreRobot} tiene una función de alarma que puede activarse mediante control remoto.</li>
                    <li>Vincular a todos los integrantes de su familia con el comando de voz, rango de edad y sexo garantiza exactitud en el del comportamiento y adaptabilidad de {nombreRobot} con cada uno de los individuos.</li>
                    <li><a href="#">Descarga el manual de usuario aqui</a></li>
  </ul>
</div>
        `
const crearLiConsejos = () => {
const ulAdvice = document.querySelector('advice__list')


 return adviceRobot.map(x => `<li>${x}</li>`).join('')
    // for (const item in lista) {
    //     //     ulAdvice.innerHTML += `<li id='${item}'>${item} - ${lista[item]}</li>`
    //     // }
// 	return adviceRobot.map(([key, value]) => {
// 		for(key == "item") {
// 			return adviceRobot.map(x => `<li>${x}</li>`).join('')
// 		}
// 	}).join('')
 }
}

const crearFicha = (robots, indiceRobot) =>{
    const dataSheetRobot = robots[indiceRobot][0].dataSheet[0]
    contentActive.innerHTML = `
    <div id="dataSheet" class="data__sheet">          
                <table>
                        <tbody>   
                            <tr>
                               <td class="title__table">
                                   <h4>TAMAÑO</h4>
                               </td>

                               <td class="info__table">
                                   <ul class="info__table">
                                       <li>ALTO: ${dataSheetRobot.size[0].height} cm</li>
                                       <li>ANCHO: ${dataSheetRobot.size[0].width} cm</li>
                                       <li>DIAMETRO: ${dataSheetRobot.size[0].diameter} cm</li>
                                   </ul>
                                </td>

                                <td class="items table">
                                      <ul class="lista__datasheet">
                                              <li>Ruedas reforzadas, resistentes a impactos.</li>
                                              <li>Remaches seguros.</li>
                                              <li>Pintura antioxidante, libre de tóxicos.</li>
                                              <li>Pantalla LED blindada.</li>
                                              <li>Sensores antichoques.</li>
                                      </ul> 
                                </td>
                            </tr>
                        </tbody>
                </table>

                <section class="datasheet__text">
                    <span class="span"><h3>${robot[indiceRobot].name}</h3> ${dataSheetRobot.description} <a href="#">(disponibles en nuestra tienda)</a></span>
                        <span><h3>Funcionamiento:</h3> ${dataSheetRobot.operation}</span>
                        <span><h3>Accesorios:</h3>
                            <ul>
                                <li>Control Remoto</li>
                                <li>Correa extensible</li>
                                <li>Su juguete favorito “Mummy”</li>
                                <li>Calcomanías</li>
                            </ul>
                          <a href="">  Descarga la Ficha completa aqui</a></span>
                </section>
        </div>

    `
}





// TOOLTIPS esto no lo estoy usando todavia 
const insertarTooltips = () => {
	const barrita = document.getElementById('stadisticsItems')
	const contenedorBarras = barrita.children
	const barras = Array.from(contenedorBarras)
	//console.log(barras)
	barras.forEach(barra => {
		barra.addEventListener('click', e => {
			//console.log(e.currentTarget.id)
			if (e.currentTarget.id == 'energyBar') {
				console.log('barra 1')
				//crearTooltip(e.currentTarget)
				// energyBar.innerHTML =`
				// <div id="tool" class="tooltip">
				//      <h5>energia 50%</h5>
				//      <p>controla su gasto de energía tomando pequeñas siestas mientras tu descansas.
				//     Su gasto máximo puede llegar al 80% luego de una tarde jugando en el jardín, reservando el 20% para protegerte por las noches.
				//     Tiempo de carga de bateria (100%): 2hs.</p>
				// // </div>`
			} else if (e.currentTarget.id == 'maintenanceBar') {
				console.log('barra 2')
				//crearTooltip(robot)
			} else if (e.currentTarget.id == 'complexBar') {
				console.log('barra 3')
			} else if (e.currentTarget.id == 'securityBar') {
				console.log('barra 4')
			}
		})
	})
}

// crearTooltip = (robots, indiceRobot) => { //quiero crear un tooltip por cada barra
// 	//no se que poner aca-->
// 	e.currentTarget.innerHTML = `
//     <div class="tooltip">
//          <h5>${robots[indiceRobot][0].statistics[0].energy[0].value}</h5>
//          <p>controla su gasto de energía tomando pequeñas siestas mientras tu descansas.
//         Su gasto máximo puede llegar al 80% luego de una tarde jugando en el jardín, reservando el 20% para protegerte por las noches.
//         Tiempo de carga de bateria (100%): 2hs.</p>
//     </div>`
// }

/////////////////////////////////////////////

// DEFINIENDO LOS ESTADOS ACTIVOS / INACTIVOS DE LA FICHA

const tabControl = document.getElementById('tabControl')
const tabsContainer = tabControl.children
const tabs = Array.from(tabsContainer)

//console.log(tabs)

tabs.forEach(tab => {
	tab.addEventListener('click', e => {
		const target = e.currentTarget
        const adviceItems = document.querySelector("adviceItems")
		console.log(target)
        
            if(target.id == "tabConsejos"){
                    console.log('entre a consejos')
                    stadisticsItems.style.display = "hidden";
                    crearConsejos()
            }if(target.id == "tabEstadisticas"){
                    console.log('entro en estadisticas')
                    adviceItems.style.display = "hidden";
                    // crearEstadisticas(robots)

                    
            }if(target.id == "tabFicha"){
                    console.log('entre a ficha')
            }
        

		target.classList.add('tab__active')
		const arrayHermanos = tabs.filter((tab) => tab.id != target.id)
		arrayHermanos.forEach(tab => {
			tab.classList.remove('tab__active')
            // insertarConsejos()
		})
	})
   
})



//el contador
obtenerCircunsferencia = () => {
	const circle = document.querySelector(".progress__circle");
	const circumference = circle.getTotalLength()

	const uploadPercentage = [0, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100]
	let i = 0;

	const interval = setInterval(() => {
		circle.style.strokeDashoffset =
			circumference - (uploadPercentage[i] / 100) * circumference;
		i++;
		console.log(i)
		if (i == uploadPercentage.length) {
			clearInterval(interval);
		}
	}, 200);

	console.log(circumference)
}

//////////////////////////////  MENU  //////////////////////////////

//menu hamburguesa
const navMenu = document.getElementById('nav-menu'),
	navToggle = document.getElementById('nav-toggle'),
	navClose = document.getElementById('nav-close')
//mostrar menu
if (navToggle) {
	navToggle.addEventListener('click', () => {
		navMenu.classList.add('show-menu')
	})
}
if (navClose) {
	navClose.addEventListener('click', () => {
		navMenu.classList.remove('show-menu')
	})
}
