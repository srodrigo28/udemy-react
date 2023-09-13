import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export function ShowMessage(mensagem, icone, selecionado) {
    const MySwal = withReactContent(Swal);
    selecionar(selecionado);
    MySwal.fire({
        title: mensagem,
        icon: icone
    })
}

function selecionar(selecionado) {
    if (selecionado !== '') {
        document.getElementById(selecionado).focus();
    }
}


