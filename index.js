const shopBtn = document.getElementById('shop-btn');
const sideBar = document.getElementById('cart');
const searchBar = document.getElementById('text-input');
const allItems = document.getElementById("item-grid");
const totalPrice = document.getElementById("total");
const totalItems = document.querySelector(".totalItems");
const root = document.querySelector(':root');
let countItems =0;
let sum =0;
if(countItems==0){
  sideBar.classList.remove('show');
  sideBar.classList.add('hide');
}
shopBtn.addEventListener('click', function(){
  if(sideBar.classList.contains('show')){
    sideBar.classList.remove('show');
    sideBar.classList.add('hide');
  }else{
    sideBar.classList.remove('hide');
    sideBar.classList.add('show');
  }
});


const itemArr = [];
const mapTest = new Map();
function addToCart(item){
  const cardImg = item.children[0].src;
  const cardTitle = item.children[1].innerHTML;

  countItems++;
  itemArr.push(cardTitle);

  let cardPrice = item.children[3].innerHTML;
  cardPrice = cardPrice.substring(1);
  sum += parseFloat(cardPrice);
  document.getElementById("total").innerHTML = "Total Price: " + "$" + sum;
  document.querySelector(".totalItems").innerHTML = "Total Items: " + countItems;
  root.style.setProperty('--after-content', `"${countItems}"`);

  // if(mapTest.has(cardTitle)){
  //   removeItem(cardTitle + "/+/" +  cardPrice);
  //   mapTest.set(cardTitle, mapTest.get(cardTitle)+1);
  // }else{
  //   mapTest.set(cardTitle, 1);
  // }
  // in the HTML -               <span class="price">Quantity: ${mapTest.get(cardTitle)}</span>

  sideBar.innerHTML +=
        `
        <div class="item">
          <div class="details">
            <h3 id="itemShopTitle">${cardTitle}</h3>
              <p>
                <span class="price">Price: $${cardPrice}</span>
                <button class="cancel" onclick="removeItem(this.id)" id="${cardTitle + "/+/" +  cardPrice}"><i class="fas fa-window-close fa-2x"></i></button>
              </p>
            </div>   
          <img src="${cardImg}"> 
        </div>         
        `

}

searchBar.addEventListener('input', function(){
  const search = searchBar.value;
  for(let i=0; i<allItems.children.length; i++){
    if(allItems.children[i].children[1].innerHTML.toLowerCase().includes(search.toLowerCase())){
      allItems.children[i].style.display = "flex";
    }
    else{
      allItems.children[i].style.display = "none";
    }
  }

});

function removeItem(id){
  // split the id to get the price and subtract it from the sum
  const price = id.split("/+/")[1];
  sum -= parseFloat(price);
  document.getElementById("total").innerHTML = "Total Price: " + "$" + sum;
  const item = document.getElementById(id);
  item.parentElement.parentElement.parentElement.remove();
  itemArr.pop(id);

  countItems--;
  root.style.setProperty('--after-content', `"${countItems}"`)
  document.querySelector(".totalItems").innerHTML = "Total Items: " + countItems;
  if(countItems==0){
    root.style.setProperty('--after-content', `""`)
    sideBar.classList.remove('show');
    sideBar.classList.add('hide');
  }
}

function payment(){
  if(countItems==0){
    alert("Please add items to your cart before checking out!");
    return;
  }
  alert("Thank you for your purchase!");
  location.reload();
}