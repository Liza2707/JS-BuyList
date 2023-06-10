document.addEventListener("DOMContentLoaded", function() {
    let table = document.querySelector(".table");
    let rows = table.querySelectorAll("tr");

    for (let i = 0; i < 3; i++) {
        rows[i].remove();
    }

    let statTag = document.querySelectorAll('.tag')[0];
    statTag.remove()

    let temp = document.querySelectorAll('.tag')[0]
    temp.remove()

    temp = document.querySelectorAll('.tag')[products.length]
    temp.remove()

    });


let input = document.querySelector('#input-text');
let button = document.querySelector('#button-to-add');
let products = []

button.addEventListener('click', function () {
    let productName = input.value;
    if(productName === "") return;

    // перевірка на унікальність назви
    for(let i =0; i < products.length; i++){
        if(products[i].productName.toLowerCase() === productName.toLowerCase()) return;
    }
    addItem(productName);
    addStatistics(products.length - 1)
});

button.addEventListener('keypress', function (evt) {
    if (evt.key === ' ') {
        let productName = input.value;
        if(productName === "") return

        // перевірка на унікальність назви
        for(let i =0; i < products.length; i++){
            if(products[i].productName.toLowerCase() === productName.toLowerCase()) return;
        }

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
    redButton.style.backgroundColor = 'grey'
    redButton.style.marginRight = "5px"
    redButton.setAttribute('data-tooltip', 'Забрати одиницю товару');
    redButton.addEventListener('click', function () {
        let field = this.nextSibling;
        if (field.textContent == 1) {
            redButton.disabled=true;
            return;
        }
        field.textContent = parseInt(field.innerHTML) - 1;

        if(field.textContent == 1) redButton.style.backgroundColor = 'grey'

        let indexOfProduct = Array.from(table.children).indexOf(newRow) - 1;
        products[indexOfProduct].amount = field.textContent;
        console.log("після віднімання")
        for(let i =0; i < products.length; i++){
            console.log(products[i])
        }

        for(let i =0; i < document.querySelectorAll('.tag').length; i++){
            if(document.querySelectorAll('.tag')[i].querySelector('.product').textContent === products[indexOfProduct].productName){
                let statTag = document.querySelectorAll('.tag')[i]
                statTag.querySelector('.amount').textContent = field.textContent
                break
            }
        }
    })

    let tableAmount = document.createElement('div');
    tableAmount.classList.add('table-amount');


    tableAmount.textContent = 1;


    let productInArray = {
        productName: productName,
        amount: tableAmount.textContent
    }
    products.push(productInArray)



    let greenButton = document.createElement('button');
    greenButton.classList.add('green-button');
    greenButton.setAttribute('data-tooltip', 'Додати одиницю товару');
    greenButton.style.marginLeft = "5px"
    greenButton.addEventListener('click', function () {
        let field = this.previousSibling;
        field.textContent = parseInt(field.innerHTML) + 1;
        redButton.disabled = false;
        redButton.style.backgroundColor = 'red'

        let indexOfProduct = Array.from(table.children).indexOf(newRow) - 1;
        products[indexOfProduct].amount = field.textContent;


        // Оновити значення статистики в правому прямокутнику

        for(let i =0; i < document.querySelectorAll('.tag').length; i++){
            if(document.querySelectorAll('.tag')[i].querySelector('.product').textContent === products[indexOfProduct].productName){
                let statTag = document.querySelectorAll('.tag')[i]
                statTag.querySelector('.amount').textContent = field.textContent
                break
            }
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
        productNameCell.setAttribute('contenteditable', true)

        // new
        // забрати з колонки КУПЛЕНО та додати в колонку ЗАЛИШИЛОСЯ
        let index = Array.from(table.children).indexOf(newRow) - 1 // індекс товару в таблиці

       for(let i =0; i < document.querySelectorAll('.tag').length; i++){
           if(document.querySelectorAll('.tag')[i].querySelector('.product').textContent === products[index].productName){
               let temp = document.querySelectorAll('.tag')[i]
               temp.remove()
               break
           }
       }
         addStatistics(index)
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

        // new
        let index = Array.from(table.children).indexOf(newRow) - 1

        // remove from column "залишилося"
        for(let i =0; i < document.querySelectorAll('.tag').length; i++){
            if(document.querySelectorAll('.tag')[i].querySelector('.product').textContent === products[index].productName){
                let temp = document.querySelectorAll('.tag')[i]
                temp.remove()
                break
            }
        }

        // додати в колонку КУПЛЕНО
        addBought(index)

    })

    let buttonCross = document.createElement('button');
    buttonCross.classList.add('cross');
    buttonCross.setAttribute('data-tooltip', 'Видалити позицію');
    soldCell.appendChild(buttonCross);

    buttonCross.addEventListener('click', function (){
        // індекс товару в таблиці
        let indexOfProductToDelete = Array.from(table.children).indexOf(newRow) - 1

        // видалити продукт зі статистичної таблиці
        for(let i =0; i < document.querySelectorAll('.tag').length; i++){
            if(products[indexOfProductToDelete].productName === document.querySelectorAll('.tag')[i].querySelector('.product').textContent){
                let tagToDelete = document.querySelectorAll('.tag')[i]
                tagToDelete.remove()
                break
            }
        }

        products.splice(indexOfProductToDelete, 1)
        newRow.remove()
    })

    // оновлення назви продукту в масиві products при зміні назви продукту у таблиці
    productNameCell.addEventListener('input', function () {
        let rowIndex = Array.from(table.children).indexOf(newRow) - 1;
        // змінити назву продукту в масиві
        if (rowIndex !== -1) {
            products[rowIndex].productName = productNameCell.textContent;
        }

        console.log("in input")

        // Оновити значення назви продукту в статистиці правого прямокутника

        for(let i =0; i < document.querySelectorAll('.tag').length; i++){
            if(document.querySelectorAll('.tag')[i].querySelector('.product').textContent === products[rowIndex].productName.slice(0, -1) || document.querySelectorAll('.tag')[i].querySelector('.product').textContent.slice(0, -1) === products[rowIndex].productName){
                let statTag = document.querySelectorAll('.tag')[i]
                statTag.querySelector('.product').innerHTML = `<b>${productNameCell.textContent}</b>`
            }
        }

/**
        let statTag = document.querySelectorAll('.tag')[rowIndex];
        statTag.querySelector('.product').innerHTML = `<b>${productNameCell.textContent}</b>`;
 **/
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

function addBought(index) {

    let newTag = document.createElement('div');
    newTag.classList.add('tag');


    let productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `<del><b>${products[index].productName}</b></del>`;

    productDiv.style.display = 'inline-block'

    let amountDiv = document.createElement('div');
    amountDiv.classList.add('amount');
    amountDiv.innerHTML = `<del>${products[index].amount}</del>`;


    amountDiv.style.marginLeft = '5px'

    newTag.appendChild(productDiv);
    newTag.appendChild(amountDiv);

    newTag.style.marginRight = '5px'
    newTag.style.marginTop = '10px'

    // Додати новий елемент до правого прямокутника зі статистикою
    let amountPage = document.querySelector('.amount-page');
    let tagsLine = amountPage.querySelector('#tags-bought');
    tagsLine.appendChild(newTag);
}


