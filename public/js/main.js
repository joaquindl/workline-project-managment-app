window.addEventListener('load', () => {
    
    // Fecha
    const today = new Date();
    const dd = today.getDay();
    const mm = today.getMonth() + 1;
    const yy = today.getFullYear();
    let month = '';
    switch (mm) {
        case 1: 
        month = 'Enero';
        break;
        case 2: 
        month = 'Febrero';
        break;
        case 3: 
        month = 'Marzo';
        break;
        case 4: 
        month = 'Abril';
        break;
        case 5: 
        month = 'Mayo';
        break;
        case 6: 
        month = 'Junio';
        break;
        case 7: 
        month = 'Julio';
        break;
        case 8: 
        month = 'Agosto';
        break;
        case 9: 
        month = 'Septiembre';
        break;
        case 10: 
        month = 'Octubre';
        break;
        case 11: 
        month = 'Noviembre';
        break;
        case 12: 
        month = 'Diciembre';
    }
    
    const dia = document.getElementById('dia');
    const mes = document.getElementById('mes');
    const año = document.getElementById('año');
    
    dia.innerHTML = dd;
    mes.innerHTML = month;
    año.innerHTML = yy
    
    // User Dropdown 
    const userBtn = document.querySelectorAll('.user-btn');
    const userDropdown = document.querySelectorAll('.dropdown-usuario');
    const downArrow = document.getElementById('user-down-arrow');
    const upArrow = document.getElementById('user-up-arrow');
    
    downArrow.addEventListener('click', () => {
        userDropdown[0].style.display = 'block';
        userBtn[0].style.boxShadow = 'none';
        userBtn.forEach(btn => {
            btn.style.opacity = '.5'
        });
        downArrow.style.display = 'none';
        upArrow.style.display = 'block';
    });
    
    upArrow.addEventListener('click', () => {
        userDropdown[0].style.display = 'none';
        userBtn[0].style.boxShadow = '0 0 10px rgba(0, 0, 0, .1)';
        userBtn.forEach(btn => {
            btn.style.opacity = '1'
        });
        downArrow.style.display = 'block';
        upArrow.style.display = 'none';
    });

    // Edit card
    const addTaskEdit = document.querySelectorAll('.add-task-btn')

    addTaskEdit.addEventListener('click', () => {
        
    })
    
    
});