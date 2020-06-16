import Salary from "./salary";
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

  if (
    !Salary.checkValues(
      hSemanais,
      cMedioConsulta,
      nMedioConsultasDia,
      nMedioConsultasDesmDia,
      percentagem,
      nDiasPSemana
    )
  ) {
    let warn = document.getElementById("warning");
    warn.innerHTML =
      "Atenção: Todos os campos devem estar devidamente preenchidos!";
  } else {
    let warn = document.getElementById("warning");
    warn.innerHTML = "";

    let mySalary = new Salary(
      hSemanais,
      cMedioConsulta,
      nMedioConsultasDia,
      nMedioConsultasDesmDia,
      percentagem,
      nDiasPSemana
    );
    document.getElementById("o_dia").innerHTML = "Valor ganho por dia: ";
    document.getElementById("o_sem").innerHTML = "Valor ganho por hora: ";
    document.getElementById("o_bru").innerHTML = "Ordenado mensal bruto: ";
    document.getElementById("o_liq").innerHTML = "Ordenado mensal líquido: ";

    document.getElementById("o_dia_v").innerHTML =
      mySalary.ordenadoDia.toFixed(0) + "€";
    document.getElementById("o_sem_v").innerHTML =
      mySalary.valorPHora.toFixed(0) + "€";
    document.getElementById("o_bru_v").innerHTML =
      mySalary.ordenadoMensalB.toFixed(0) + "€";
    document.getElementById("o_liq_v").innerHTML =
      mySalary.ordenadoMensalL.toFixed(0) + "€";

    if (mySalary.compMinimoLiquido >= 0) {
      document.getElementById("comp").innerHTML =
        "Ganhas mais " +
        Math.abs(mySalary.compMinimoLiquido).toFixed(0) +
        "€ líquidos que o ordenado mínimo!";
    } else {
      document.getElementById("comp").innerHTML =
        "Ganhas menos " +
        Math.abs(mySalary.compMinimoLiquido).toFixed(0) +
        "€ líquidos que o ordenado mínimo!";
    }

    if (mySalary.compMinimoHoras > 0) {
      document.getElementById("comp2").innerHTML =
        "Trabalhas mais " +
        Math.abs(mySalary.compMinimoHoras).toFixed(0) +
        " horas/mês que um trabalhador de ordenado mínimo.";
    } else if (mySalary.compMinimoHoras < 0) {
      document.getElementById("comp2").innerHTML =
        "Trabalhas menos " +
        Math.abs(mySalary.compMinimoHoras).toFixed(0) +
        " horas/mês que um trabalhador de ordenado mínimo.";
    } else {
      document.getElementById("comp2").innerHTML =
        "Trabalhas o mesmo número de horas que um trabalhador de ordenado mínimo.";
    }
  }
}

// only numbers are accepted as input
window.isNumberKey = function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

  return true;
};
