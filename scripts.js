import data from "./data.js";

const itemsContainer = document.querySelector('#items')


/* Loop over each element inside each object and display
their images. This for-loop goes inside THIS file.
The length of the data determines how many times this
loop goes around */
for (let i = 0; i < data.length; i += 1) {
    // Creating a new div element and giving it a class name
    const newDiv = document.createElement('div');
    newDiv.className = "item"
    //Create image element
    const img = document.createElement('img');
    img.src = data[i].image;
    img.width = 300;
    img.height = 300;
    //Add image to the div
    newDiv.appendChild(img);
    console.log(img);
    // put new div inside items container
    itemsContainer.appendChild(newDiv);
    const desc = document.createElement ('P');
    desc.innerText = data[i].desc;
    newDiv.appendChild(desc);

    const price = document.createElement('P');
    price.innerText = data[i].price;
    newDiv.appendChild(price);

    //Make a button
    const button = document.createElement('button');
    button.id = data[i].name;
    button.dataset.price = data[i].price;
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button);
}

//Creating the Shopping Cart
//using a COLLECTION (Array/Object)
//Adding a variable called itemList that will hold the reference to the ul element
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
const addForm = document.getElementById('add-form')
const itemName = document.getElementById('item-name')
const itemPrice = document.getElementById('item-price')

const cart = []

// ------------------------------------------------------------------
//To Handle change evens on update input for qty
itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value) //ensure it's a number by using parseInt
        updateCart(name, qty) 
        
    }
}

//telling JS to produce same output as value:value (value equals value)
//const obj = { a }

// ------------------------------------------------------------------
//function to handle clicks on list
itemList.onclick = function(e) {
    //console.log("Clicked List!!")
    //console.log(e.target)

    //e is event objct for the event that just occured
    //target is the specific element that triggered the event
    //class list is the list of classes that belong to that element
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name // data-name = "???"
        removeItemFromCart(name)
    } else if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name
        addItemToCart(name)
    } else if (e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name
        removeItemFromCart(name, 1) //added 1 to (name, 1) so that it removes only 1 item
    }
}


// ------------------------------------------------------------------
//function to add item to cart and keeping
//track of name, price, and quantity using an object
function addItemToCart(name, price) {
    //loop through the cart to see if any names match, then update qty
    for (let i = 0; i < cart.length; i += 1) {
        //do comparison with if statement
        //if the name of the object at a specific index equals name, then 
        //update qty
        if (cart[i].name === name) {
            //add one to the value of qty
            cart[i].qty += 1
            // Stop the function in order to avoid duplicates in cart!
            showItemsInCart()
            return
        }
    }
    //key on left, value on right
    const item = { name, price, qty: 1 }
    cart.push(item)
    showItemsInCart()
}


// ------------------------------------------------------------------
//function to show which items are in the cart
function showItemsInCart() {
    const qty = getQty()
    //to add the total sum of the cart
   
    /* Use backquotes in order to combine variables with a 
    string of characters */
    //console.log(`You have ${qty} items in your cart.`)
    cartQty.innerHTML = `You have ${qty} items in your cart.`

     //create li tag listing all of the items 
    let itemStr = ''

    //Make a loop which will run the length of the items in the cart
    //i+=1 means that at the end of every loop we will add 1 to i which
    //will move on to the next index(i)
    for (let i = 0; i < cart.length; i += 1) {
        //print each item in the cart

        //console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        //const name = cart[i].name
        //const price = cart[i].price
        //const qty = cart[i].qty

        //ex. {name:'Apple', price: 0.99, qty: 3}
        //If we use the sntax below, we can break apart an object like above
        //into three variables
        const { name, price, qty } = cart[i]

        //Add Remove, +, and - Buttons
        itemStr += `<li>
            ${name} $${price} x ${qty} = ${qty * price} 
            <button class="remove" data-name="${name}">Remove</button>
            <button class="add-one" data-name="${name}"> + </button>
            <button class="remove-one" data-name="${name}"> - </button>
            <input class="update" type="number" data-name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr

    //console.log(`Total in cart: $${getTotal()}`)
    cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}

//Select all buttons from our page
    //Need to make button list into an arry which will make it easier to
    //loop through each button and assign it in the addItem function
    //use Array.from to covert the node lsits into an array
    const all_items_button = Array.from(document.querySelectorAll('button'))
    all_items_button.forEach(elt => elt.addEventListener('click', () => {
        addItemToCart(elt.getAttribute('id'), elt.getAttribute('data-price'))
        showItemsInCart()
    }))

// ------------------------------------------------------------------
//to update total items in cart when there are duplicates..
function getQty() {
    let qty = 0
    for (let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty 
    }
    return qty
}


// ------------------------------------------------------------------

//function with a loop to add the total sum of the cart
//and keep a running total
function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * cart[i].qty
    }

    return total.toFixed(2)
}


// ------------------------------------------------------------------
//function to REMOVE items currently in the shopping cart
function removeItemFromCart(name, qty = 0) {
    //Create loop which will go through all items in the cart and if the item name matches a 
    //name in the cart it will remove it 
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
        //Remove just one from the quantity (this will show in the cart as calm $5.99 with qty of 0)
                cart[i].qty -= qty
            }
        //To remove the item if qty is < 1 OR qty is = 0
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }    
            showItemsInCart()
        //use Splice -- we want to start at indez i and remove 1 entire item
         //cart.splice(i, 1)
            return
       }
    }
}

// ----------------------------------------------------------------
function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItemFromCart(name)
                return
            }
            cart[i].qty = qty
            showItemsInCart()
            return
        }
    }
}

// -------------------------test area-------------------------------
addItemToCart('happy', 5.99)
addItemToCart('sad', 5.99)
addItemToCart('angry', 5.99)
addItemToCart('calm', 5.99)
addItemToCart('happy', 5.99)
//addItemToCart('sad', 5.99)

showItemsInCart()

//removeItemFromCart('calm')
//removeItemFromCart('happy', 2)

//showItemsInCart()

//console.log(itemList)