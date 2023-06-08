document.addEventListener("DOMContentLoaded", function() {
    let table = document.querySelector(".table");
    let rows = table.querySelectorAll("tr");

    for (let i = 0; i < 3; i++) {
        rows[i].remove();
    }
});


let input = document.querySelector('#input-text');
let button = document.querySelector('#button-to-add');
let products = []

button.addEventListener('click', function () {
    let productName = input.value;
    if(productName === "") return;

    addItem(productName);
    addStatistics(products.length - 1)
});

button.addEventListener('keypress', function (evt) {
    if (evt.key === ' ') {
        let productName = input.value;
        if(productName === "") return
        addItem(productName)
        addStatistics(products.length - 1)

    }
})


addItem('Сік');
addStatistics(0)
addItem('Мафін')
addStatistics(1)
addItem('Вівсянка')
addStatistics(2)

function addItem(productName) {

    let newRow = document.createElement('tr');

    let productNameCell = document.createElement('td');
    productNameCell.setAttribute('contenteditable', 'true')
    let amountCell = document.createElement('td');
    amountCell.classList.add('centered')

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
        if (field.textContent == 1) {
            redButton.disabled=true;
            return;
        }
        field.textContent = parseInt(field.innerHTML) - 1;

        let indexOfProduct = Array.from(table.children).indexOf(newRow) - 1;
        products[indexOfProduct].amount = field.textContent;
        console.log("після віднімання")
        for(let i =0; i < products.length; i++){
            console.log(products[i])
        }
    })

    let tableAmount = document.createElement('div');
    tableAmount.classList.add('table-amount');


    tableAmount.textContent = 1;

    ////
    let productInArray = {
        productName: productName,
        amount: tableAmount.textContent
    }
    products.push(productInArray)
    /////


    let greenButton = document.createElement('button');
    greenButton.classList.add('green-button');
    greenButton.setAttribute('data-tooltip', 'Додати одиницю товару');
    greenButton.style.marginLeft = "5px"
    greenButton.addEventListener('click', function () {
        let field = this.previousSibling;
        field.textContent = parseInt(field.innerHTML) + 1;
        redButton.disabled = false;

        let indexOfProduct = Array.from(table.children).indexOf(newRow) - 1;
        products[indexOfProduct].amount = field.textContent;

        console.log("після додавання:");
        for (let i = 0; i < products.length; i++) {
            console.log(products[i]);
        }
    });



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
        let indexOfProductToDelete = Array.from(table.children).indexOf(newRow) - 1
        products.splice(indexOfProductToDelete, 1)

        console.log("index: " + indexOfProductToDelete)
        console.log("після видалення")
        for (let i = 0; i < products.length; i++) {
            console.log(products[i]);
        }


        newRow.remove()
    })

    // оновлення назви продукту в масиві products при зміні назви продукту у таблиці
    productNameCell.addEventListener('input', function () {
        let rowIndex = Array.from(table.children).indexOf(newRow) - 1;
        if (rowIndex !== -1) {
            products[rowIndex].productName = productNameCell.textContent;
        }

        console.log("після зміни назви")
        for(let  i =0; i < products.length; i++){
            console.log(products[i])
        }
    });


    newRow.appendChild(productNameCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(soldCell);

    let table = document.querySelector('.table');
    table.appendChild(newRow);

    input.value = '';


}

function addStatistics(index) {
    let newTag = document.createElement('div');
    newTag.classList.add('tag');


    let productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `<b>${products[index].productName}</b>`;

    productDiv.style.display = 'inline-block'

    let amountDiv = document.createElement('div');
    amountDiv.classList.add('amount');
    amountDiv.innerHTML = `${products[index].amount}`;

    amountDiv.style.marginLeft = '5px'

    newTag.appendChild(productDiv);
    newTag.appendChild(amountDiv);

    newTag.style.marginRight = '5px'
    newTag.style.marginTop = '10px'

    // Додати новий елемент до правого прямокутника зі статистикою
    let amountPage = document.querySelector('.amount-page');
    let tagsLine = amountPage.querySelector('.tags-line');
    tagsLine.appendChild(newTag);
}

