const activeSlider = document.getElementById('contenedorRobots')
//<--inserto vista previa del robot --> crearSliderRobot 

const header = document.getElementById('header'),
      main = document.getElementById('main'),//<-- solo contiene el home/inicio

      perfilRobot = document.getElementById('perfilRobot'),
      sectionPerfilRobots = document.getElementById('sectionPerfilRobots') //<-- seccion perfil completo

const stadisticsItems = document.getElementById('stadisticsItems') //innerHTML de crearEstadisticas

let indiceRobot = 0 // ya le indico que arranca desde el 0 (el 0 es Winston)

/////////////////////////////////////////

//Espero que cargue en el window
if(window){
    window.addEventListener('DOMContentLoaded', ()=>{
        obtenerDatos(indiceRobot)
    })
}
//llamo a mi archivo json
async function obtenerDatos(indiceRobot){
    const response = await fetch("http://127.0.0.1:5500/robots.json");
    const robots = await response.json();

    console.log(robots[0])//<--- es para guiarme 

    // pruebo de localizar cada indice para las tabs / ESTADISTICAS / BARRAS DE COLOR / solo el .value es el que voy a usar para esto
    energy = robots[indiceRobot][0].statistics[0].energy[0].value,
    maintenance = robots[indiceRobot][0].statistics[0].maintenance[0].value,
    complexity = robots[indiceRobot][0].statistics[0].complexity[0].value,
    security = robots[indiceRobot][0].statistics[0].security[0].value

    ////////  FUNCIONES QUE SE EJECUTAN AL CARGAR EL .JSON  ////////

    //ejecuto la funcion y creo slider , tambien la tabla de precios
    crearSliderRobot(robots, indiceRobot) // mi array robot +
    //crearTablaPrecios(planes)
    capturarEventoArrow(robots, indiceRobot) //<-- guarde el evento de las flechas del slider
    capturarEventoBotonVerFicha() // <-- guarde el evento click sobre el boton "ver ficha" y "back"
    crearPerfil(robots, indiceRobot)
    crearEstadisticas(robots, indiceRobot)
    //crearTooltip(robots,indiceRobot)
    

}


//creo slider con template --- en el home/inicio -- no en la seccion de datos del robot
crearSliderRobot = (robots, indiceRobot) => { // e inserto el html dentro de section id robots
    //analizar como cambiar el "href" del boton en cada "previa de robot" (y si uso un switch para comparar el contexto del boton? --> fileRobotBtn)

    activeSlider.innerHTML = `
            <i id="arrowLeft" class='bx bx-chevron-left'></i>
            <div id="sliderElement">
                        <img class="image__robot" src="${robots[indiceRobot][0].src}" alt="robot">
                        <div class ="text__robot__slider">
                             <h2 class="robot__name title">${robots[indiceRobot][0].name}</h2>
                             <h3 class="s__work">${robots[indiceRobot][0].type}</h3>
                             <p class="description__text">${robots[indiceRobot][0].description}</p>
                        </div>
                        <a href="#" id="fileRobotBtn" class="btn lineal__btn lineal__warning">Ver Ficha Completa</a>                   
            </div>
            <i id="arrowRight" class='bx bx-chevron-right'></i>
    `
}

//VISTA PREVIA DEL ROBOT EN EL INICIO

//eventListener de arrows // al hacer click activa la funcion de crearSliderRobot
const capturarEventoArrow = (robots, indiceRobot) =>{ 
    document.addEventListener('click', (e) =>{ 
        e.preventDefault
        //e.cancelBubble  
        if(e.target.id === 'arrowRight') { 
            indiceRobot++  //incremento el indice
            // console.log('-----------');
            // console.log('Aumentando' + indiceRobot)
            //console.log('Aumentando' + robots.length)
            if(indiceRobot == robots.length){
                indiceRobot = 0
            }
            crearSliderRobot(robots, indiceRobot);

        }else if(e.target.id === 'arrowLeft'){
            indiceRobot-- //resto el indice
            //console.log('-----------');
            //console.log('Restando' + robots.length)
            //console.log('Aumentando' + indiceRobot)
            if(indiceRobot < 0){
                indiceRobot = robots.length - 1
            }
            crearSliderRobot(robots, indiceRobot);
        }
    })
}
 //EVENTLISTENER DEL BOTON "VER FICHA"
const fileRobotBtn = document.getElementById('fileRobotBtn') //este es el boton que crea la seccion completa

const capturarEventoBotonVerFicha = () => { // guardo el evento al clikear el boton "Ver Ficha Robot"
    document.addEventListener('click', e =>{
        e.preventDefault()
        e.stopPropagation()
        // esto no anda aca --> crearPerfil(robots, indiceRobot) //<-- ejecuto la seccion completa del robot seleccionado //le cambio el display para que se muestre al hacer click en el boton
        if(e.target.id == 'fileRobotBtn'){
            main.classList.add('display__none');
            header.classList.add('display__none');
            sectionPerfilRobots.classList.remove('display__none') 
            sectionPerfilRobots.classList.add('perfilRobotActive') ;
        }
        if(e.target.id === 'backBtn'){ // y ahora la flecha back le devuelve el display anterior
            main.classList.remove('display__none');
            header.classList.remove('display__none');
            sectionPerfilRobots.classList.remove('perfilRobotActive')
        }
    })
}

////////////////////////////////////////////////////////////

//OBJETO TABLA PRECIOS

const prices = document.getElementById('prices')

const planes ={
    title: 'Plan Anual',
    anualprice: 60000,
    mensualprice: 5000,
    item:['Control Remoto y Accesorios','Cobertura 100% en daños de la unidad',
        'Asistencia Técnica Virtual 24/7','Mantenimiento mensual sin cargo','Elección de Color de pintura','Beneficios Socio Robot']                   
}

//cargo los items del objeto tabla de precios como un li
const cargarItemsTabla = () =>{
    let datosPlanes = Object.entries(planes)
    let itemsArray = planes.item
    
    return datosPlanes.map(([key, value]) => {
        if(key == "item") {
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

///////////////////////////////////////////////////////////
///////////////// PERFIL ROBOT ///////////////////////////

//console.log(robots[0][0].statistics[0].complexity[0].value)  


crearPerfil = (robots, indiceRobot) =>{ // TEMPLATE que quiero insertar en PERFIL ROBOT
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

crearEstadisticas = (robots) => { //el template con los ids que guardo luego
    stadisticsItems.innerHTML = `
        <div class="bar__item" id="energyBar">
            <p>Energia</p>
            <div class="bar__color">
                <div id="barBlue" class="clr"></div>
            </div>
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
            
        </div>`
    // capturo los ids de cada barrita       
    barBlue = document.getElementById('barBlue');
    barPink = document.getElementById('barPink');
    barOrange = document.getElementById('barOrange');
    barGreen = document.getElementById('barGreen')

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
}

// TOOLTIPS
const insertarTooltips = () => {
    const barrita = document.getElementById('stadisticsItems')
    const contenedorBarras = barrita.children
    const barras = Array.from(contenedorBarras)
    console.log(barras)
    barras.forEach( barra => {
        barra.addEventListener('click', e =>{
            //console.log(e.currentTarget.id)
            if(e.currentTarget.id == 'energyBar'){
                console.log('barra 1')
                crearTooltip(e.currentTarget)
                // e.currentTarget.innerHTML = `
                // <div id="tool" class="tooltip">
                //      <h5>energia 50%</h5>
                //      <p>controla su gasto de energía tomando pequeñas siestas mientras tu descansas.
                //     Su gasto máximo puede llegar al 80% luego de una tarde jugando en el jardín, reservando el 20% para protegerte por las noches.
                //     Tiempo de carga de bateria (100%): 2hs.</p>
                // </div>`
            }else if(e.currentTarget.id == 'maintenanceBar'){
                console.log('barra 2')
                //crearTooltip(robot)
            }else if(e.currentTarget.id == 'complexBar'){
                console.log('barra 3')
            }else if(e.currentTarget.id == 'securityBar'){
                console.log('barra 4')
            }
        })
    })
    
}

crearTooltip = (robots, indiceRobot) => { //quiero crear un tooltip por cada barra
    //no se que poner aca-->
    e.currentTarget.innerHTML = `
    <div class="tooltip">
         <h5>${robots[indiceRobot][0].statistics[0].energy[0].value}</h5>
         <p>controla su gasto de energía tomando pequeñas siestas mientras tu descansas.
        Su gasto máximo puede llegar al 80% luego de una tarde jugando en el jardín, reservando el 20% para protegerte por las noches.
        Tiempo de carga de bateria (100%): 2hs.</p>
    </div>`
}


    
// switch ('energyBar') {
//         case 'energyBar':
//                console.log('hago algo en r1')      
//             break;
//         case 'maintenace':
//             console.log('hago algo en r2')   
//             break;

//         case 'complexity':
//             console.log('hago algo en r3')
//             break;

//         case 'security':
//             console.log('hago algo en r4')

//             break;
//     }



//////////////////////////////  MENU  //////////////////////////////

//menu hamburguesa
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')
    //mostrar menu
    if(navToggle){
        navToggle.addEventListener('click', ()=>{
            navMenu.classList.add('show-menu')
        })
    }
    if(navClose){
        navClose.addEventListener('click',()=>{
            navMenu.classList.remove('show-menu')
        })
    }
