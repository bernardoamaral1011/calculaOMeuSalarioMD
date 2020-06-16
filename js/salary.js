let ordenadoMinimoL = 755.51;
let horasPSemanaMinimo = 40;

export default class Salary {
  constructor(
    hSemanais,
    cMedioConsulta,
    nMedioConsultasDia,
    nMedioConsultasDesmDia,
    percentagem,
    nDiasPSemana
  ) {
    this.hSemanais = hSemanais;
    this.cMedioConsulta = cMedioConsulta;
    this.nMedioConsultasDia = nMedioConsultasDia;
    this.nMedioConsultasDesmDia = nMedioConsultasDesmDia;
    this.percentagem = percentagem;
    this.nDiasPSemana = nDiasPSemana;
  }

  get ordenadoDia() {
    return this.calcOrdenadoDia();
  }

  calcOrdenadoDia() {
    return (
      (this.nMedioConsultasDia - this.nMedioConsultasDesmDia) *
      this.cMedioConsulta *
      this.percentagem
    );
  }

  get ordenadoSem() {
    return this.calcOrdenadoSem();
  }

  calcOrdenadoSem() {
    return this.ordenadoDia * this.nDiasPSemana;
  }

  get valorPHora() {
    return this.calcValorPHora();
  }

  calcValorPHora() {
    return this.ordenadoSem / this.hSemanais;
  }

  get ordenadoMensalB() {
    return this.calcOrdenadoMensalB();
  }

  calcOrdenadoMensalB() {
    return this.ordenadoSem * 4;
  }

  get ordenadoMensalL() {
    return this.calcOrdenadoMensalL();
  }

  calcOrdenadoMensalL() {
    if (this.ordenadoMensalB * 12 >= 10000) {
      return (
        this.ordenadoMensalB -
        this.ordenadoMensalB * 0.25 -
        0.214 * 0.7 * this.ordenadoMensalB
      );
    } else {
      return this.ordenadoMensalB - 0.214 * 0.7 * this.ordenadoMensalB;
    }
  }

  get compMinimoLiquido() {
    return this.calcCompMinimoLiquido();
  }

  calcCompMinimoLiquido() {
    return this.ordenadoMensalL - ordenadoMinimoL;
  }

  get compMinimoHoras() {
    return this.calcCompMinimoHoras();
  }

  calcCompMinimoHoras() {
    return this.hSemanais * 4 - horasPSemanaMinimo * 4;
  }

  static checkValues(
    hSemanais,
    cMedioConsulta,
    nMedioConsultasDia,
    nMedioConsultasDesmDia,
    percentagem,
    nDiasPSemana
  ) {
    if (
      hSemanais === "" ||
      hSemanais === "0" ||
      cMedioConsulta === "" ||
      cMedioConsulta === "0" ||
      nMedioConsultasDia === "" ||
      nMedioConsultasDia === "0" ||
      nMedioConsultasDesmDia === "" ||
      percentagem === 0 ||
      nDiasPSemana === "" ||
      nDiasPSemana === "0" ||
      Number(nDiasPSemana) > 7 ||
      percentagem > 1 ||
      Number(cMedioConsulta) > 10000 ||
      Number(nMedioConsultasDia) > 100 ||
      Number(hSemanais) > 24 * 7 ||
      Number(nMedioConsultasDesmDia) >= Number(nMedioConsultasDia)
    ) {
      return false;
    }
    return true;
  }
}
