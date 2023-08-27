let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')
let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  };
  calculation()

  let generateCartitems = () => {
if(basket.lenght !== 0){
    return (shoppingCart.innerHTML = basket.map((x)=>{
        let {id, item} = x;
        let search = shopItemsData.find((y)=>y.id === id) || []
        return`
        <div class="cart-item">
        <img width="150" src=${search.img} alt="" >
        <div class="details">
            
        <div class="title-price-x">
            <h4 class= "title-price">
            <p>${search.name}</p>
            <p class="cart-item-price">₽ ${search.price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
        </div>


        <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id=${id} class="quantity">${item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    
                </div>

        <h3>₽ ${item * search.price}</h3>

        </div>
        </div>
        `;
    }).join(""));
}else{
   shoppingCart.innerHTML = ``
   label.innerHTML = `
   <h2>товаров нет</h2>
   <a href="index.html">
   <button class="HomeBtn">Вернуться назад</button>
   </a>`;}}
  generateCartitems();

  let increment = (id) =>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);  
    if(search === undefined){
     basket.push({
        id: selectedItem.id,
        item: 1,});   
    }else{search.item += 1;};
    generateCartitems();
     update(selectedItem.id);
   localStorage.setItem("data", JSON.stringify(basket));};
let decrement = (id) =>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id)
    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -= 1; };
   update(selectedItem.id);
    basket = basket.filter((x)=> x.item !== 0); 
    generateCartitems();
 localStorage.setItem("data", JSON.stringify(basket));};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount()};
 let removeItem = (id) =>{
    let selectedItem = id
    basket = basket.filter((x)=>x.id !== selectedItem.id)
    generateCartitems();
    TotalAmount()
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));}
let clearCart = () => {
    basket = []
    generateCartitems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
    TotalAmount()}

let makeOffer = () => {prompt("Введите номер телефона: ", 71234567891);
alert(`спасибо за заказ, скоро с вами свяжется оператор`);}


 let TotalAmount = () => {
    if(basket.lenght !==0){
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            return item * search.price;

        }).reduce((x,y)=>x+y, 0)
        label.innerHTML = `
        <h2>Сумма заказа: ₽ ${amount}</h2>
        <button onclick="makeOffer()"class="chechout">Оформить заказ</button>
        <button onclick="clearCart()" class="removeALL">Очистить корзну</button>
        `
    }
    else return
 }
 TotalAmount()