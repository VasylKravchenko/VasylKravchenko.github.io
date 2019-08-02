// Select the elements
let rootNode = document.getElementById('root');

const inputTask = document.getElementById('input-task');
const addBtn = document.getElementById('add-task');
const listWrapper = document.querySelector('ul');
const wrapper = document.getElementById('wrapper');
const taskDiv = document.getElementById('init-task');

function createNewElemet(task) {
    let listItem = document.createElement('li');
    let checkbox = document.createElement('button');
    checkbox.className = 'material-icons check';
    checkbox.innerHTML = '<i class="material-icons check-btn_item">check_box_outline_blank</i>';
    
    let label = document.createElement('label');
    label.innerText = task;
    
    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'list-input';
    
    let editButton = document.createElement('button');
    editButton.className = 'material-icons edit';
    editButton.innerHTML = '<i class="material-icons check-btn_item">edit</i>';
    
    let deleteButton = document.createElement('button');
    deleteButton.className = 'material-icons delete';
    deleteButton.innerHTML = '<i class="material-icons check-btn_item">delete</i>';

    listItem.draggable = true;
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(input);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

function addTask() {
    let maxItemQuantity = 10;
    if (inputTask.value) {
        let listItem = createNewElemet(inputTask.value);
        listWrapper.appendChild(listItem);
        bindTaskEvents(listItem);
        inputTask.value = '';
    }

    if (!(listWrapper.children.length < maxItemQuantity)) {
        let p = document.createElement('p');
        p.className = 'notification';
        p.innerHTML = 'Maximum item per list are created';
        wrapper.insertBefore(p, taskDiv);

        inputTask.disabled = 'disabled';
        addBtn.removeEventListener('click', addTask);
    }

    sortable(listWrapper);
}

addBtn.addEventListener('click', addTask);

function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);

    if (inputTask.disabled) {
        let p = document.querySelector('.notification');
        wrapper.removeChild(p);

        inputTask.disabled = false;
        wrapper.addEventListener('click', addTask);
    }
}

function editTask() {
    let editButton = this;
    let listItem = this.parentNode;
    let label = listItem.querySelector('label');
    let input = listItem.querySelector('input[type = text]');

    let containClass = listItem.classList.contains('editMode');

    if (containClass) {
        label.innerText = input.value;
        editButton.className = 'material-icons edit';
        editButton.innerHTML = '<i class="material-icons check-btn_item">edit</i>';
    } else {
        input.value = label.innerText;
        editButton.className = 'material-icons save';
        editButton.innerHTML = '<i class="material-icons check-btn_item">save</i>';
    }

    listItem.classList.toggle('editMode');
}

function finishTask() {
    let listItem = this.parentNode;
    let checkbox = listItem.querySelector('button.check');
    checkbox.className = 'material-icons check';
    checkbox.innerHTML = '<i class="material-icons check-btn_item">check_box</i>';
    checkbox.removeEventListener('click', finishTask);
}

function bindTaskEvents(listItem) {
    let deleteButton = listItem.querySelector('button.delete');
    let editButton = listItem.querySelector('button.edit');
    let checkbox = listItem.querySelector('button.check');

    deleteButton.addEventListener('click', deleteTask);
    editButton.addEventListener('click', editTask);
    checkbox.addEventListener('click', finishTask);
}

function sortable(rootEl) {
    let dragEl;
    let half = 0.5;
    
    function _onDragOver(evt){
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
       
        let target = evt.target;

        if( target && target !== dragEl && target.nodeName === 'LI' ){
            
            let rect = target.getBoundingClientRect();
            let next = (evt.clientY - rect.top)/(rect.bottom - rect.top) > half;
            rootEl.insertBefore(dragEl, next && target.nextSibling || target);
        }
    }
    
    function _onDragEnd(evt){
        evt.preventDefault();
       
        rootEl.removeEventListener('dragover', _onDragOver, false);
        rootEl.removeEventListener('dragend', _onDragEnd, false);
    }
    
    rootEl.addEventListener('dragstart', function (evt){
        dragEl = evt.target; 
        
        
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', dragEl.textContent);

        
        rootEl.addEventListener('dragover', _onDragOver, false);
        rootEl.addEventListener('dragend', _onDragEnd, false);

    }, false);
}