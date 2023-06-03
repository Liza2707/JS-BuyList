let input = document.querySelector('#input-text');
let button = document.querySelector('#button-to-add');


button.addEventListener('click', function () {
    let productName = input.value;
    addItem(productName);
});

button.addEventListener('keypress', function (evt) {
    if (evt.key === ' ') {
        let productName = input.value;
        addItem(productName);
    }
})


addItem('Сік');
addItem('Мафін');
addItem('Вівсянка')

function addItem(productName) {

    let newRow = document.createElement('tr');

    let productNameCell = document.createElement('td');
    productNameCell.setAttribute('contenteditable', 'true')
    let amountCell = document.createElement('td');
    let soldCell = document.createElement('td');

    productNameCell.textContent = productName;

    let centeredDiv = document.createElement('div');
    centeredDiv.classList.add('centered');

    let redButton = document.createElement('button')
    redButton.classList.add('red-button');
    redButton.setAttribute('data-tooltip', 'Забрати одиницю товару');
    redButton.addEventListener('click', function () {
        let field = this.nextSibling;
        if (field.innerHTML == 1) {
            redButton.disabled=true;
            return;
        }
        field.innerHTML = parseInt(field.innerHTML) - 1;
    })

    let tableAmount = document.createElement('div');
    tableAmount.classList.add('table-amount');


    tableAmount.textContent = 1;


    let greenButton = document.createElement('button');
    greenButton.classList.add('green-button');
    greenButton.setAttribute('data-tooltip', 'Додати одиницю товару');
    greenButton.addEventListener('click', function () {
        let field = this.previousSibling;
        field.innerHTML = parseInt(field.innerHTML) + 1;
        redButton.disabled=false;
    })


    centeredDiv.appendChild(redButton);
    centeredDiv.appendChild(tableAmount);
    centeredDiv.appendChild(greenButton);

    amountCell.appendChild(centeredDiv);


    let buttonNotSold = document.createElement('button');
    buttonNotSold.classList.add('button-text-sold');
    buttonNotSold.setAttribute('data-tooltip', 'Куплено');
    soldCell.appendChild(buttonNotSold);

    // кнопка не куплено (відновити товар)
    let buttonSold = document.createElement('button')
    buttonSold.addEventListener('click', function () {
        buttonSold.hidden = true
        redButton.hidden = false
        greenButton.hidden = false
        buttonNotSold.hidden = false
        buttonCross.hidden = false
        productNameCell.style.textDecoration = 'none'

    })

    buttonNotSold.addEventListener('click', function () {
        redButton.hidden = true
        greenButton.hidden = true
        buttonCross.hidden = true
        buttonNotSold.hidden = true
        buttonSold.classList.add('button-not-sold')
        buttonSold.setAttribute('data-tooltip', 'Не куплено')
        soldCell.appendChild(buttonSold)
        productNameCell.style.textDecoration = 'line-through'
    })

    let buttonCross = document.createElement('button');
    buttonCross.classList.add('cross');
    buttonCross.setAttribute('data-tooltip', 'Видалити позицію');
    soldCell.appendChild(buttonCross);

    buttonCross.addEventListener('click', function (){
       // newRow.parentNode.removeChild(newRow)
        newRow.remove()
    })

    newRow.appendChild(productNameCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(soldCell);

    let table = document.querySelector('.table');
    table.appendChild(newRow);

    input.value = '';
}



