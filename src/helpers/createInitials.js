
export const createInitials = (nomeCompleto) => {
    const partesDoNome = nomeCompleto.split(" ")

    if(partesDoNome.length >= 2){
        return partesDoNome[0][0].toUpperCase() + partesDoNome[1][0].toUpperCase()
    }
    return partesDoNome[0][0].toUpperCase()
}