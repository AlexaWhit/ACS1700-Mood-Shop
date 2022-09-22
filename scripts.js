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
const cart = []

//telling JS to produce same output as value:value (value equals value)
//const obj = { a }


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
            return
        }
    }
    //key on left, value on right
    const item = { name, price, qty: 1 }
    cart.push(item)
}


// ------------------------------------------------------------------
//function to show which items are in the cart
function showItemsInCart() {
    const qty = getQty()
    //to add the total sum of the cart
   
    /* Use backquotes in order to combine variables with a 
    string of characters */
    console.log(`You have ${qty} items in your cart.`)
    //Make a loop which will run the length of the items in the cart
    //i+=1 means that at the end of every loop we will add 1 to i which
    //will move on to the next index(i)
    for (let i = 0; i < cart.length; i += 1) {
        //print each item in the cart
        console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty} `)
    }
    //--------->HELP<-------- keep getting error message r getTotal 
    //is not defined
   console.log(`Total in cart: $${getTotal()}`)
}


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

        //use Splice -- we want to start at indez i and remove 1 entire item
         //cart.splice(i, 1)
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
addItemToCart('sad', 5.99)

showItemsInCart()

removeItemFromCart('calm')
removeItemFromCart('happy', 2)

showItemsInCart()