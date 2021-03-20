//procurar o botão
document.querySelector("#add-time")
//ao clicar no botão
.addEventListener('click',cloneField) //ouve


//executar uma ação
function cloneField() {
    //console.log("Teste Botão") //teste para ve se esta funcionando
    //duplicar o campo, qual campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)//boleano: true or false

    //limpar os campos. que campos
    const fields = newFieldContainer.querySelectorAll('input')

    //console.log(fields) //prova real, teste

    //limpando campos -MANUALMENTE:
    //exemplo: 
    //field[0].value=""
    //0 = posição, que deseja limpar
    //colocar na pagina, onde??

    //limpando atraves de laços
    
    //para cada campo, limpar
    fields.forEach(function(field){
        //pega o field do momento e limpa ele
        field.value =""
    })

    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}
