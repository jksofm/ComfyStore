import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
      const tempItem = state.cart.find((item) => item.id === id + color);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount >= cartItem.max) {
              newAmount = product.stock;
            }
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: [...tempCart] };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case REMOVE_CART_ITEM:
      const tempArr = state.cart.filter((item) => item.id !== action.payload);

      return {...state, cart: tempArr };
    case CLEAR_CART:
      return {...state,cart :[] };
    case TOGGLE_CART_ITEM_AMOUNT:
      if(action.payload.value==="inc"){
          console.log("inc")
           let newArr ;
          newArr = state.cart.map((item)=>{
              if(action.payload.id===item.id){
                let newAmount ;
                if(item.amount < item.max){
                      
                     newAmount = item.amount + 1;
                  
                }else{
                   newAmount = item.max;
                }
                return {...item,amount : newAmount}
              }else{
                return item
              }
           })
           return {...state, cart: newArr}
           
      }else{
       
       let newArr ;
       newArr = state.cart.map((item)=>{
           if(action.payload.id===item.id){
             let newAmount = item.amount - 1 ;
             if(newAmount < 1){
                   
                  newAmount =  1;
               
             }
             return {...item,amount : newAmount}
           }else{
             return item
           }
        })
        return {...state, cart: newArr}
      }
    case COUNT_CART_TOTALS:
      let newTotalItems = 0;
      let orderTotal = 0 ;
      state.cart.forEach((item)=>{
         newTotalItems = item.amount + newTotalItems
      })
      state.cart.forEach((item)=>{
         const total = item.amount * item.price;
         orderTotal = orderTotal + total;
      })
      return {...state, totalItems : newTotalItems,totalAmount : orderTotal}
     
      
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
  return state;
};

export default cart_reducer;
