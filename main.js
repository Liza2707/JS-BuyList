let input = document.querySelector('#input-text');
let button = document.querySelector('#button-to-add');

button.addEventListener('click', function (){
    let productName =  input.value;
    addItem(productName);
});

function addItem(name) {

        let newRow = document.createElement('tr');

        let productNameCell = document.createElement('td');
        let amountCell = document.createElement('td');
        let soldCell = document.createElement('td');

        productNameCell.textContent = name;

        let centeredDiv = document.createElement('div');
        centeredDiv.classList.add('centered');

        let redButton = document.createElement('button');
        redButton.classList.add('red-button');
        redButton.setAttribute('data-tooltip', 'Забрати одиницю товару');

        let tableAmount = document.createElement('div');
        tableAmount.classList.add('table-amount');

        let amountOfProduct = 1;
        tableAmount.textContent = amountOfProduct;

        let product = {name: `${name}`, amountNumber: amountOfProduct};

        let greenButton = document.createElement('button');
        greenButton.classList.add('green-button');
        greenButton.setAttribute('data-tooltip', 'Додати одиницю товару');
        greenButton.addEventListener('click', addOneItem(product));

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

    function addOneItem(product) {
    product.amountNumber = product.amountNumber + 1;

    }

