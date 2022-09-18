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

console.log(img)