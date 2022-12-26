const shopBtn = document.getElementById('shop-btn');
const sideBar = document.getElementById('cart');
const searchBar = document.getElementById('text-input');
const allItems = document.getElementById("item-grid");
const totalPrice = document.getElementById("total");
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


function addToCart(item){
  countItems++;
  const cardImg = item.children[0].src;
  const cardTitle = item.children[1].innerHTML;
  let cardPrice = item.children[2].innerHTML;
  cardPrice = cardPrice.substring(1);
  sum += parseFloat(cardPrice);
  totalPrice.innerText = "Total: " + "$" + sum;
  sideBar.innerHTML +=
        `
        <div class="item" >
          <div class="details">
            <h3>${cardTitle}</h3>
              <p>
                <span class="price">Price: ${cardPrice}</span>
                <button class="cancel" onclick="removeItem(this.id)" id="${cardTitle}"><i class="fas fa-window-close fa-2x"></i></button>
              </p>
            </div>   
          <img src="${cardImg}"> 
        </div>         
        `

}

searchBar.addEventListener('change', function(){
  const search = searchBar.value;
  for(let i=0; i<allItems.children.length; i++){
    if(allItems.children[i].children[1].innerHTML.toLowerCase().includes(search.toLowerCase())){
      allItems.children[i].style.display = "block";
    }
    else{
      allItems.children[i].style.display = "none";
    }
  }
});

function removeItem(e){
  const item = document.getElementById(e);
  item.parentElement.parentElement.parentElement.remove();
  totalPrice.innerHTML = "Total: " + "$"- sum;
  countItems--;
  if(countItems==0){
    totalPrice.innerText = 100;
    sideBar.classList.remove('show');
    sideBar.classList.add('hide');
  }
}
