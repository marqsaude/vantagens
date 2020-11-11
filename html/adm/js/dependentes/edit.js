/**
 * Created by tony on 29/12/17.
 */

function submitEditarDependente(){
    jQuery("#editDependente").submit();
}

function validaEditarDependentes(obj){
    var html = "";
    var array = new Array(3);
    if(obj.nm_cliente.value==""){
        html += "Nome do Cliente vazio!\n";
    }
    if(obj.dt_nascimento.value==""){
        html += "Data de Nascimento do Cliente vazio!\n";
    }
    if(obj.nu_cpf.value==""){
    }else{
        if(validarCPF(obj.nu_cpf.value)==false){
            html += "CPF inválido. Tente novamente!\n";
        }
    }
    if(obj.nm_email.value==""){
        html += "Email do Cliente vazio!\n";
    }
    if(validaEmail(obj.nm_email)==false){
        html += "Email inválido. Tente novamente!\n";
    }
    if(html != "") {
        alert(html);
    }else{
        var arrayDependente = {"co_seq_dependentes":obj.co_seq_dependentes.value, "co_seq_cliente":obj.co_seq_cliente.value, "nm_dependente":obj.nm_dependente.value, "dt_nascimento":obj.dt_nascimento.value, "nu_rg":obj.nu_rg.value, "nu_cpf":obj.nu_cpf.value, "nm_email":obj.nm_email.value};
        ajaxPost(funcaoEditDependentes, arrayDependente, "/dependente/ajax-edit/", "/admin");
    }
    return false;
}

var funcaoEditDependentes = function(json){
    if(json!=null){
        alert("Editado com sucesso!");
        window.location.href = getUrlController() + "/admin/dependente/index/id/"+json.data["idCliente"];
    }
};

function validarCPF(cpf){
    var filtro = /^\d{3}.\d{3}.\d{3}-\d{2}$/i;
    if(!filtro.test(cpf)){
        //window.alert("CPF inválido. Tente novamente.");
        return false;
    }

    cpf = remove(cpf, ".");
    cpf = remove(cpf, "-");

    if(cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
        cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
        cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
        cpf == "88888888888" || cpf == "99999999999"){
        //window.alert("CPF inválido. Tente novamente.");
        return false;
    }

    soma = 0;
    for(i = 0; i < 9; i++)
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    resto = 11 - (soma % 11);
    if(resto == 10 || resto == 11)
        resto = 0;
    if(resto != parseInt(cpf.charAt(9))){
        //window.alert("CPF inválido. Tente novamente.");
        return false;
    }
    soma = 0;
    for(i = 0; i < 10; i ++)
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if(resto == 10 || resto == 11)
        resto = 0;
    if(resto != parseInt(cpf.charAt(10))){
        //window.alert("CPF inválido. Tente novamente.");
        return false;
    }
    return true;
}

function remove(str, sub) {
    i = str.indexOf(sub);
    r = "";
    if (i == -1) return str;
    r += str.substring(0,i) + remove(str.substring(i + sub.length), sub);
    return r;
}

function validaEmail(field) {
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);

    if ((usuario.length >=1) &&
        (dominio.length >=3) &&
        (usuario.search("@")==-1) &&
        (dominio.search("@")==-1) &&
        (usuario.search(" ")==-1) &&
        (dominio.search(" ")==-1) &&
        (dominio.search(".")!=-1) &&
        (dominio.indexOf(".") >=1)&&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    }
    else{
        return false;
    }
}

function insertMask() {
    jQuery('.date-picker').datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: "-100:+0",
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        currentText: 'Mês Atual',
        closeText: 'Atualizar'
    });
    jQuery(".nu_cpf").mask("999.999.999-99");
    jQuery(".nu_cep").mask("99.999-999");
    jQuery(".nu_rg").mask("999999999999");
    jQuery(".nu_endereco").mask("9999999");
}

$(function () {
    insertMask();
});