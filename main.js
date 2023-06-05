let input = document.querySelector('#input-text');
let button = document.querySelector('#button-to-add');


button.addEventListener('click', function () {
    let productName = input.value;
    if(productName === "") return;
    addItem(productName);
});

button.addEventListener('keypress', function (evt) {
    if (evt.key === ' ') {
        let productName = input.value;
        if(productName === "") return
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
    soldCell.classList.add('right-aligned')

    productNameCell.textContent = productName;

    let centeredDiv = document.createElement('div');
    centeredDiv.classList.add('centered');

    let redButton = document.createElement('button')
    redButton.classList.add('red-button');
    redButton.style.marginRight = "5px"
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
    greenButton.style.marginLeft = "5px"
    greenButton.addEventListener('click', function () {
        let field = this.previousSibling;
        field.innerHTML = parseInt(field.innerHTML) + 1;
        redButton.disabled=false;
    })


    centeredDiv.appendChild(redButton);
    centeredDiv.appendChild(tableAmount);
    centeredDiv.appendChild(greenButton);

    amountCell.appendChild(centeredDiv);


    let buttonBought = document.createElement('button');
    buttonBought.classList.add('button-text-sold');
    buttonBought.classList.add('text-sold')
    buttonBought.setAttribute('data-tooltip', 'Куплено');
    buttonBought.style.marginRight = "5px"
    soldCell.appendChild(buttonBought);

    // кнопка не куплено (відновити товар)
    let buttonNotBought = document.createElement('button')
    buttonNotBought.addEventListener('click', function () {
        buttonNotBought.hidden = true

        buttonNotBought.classList.toggle('button-text-sold')
        buttonNotBought.classList.toggle('text-sold')

        buttonBought.classList.toggle('button-text-sold')
        buttonBought.classList.toggle('text-sold')

        redButton.hidden = false
        greenButton.hidden = false
        buttonBought.hidden = false
        buttonCross.hidden = false
        productNameCell.style.textDecoration = 'none'

    })

    buttonBought.addEventListener('click', function () {
        redButton.hidden = true
        greenButton.hidden = true
        buttonCross.hidden = true
        buttonBought.hidden = true

        buttonBought.classList.toggle('button-text-sold')
        buttonBought.classList.toggle('text-sold')


        buttonNotBought.classList.toggle('button-not-sold')
        buttonNotBought.classList.toggle("text-sold")
        buttonNotBought.setAttribute('data-tooltip', 'Не куплено')
        soldCell.appendChild(buttonNotBought)
        productNameCell.style.textDecoration = 'line-through'
        productNameCell.setAttribute('contenteditable', false)
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



