var input_value = document.getElementById("input_value");
var listitems = document.getElementById("ul");
var paracontent = document.getElementsByClassName("para");
input_value.focus();
 
var tasks=JSON.parse(localStorage.getItem("tasks"))||[];

if(localStorage.getItem('tasks')){
    tasks.map((inner)=>{
      newElement(inner);
    })
}
listitems.addEventListener('keypress',(e)=>{
    if(e.keycode==13){
      e.preventDefault();
      e.target,blur();
    }
})
listitems.addEventListener('keydown',(e)=>{
  if(e.key=="Enter"){
    e.preventDefault();
    e.target,blur();
  }
})
input_value.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn").click();
  }
});
function add() {
  if (input_value.value == " " || input_value.value == "") {
    return;
  }
  const task = {
    id: new Date().getTime(),
    name: input_value.value,
    isCompleted: false,
  };
  
  tasks.push(task);
  
  localStorage.setItem("tasks", JSON.stringify(tasks));
  newElement(task);
}
  // remove button listener

listitems.addEventListener('click',(e)=>{
  if(e.target.classList.contains("remove-task")||e.target.classList.contains("fa-xmark")){
    var removeItem=e.target.closest('li').id;
    removeFun(removeItem);
  }
});
listitems.addEventListener('input',(e)=>{
  const taskId=e.target.closest("li").id;
  updateFun(taskId,e.target);
});

// creating new element of list

function newElement(task) {
  const element = document.createElement("li");
  element.setAttribute("id", task.id);
  if (task.isCompleted) {
    element.classList.add("complete");
  }
  var close='\f00d';
  const content = `
                <div class="maindiv">
                    <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ? "checked" : ""}>
                    <span class="para" ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
                </div>
                <button title="Remove the ${task.name} task"class="remove-task"><i class="fa-solid fa-xmark" style="color: #ffffff;"></i></button>`;
  element.innerHTML = content;
  listitems.append(element);
 
}

// removing element form list

function removeFun(removeItem){
  tasks=tasks.filter((task)=> task.id != removeItem);
  document.getElementById(removeItem).remove();
  localStorage.setItem("tasks",JSON.stringify(tasks))
}


//updating item

function updateFun(taskId,el){
  const task=tasks.find((task)=>task.id == parseInt(taskId));
  if(el.hasAttribute('contenteditable')){
    task.name=el.textContent;
  }
  else{
    const span=el.nextElementSibling;
    const parent=el.closest('li');

    task.isCompleted=!task.isCompleted
    if(task.isCompleted){
      span.removeAttribute('contenteditable');
      parent.classList.add('complete');
    }
    else{
      span.setAttribute('contenteditable',"true");
      parent.classList.remove('complete');
      
    }
  }
  localStorage.setItem('tasks',JSON.stringify(tasks));
}