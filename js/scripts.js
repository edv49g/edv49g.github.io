let indice = 0;
//let color = "#cb4335";
let oscuro = true;
let cant = 7;
let x0 = 0, t0 =0;
let guardia = [1,2,3,4,5,6];
const colores = ["#6ec16e", "#d28a31", "#9a2626", "#4d4dcc", "#2727d2", "#17202a","#17202a","#17202a"]; // corresponden con M,T,N,D,R,FC,FL2,FL1
const diaSemana = [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let patron = [1, 1, 1, 2, 2, 3, 3, 8, 8, 8, 8, 8, 1, 1, 2, 2, 2, 3, 3, 7, 7, 7, 7, 7, 1, 1, 2, 2, 3, 3, 3, 6, 6, 4, 4, 4, 5, 5, 4, 4, 6, 6]; //1:M , 2:T, 3:N, 4:D
const clases = ["M", "T", "N", "D", "D", "F", "F", "F"];
FechaOrigen = new Date();
FechaInicio = new Date(2022,03,01); //G1, G2=G1-7d, Gx=G1-7*(x-1)d
function inicializar(){
	CrearTabla();
	document.getElementById("close").addEventListener("click", CerrarModal, false); //para celular
	document.getElementById("almanaque").addEventListener("touchmove", deslizar, false); //para celular
	document.getElementById("almanaque").addEventListener("touchstart", inicioToque, false); //para celular
	document.getElementById("calendario").addEventListener("touchmove", deslizar2, false); //para celular
	document.getElementById("calendario").addEventListener("touchstart", inicioToque2, false); //para celular
	document.getElementById("mes1").addEventListener("click", modificarMes, false);
	document.getElementById("mes2").addEventListener("click", modificarMes, false);
	document.getElementById("up1").addEventListener("click", incDD, false);
	document.getElementById("up2").addEventListener("click", incMM, false);
	document.getElementById("up3").addEventListener("click", incYY, false);
	document.getElementById("dw1").addEventListener("click", decDD, false);
	document.getElementById("dw2").addEventListener("click", decMM, false);
	document.getElementById("dw3").addEventListener("click", decYY, false);
	document.getElementById("modal").style.display = "none";
	mostrarSolapa(1);
	actualizar();
}
function deslizar(event){ //para celular
	if(!x0) return;
	var x = event.touches[0].clientX;
	let dX = x-x0;
	if( Math.abs(dX)>60){
		t0++;
		if(t0>3){
			dX>0?diaAnterior():diaSiguiente();
			t0=0;
		}
	}
	x = null;
}
function inicioToque(event){ //para celular
	const primero = event.touches[0];
	x0 = primero.clientX;
	t0=0;
}
function deslizar2(event){ //para celular
	if(!x0) return;
	var x = event.touches[0].clientX;
	let dX = x-x0;
	if( Math.abs(dX)>60){
		t0++;
		if(t0>4){
		     dX>0?mesPrevio():mesProximo();
		     t0=0;
		}
	}
	x = null;
}
function inicioToque2(event){ //para celular
	const primero = event.touches[0];
	x0 = primero.clientX;
	t0=0;
}
function CerrarModal(event){
	document.getElementById("modal").style.display = "none";
	actualizar();
}
function calendario(){
	let dias;
	const Fecha = new Date(FechaOrigen);
	let ddias = Math.floor(Math.abs(FechaInicio-FechaOrigen)/(1000*3600*24)); //diferencia de dias al primero de mes
	ddias = (ddias+42-FechaOrigen.getDate())%42; //transformo en indice para buscar en patron[]
	Fecha.setDate(1); //primer dia del mes
	const inicio = Fecha.getDay();
	const tablita = document.getElementById("calendario");
	tablita.lastChild.firstChild.childNodes[1].innerHTML = meses[Fecha.getMonth()] + " - " + Fecha.getFullYear();
	dias = 1;
	ultimo = 32 - new Date(Fecha.getFullYear(), Fecha.getMonth(), 32).getDate();
	for(j=1; j<7; j++){
		for(i=0; i<7; i++){
			tablita.lastChild.childNodes[j*2+2].childNodes[i].removeAttribute("style");//blanqueo estilo si tiene
		    if ( (j-1)*7+i+1>inicio && dias<ultimo+1 ){
			tablita.lastChild.childNodes[j*2+2].childNodes[i].innerHTML = dias;
			//tablita.lastChild.childNodes[j*2+2].childNodes[i].style = "background: " + colores[patron[(ddias+dias)%42]-1];
			tablita.lastChild.childNodes[j*2+2].childNodes[i].className = clases[patron[(ddias+dias)%42]-1];
			dias++;
		    } else {
			tablita.lastChild.childNodes[j*2+2].childNodes[i].innerHTML = "&nbsp;";
			//tablita.lastChild.childNodes[j*2+2].childNodes[i].removeAttribute("style");//blanqueo estilo si tiene
			tablita.lastChild.childNodes[j*2+2].childNodes[i].className = "F";
		    }
		}
	}
	//pintar el dia actual
	let Temporal = new Date();
	if( (Fecha.getFullYear() == Temporal.getFullYear()) && (Fecha.getMonth() == Temporal.getMonth()) ){
		let fila = Math.trunc((Temporal.getDate() + inicio -1)/7) + 2;
		let col = ((Temporal.getDate() + inicio+6) % 7);  
		tablita.lastChild.childNodes[fila*2].childNodes[col].style.outline = "3px solid red";
	}
}
function mesPrevio(){
	FechaOrigen.setMonth(FechaOrigen.getMonth()-1);
	actualizar();
}
function mesProximo(){
	FechaOrigen.setMonth(FechaOrigen.getMonth()+1);
	actualizar();
}
function actualizar(){
	const opcion = parseInt(document.getElementById("guardia").value);
	switch (opcion){
	case 1:
	    FechaInicio = new Date(2022,03,1); break;
	case 2:
	    FechaInicio = new Date(2022,02,25); break;
	case 3:
	    FechaInicio = new Date(2022,02,18); break;
	case 4:
	    FechaInicio = new Date(2022,02,11); break;
	case 5:
	    FechaInicio = new Date(2022,02,04);	break;
	case 6:
	    FechaInicio = new Date(2022,01,25);	break;
	}
	calendario();
	pintar();
}                           
function diaSiguiente(){
	let tmp = new Date(FechaOrigen);
	FechaOrigen.setDate(tmp.getDate()+1);
	actualizar();
}
function diaAnterior(){
	    let tmp = new Date(FechaOrigen);
	    FechaOrigen.setDate(tmp.getDate()-1);
	    actualizar();
}
function SumarDias(fecha, dias){
	const tmp = new Date(fecha);
	tmp.setDate(tmp.getDate() + dias);
	return tmp;
}
function pintar() {
	let tmp = new Date(FechaOrigen);
	tmp2 = new Date(2022,03,1); //dato de inicio de la guardia 1
	let tabla = document.getElementById("almanaque");

	tabla.lastChild.firstChild.childNodes[1].innerHTML = meses[FechaOrigen.getMonth()] + " - " + FechaOrigen.getFullYear();
	for(i=0; i<cant-1; i++){
		tabla.lastChild.childNodes[2].childNodes[i+1].innerHTML = diaSemana[(FechaOrigen.getDay()+i+5)%7];
		tmp = SumarDias(FechaOrigen, i-2);
		tabla.lastChild.childNodes[1].childNodes[i+1].innerHTML = tmp.getDate();
		indice = (Math.floor(Math.abs(tmp2-tmp)/(1000*3600*24)))%42; //averiguo para la G1
		//para una guardia X se tiene el mismo esquema de la G1 + 7*(7-X)
		//Gn+1 = (Gn + 7)%42
		guardia[0] = indice;
		for(j=0; j<5; j++){
		    guardia[j+1] = (guardia[j]+7)%42;
		    guardia[j] = patron[guardia[j]];
		}
		guardia[j] = patron[guardia[j]];

		for(j=0; j<8;j++){
			valor = guardia.indexOf(j+1)+1;
			tabla.lastChild.childNodes[3+j].childNodes[i+1].innerHTML = valor<1?"&nbsp;":valor;
			//tabla.lastChild.childNodes[3+j].childNodes[i+1].style.backgroundColor = colores[6]; //color de franco
			tabla.lastChild.childNodes[3+j].childNodes[i+1].className = "F";
			if(document.getElementById("guardia").value == valor){
				//tabla.lastChild.childNodes[3+j].childNodes[i+1].style.backgroundColor = color;
				tabla.lastChild.childNodes[3+j].childNodes[i+1].className = "guardia";
			}
		}
	}
	for(i=1; i<11; i++)
		tabla.lastChild.childNodes[i].childNodes[Math.round(cant/2)-1].className += " c";
}
function mostrarSolapa(solapa) {
	if(solapa == 1){
		document.getElementsByClassName("menu")[0].className = "menu plano1";
		document.getElementsByClassName("menu")[1].className = "menu plano2";
		//document.getElementsByClassName("menu")[0].style.backgroundColor = colores[6];
		//document.getElementsByClassName("menu")[1].style.backgroundColor = "inherit";
		//document.getElementsByClassName("menu")[0].style.color = "white";
		//document.getElementsByClassName("menu")[1].style.color = "#65696f";
		document.getElementById("solapa2").style.display = "none";
		document.getElementById("solapa1").style.display = "block";
	} else {
		document.getElementsByClassName("menu")[0].className = "menu plano2";
		document.getElementsByClassName("menu")[1].className = "menu plano1";
		//document.getElementsByClassName("menu")[1].style.backgroundColor = colores[6];
		//document.getElementsByClassName("menu")[0].style.backgroundColor = "inherit";
		//document.getElementsByClassName("menu")[1].style.color = "white";
		//document.getElementsByClassName("menu")[0].style.color = "#65696f";
		document.getElementById("solapa1").style.display = "none";
		document.getElementById("solapa2").style.display = "block";
	}
}
function modificarMes(){
	document.getElementById("modal").style.display = "block";
	desarmarFecha();
}
function CrearTabla(){
	const datos = [ "&nbsp;", "DIA", "M", "T", "N", "D", "R", "FC", "FL1", "FL2" ];
	//cant = window.innerWidth<600?7:42;
	cant = 7; //automatizar !!!
	texto = "<table class='tablita tabla2' id='almanaque'><tr>";
	texto += "<td><a href='#' onclick='diaAnterior()' class='nav'>&#9665;</a></td>";
	texto += "<td colspan='" + (cant-2) + "' class='mes' id='mes2'>fecha</td>";
	texto += "<td><a href='#' onclick='diaSiguiente()' class='nav'>&#9655;</a></td>";
	texto += "</tr>";
	for(fil=0; fil<10; fil++){
		texto += fil<2?"<tr class='col'>":"<tr>";
		for(col=0; col<cant; col++){
			if(col==0)
				texto += "<td class='col'>" + datos[fil] + "</td>";
			else {
				texto += (col==Math.round(cant/2)-1)?"<td class='c'>":"<td>";
				texto += (fil==1?diaSemana[col%7]:(fil+col)) + "</td>";
			}
		}
		texto += "</tr>";
	}
	texto += "</table>";
	document.getElementById("tabla2").innerHTML = texto;
	//pintar zona media
	for(i=1; i<11; i++)
		document.getElementById("almanaque").lastChild.childNodes[i].childNodes[Math.round(cant/2)-1].className = "c";
}
function incDD(){
	FechaOrigen.setDate(FechaOrigen.getDate()+1);
	desarmarFecha();
}
function decDD(){
	FechaOrigen.setDate(FechaOrigen.getDate()-1);
	desarmarFecha();
}
function incMM(){
	FechaOrigen.setMonth(FechaOrigen.getMonth()+1);
	desarmarFecha();
}
function decMM(){
	FechaOrigen.setMonth(FechaOrigen.getMonth()-1);
	desarmarFecha();
}
function incYY(){
	FechaOrigen.setFullYear(FechaOrigen.getFullYear()+1);
	desarmarFecha();
}
function decYY(){
	FechaOrigen.setFullYear(FechaOrigen.getFullYear()-1);
	desarmarFecha();
}
function desarmarFecha(){
	document.getElementById("dd").innerHTML = ("0" + FechaOrigen.getDate()).slice(-2);
	document.getElementById("mm").innerHTML = meses[FechaOrigen.getMonth()];
	document.getElementById("yyyy").innerHTML = FechaOrigen.getFullYear();
}
function actual() {
	FechaOrigen = new Date();
	desarmarFecha();
}
function modo() {
	if(oscuro){
		//colores para tema claro
		document.documentElement.style.setProperty("--fondo1", "#eef4f9"); //fdfdfd
		document.documentElement.style.setProperty("--frente1", "black");
		document.documentElement.style.setProperty("--fondo2", "#f5f5f5");
		document.documentElement.style.setProperty("--fondo3", "#e9e9e9");
		colores[5] = colores[6] = colores[7] = "#f5f5f5";
		document.getElementById("modo").innerHTML = "&#9686;";
	} else { //colores para tema oscuro
		document.documentElement.style.setProperty("--fondo1", "black");
		document.documentElement.style.setProperty("--frente1", "white");
		document.documentElement.style.setProperty("--fondo2", "#17202a");
		document.documentElement.style.setProperty("--fondo3", "#292e2f");
		colores[5] = colores[6] = colores[7] = "black";
		document.getElementById("modo").innerHTML = "&#10039;";
	}
	oscuro = !oscuro;
}
