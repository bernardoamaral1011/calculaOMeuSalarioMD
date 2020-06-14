import "../css/styles.css";

let calcButton = document.getElementById("button-1-b");
calcButton.addEventListener("click", calcResult, false);

function calcResult() {
  
  let hSemanais = document.getElementById("f1").value;
  let cMedioConsulta = document.getElementById("f2").value;
  let nMedioConsultasDia = document.getElementById("f3").value;
  let nMedioConsultasDesmDia = document.getElementById("f4").value;
  let percentagem = document.getElementById("f5").value / 100;
  let nDiasPSemana = document.getElementById("f6").value;

  // Verify if any of inputs is nulxl, then output if true
  console.log(percentagem)
  if (
    hSemanais === "" ||
    cMedioConsulta === "" ||
    nMedioConsultasDia === "" ||
    nMedioConsultasDesmDia === "" ||
    percentagem === 0 ||
    nDiasPSemana === ""
  ) {
    let warn = document.getElementById("warning");
    warn.innerHTML = "Atenção: Todos os campos devem estar preenchidos!";
  } else {
    let warn = document.getElementById("warning");
    warn.innerHTML = "";

    let ordenadoDia = (nMedioConsultasDia - nMedioConsultasDesmDia) * cMedioConsulta * percentagem;
    let ordenadoSem = ordenadoDia * nDiasPSemana;
    let valorPHora = ordenadoSem / hSemanais;
    let ordenadoMensalB = ordenadoSem * 4;
    let ordenadoMensalL = 0;

    if (ordenadoMensalB * 12 >= 10000) {
      ordenadoMensalL =
        ordenadoMensalB -
        ordenadoMensalB * 0.25 -
        0.214 * 0.7 * ordenadoMensalB;
    } else {
      ordenadoMensalL = ordenadoMensalB - 0.214 * 0.7 * ordenadoMensalB;
    }

    // colocar resultados nos p's
    document.getElementById("o_dia").innerHTML = "Ordenado por dia: ";
    document.getElementById("o_sem").innerHTML = "Valor por hora: ";
    document.getElementById("o_bru").innerHTML = "Ordenado mensal bruto: ";
    document.getElementById("o_liq").innerHTML = "Ordenado mensal líquido: ";

    document.getElementById("o_dia_v").innerHTML = ordenadoDia.toFixed(0) + "€";
    document.getElementById("o_sem_v").innerHTML = valorPHora.toFixed(0) + "€";
    document.getElementById("o_bru_v").innerHTML =
      ordenadoMensalB.toFixed(0) + "€";
    document.getElementById("o_liq_v").innerHTML =
      ordenadoMensalL.toFixed(0) + "€";

    let comp = ordenadoMensalL - 755.51;
    let aux = "";
    let aux2 = "";
    let comp2 = hSemanais*4 - 40*4;  

    if (comp >= 0) {
      aux =
        "Ganhas mais " +
        Math.abs(Math.round((comp + Number.EPSILON) * 100) / 100).toFixed(0) +
        "€ que o ordenado mínimo!";
    } else{
      aux =
        "Ganhas menos " +
        Math.abs(Math.round((comp + Number.EPSILON) * 100) / 100).toFixed(0) +
        "€ que o ordenado mínimo!";
    }


    if (comp2 > 0) {
      aux2 =
        "Trabalhas mais " +
        Math.abs(comp2).toFixed(0) +
        " horas que um trabalhador de ordenado mínimo.";
    } else if(comp2 < 0){
      aux2 =
        "Trabalhas menos " +
        Math.abs(comp2).toFixed(0) +
        " horas que um trabalhador de ordenado mínimo.";
    } else {
      aux2 =
        "Trabalhas o mesmo número de horas que um trabalhador de ordenado mínimo.";
    }

    document.getElementById("comp").innerHTML = aux;
    document.getElementById("comp2").innerHTML = aux2;

  }
}

window.isNumberKey = function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

  return true;
};

/*
preçoconsulta
nconsultas
nº horas por semana
ndesmarcadas
nº dias por semana
percentagem

ordenado por semana -> valor por hora

trabalhas mais X horas que um trabalhador de ordenado mínimo

*/
