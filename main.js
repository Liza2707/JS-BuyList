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


addItem('coca-cola');
addItem('Мафін');

function addItem(productName) {

    let newRow = document.createElement('tr');

    let productNameCell = document.createElement('td');
    let amountCell = document.createElement('td');
    let soldCell = document.createElement('td');

    productNameCell.textContent = productName;

    let centeredDiv = document.createElement('div');
    centeredDiv.classList.add('centered');

    let redButton = document.createElement('button');
    redButton.classList.add('red-button');
    redButton.setAttribute('data-tooltip', 'Забрати одиницю товару');
    redButton.addEventListener('click', function () {
        let field = this.nextSibling;
        if (field.innerHTML == 1) return;
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
    })


    centeredDiv.appendChild(redButton);
    centeredDiv.appendChild(tableAmount);
    centeredDiv.appendChild(greenButton);

    amountCell.appendChild(centeredDiv);


    let buttonNotSold = document.createElement('button');
    buttonNotSold.classList.add('button-text-sold');
    buttonNotSold.setAttribute('data-tooltip', 'Куплено');
    soldCell.appendChild(buttonNotSold);

    let buttonCross = document.createElement('button');
    buttonCross.classList.add('cross');
    buttonCross.setAttribute('data-tooltip', 'Видалити позицію');
    soldCell.appendChild(buttonCross);

    newRow.appendChild(productNameCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(soldCell);

    let table = document.querySelector('.table');
    table.appendChild(newRow);

    input.value = '';
}



