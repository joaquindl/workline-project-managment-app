window.addEventListener('load', () => {

    // // Apertura modal
    // const btn = document.getElementById('dropdown-edit');
    // const modal = document.getElementById('modal-user-edit');
    
    // btn.addEventListener('click', () => {
    //     modal.style.display = 'block';
    // })
    
    // // Cerrar modal
    // window.addEventListener('click', event => {
    //     if(event.target == modal) {
    //         modal.style.display = 'none';
    //         modalDelete.style.display = 'block'
    //     }
    // })

    // Desplegar cambiar contraseña
    const passbtn = document.getElementById('edit-password-btn')
    const passInputs = document.getElementById('edit-password-inputs');

    passbtn.addEventListener('click', () => {
        passInputs.style.display = 'block';
    })

})

