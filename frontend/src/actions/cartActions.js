import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart =(id, qty)=> async (dispatch,getState)=>{

  console.log(id)
  const { data } = await axios.get(`/api/products/${id}/`)

  dispatch ({
    type:CART_ADD_ITEM,
    payload:{
      product:data._id,
      name:data.name,
      detailImage:data.detailImage,
      price:data.price,
      quantityAvailable: data.quantityAvailable,
      qty
      
    }
  })
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}

export const removeFromCar =(id)=> async (dispatch,getState)=>{

  // console.log(id)
  // const { data } = await axios.get(`/api/products/${id}/`)

  dispatch ({
    type:CART_REMOVE_ITEM,
    payload:id,
  })
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}