//Selector
const toBuyItem = document.getElementById("toBuyItem");
const toBuyNum = document.getElementById("quantity");
const toBuyStore = document.getElementById("store");
const shopType = document.getElementById("type");
const addBtn = document.querySelector('.btn');
const tobuyList = document.querySelector('.tobuy-list');

//Event Listener

addBtn.addEventListener('click', addItem);
tobuyList.addEventListener('click', actionsCheck);

//Function

function addItem(event) {

  event.preventDefault();
  const tobuyDiv = document.createElement('div');
  tobuyDiv.classList.add('tobuy');
  //create li
  const newTobuy = document.createElement('li');
  newTobuy.innerText = `Item: ${toBuyItem.value}, Quantity: ${toBuyNum.value}, Store: ${toBuyStore.value}, Type: ${shopType.value}`;
  newTobuy.classList.add('tobuy-item');
  tobuyDiv.appendChild(newTobuy);

  //check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
  completedButton.classList.add("completed-btn");
  tobuyDiv.appendChild(completedButton);

  //edit button
  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editButton.classList.add("edit-btn");
  tobuyDiv.appendChild(editButton);

  //trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("delete-btn");
  tobuyDiv.appendChild(trashButton);

  //append to list
  tobuyList.appendChild(tobuyDiv);

  // Clear input fields
  toBuyItem.value = '';
  toBuyNum.value = '';
  toBuyStore.value = '';
}


function actionsCheck(e) {
  const item = e.target;
  //delete the tobuy line
  if (item.classList[0] === 'delete-btn') {
    const tobuy = item.parentElement;
    tobuy.remove();
  }
  //check mark
  if (item.classList[0] === 'completed-btn') {
    const tobuy = item.parentElement;
    tobuy.classList.toggle('completed');
  }
  //edit button
  if (item.classList[0] === 'edit-btn') {
    const tobuy = item.parentElement;
    editItem(tobuy);

  }
}

function editItem(tobuy) {
  const currentText = tobuy.querySelector('li').innerText;
  const values = currentText.split(', ');

  toBuyItem.value = values[0].split(': ')[1];
  toBuyNum.value = values[1].split(': ')[1];
  toBuyStore.value = values[2].split(': ')[1];
  shopType.value = values[3].split(': ')[1];
  tobuy.remove();
  // Remove the edited item from the list

}