import moment from "moment/moment";

function isDiaUtil(data) {
    const diaSemana = data.day();
    return diaSemana !== 0 && diaSemana !== 6;
}

export const obterUltimosCincoDiasUteis = () => {
    const diasUteis = [];
    let dataAtual = moment();
  
    while (diasUteis.length < 5) {
      if (isDiaUtil(dataAtual)) {
        diasUteis.push(dataAtual.format('DD-MM-YYYY'));
      }
      dataAtual = dataAtual.subtract(1, 'day');
    }
  
    return diasUteis;
}