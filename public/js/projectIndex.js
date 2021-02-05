window.addEventListener('load', () => {
    const openBtn = document.querySelectorAll('.open-btn');
    const closeBtn = document.querySelectorAll('.close-btn'); 
    const dropdown = document.querySelectorAll('.dropdown-projects-index');

    for (let i = 0; i < openBtn.length; i++) {
        openBtn[i].addEventListener('click', () => {
            dropdown[i].style.display = 'block';
            openBtn[i].style.display = 'none'
            closeBtn[i].style.display = 'block'
        })
    }    


    for (let i = 0; i < closeBtn.length; i++) {
        closeBtn[i].addEventListener('click', () => {
            dropdown[i].style.display = 'none';
            openBtn[i].style.display = 'block'
            closeBtn[i].style.display = 'none'
        })
        
    }
    
    // New project button

    const newProjectBtn = document.getElementById('new-project-btn');
    const modal = document.getElementById('modal-new-project');
    const modalDelete = document.getElementById('project-delete-modal');
    const modalCreate = document.getElementById('project-create-modal');

    newProjectBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        modalDelete.style.display = 'none'
        modalCreate.style.display = 'block'
    })

    window.addEventListener('click', event => {
        if(event.target == modal) {
            modal.style.display = 'none';
            modalDelete.style.display = 'block'
        }
    })
});