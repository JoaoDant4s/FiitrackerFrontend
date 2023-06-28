import moment from "moment";

export const getTime = () => {
    const horaAtual = moment().format('HH');
    const minutosAtuais = moment().format('mm');
    const segundosAtuais = moment().format('ss');
    return horaAtual + ":" + minutosAtuais + ":" + segundosAtuais
}

export const getDay = (data) => {
    return moment(data, 'DD-MM-YYYY').format('DD')
}