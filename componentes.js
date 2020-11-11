import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: '',
        cancelButton: ''
    },
    buttonsStyling: true
})

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export default {
    confirm: options => {
        options = Object.assign(
            {
                title: 'Atenção!',
                text: 'Tem certeza?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                confirmButtonColor: '#EF5350',
                cancelButtonText: 'Não',
                cancelButtonColor: '#64B5F6',
                reverseButtons: true,
            },
            options
        )

        return new Promise((resolve, reject) => {
            swalWithBootstrapButtons
                .fire(options)
                .then(result => resolve(result))
                .catch(error => reject(error))
        })
    },
    alert: mensagem_ou_options => {
        if (typeof mensagem_ou_options === 'string') {
            mensagem_ou_options = { text: mensagem_ou_options, icon: 'info' }
        }
        else {
            mensagem_ou_options = Object.assign({ text: mensagem_ou_options, icon: 'info' }, mensagem_ou_options)
        }

        mensagem_ou_options.timer = 0
        Toast.fire(mensagem_ou_options)

        Swal.fire(mensagem_ou_options)
    },
    toast: mensagem_ou_options => {
        if (typeof mensagem_ou_options === 'string') {
            mensagem_ou_options = { title: mensagem_ou_options, icon: 'info' }
        }
        mensagem_ou_options.timer = mensagem_ou_options.timer !== null ? mensagem_ou_options.timer : mensagem_ou_options.title.length * 50
        if(mensagem_ou_options.timer > 1 && mensagem_ou_options.timer < 3000){
            mensagem_ou_options.timer = 3000
        }
        Toast.fire(mensagem_ou_options)
    }
}
