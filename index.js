const { combineReducers,applyMiddleware } = require('redux');
const {createStore}=require('redux');
const logger=require('redux-logger').default;

const BUY_LAPTOP="BUY_LAPTOP";
const BUY_MOBILE="BUY_MOBILE";

const initialLapTop={
    numOfLaptops:100
}

const initialMobile={
    numOfMobile:1000
}

const buyMobile=()=>{
    return {
        type:BUY_LAPTOP
}
}

const buyLaptop=()=>{
    return {
        type:BUY_LAPTOP
    }
   
}

const laptopReducer=(state=initialLapTop,action)=>{
    // if(action.type==="BUY_LAPTOP"){
    //     return {numOfLaptops:state.numOfLaptops-1}
    // }else{
    //     return state;
    // }
    switch(action.type){
        case "BUY_LAPTOP":
            return {numOfLaptops:state.numOfLaptops-1}
        default:
            return state;
    }
}
const mobileReducer=(state=initialMobile,action)=>{
  
    switch(action.type){
        case "BUY_LAPTOP":
            return {numOfMobile:state.numOfMobile-1}
        default:
            return state;
    }
}
const rootReducer=combineReducers({laptops:laptopReducer,mobiles:mobileReducer});
const store=createStore(rootReducer,applyMiddleware(logger));
console.log(store);
store.subscribe(()=>console.log(store.getState()));
store.dispatch(buyLaptop());
store.dispatch(buyMobile());
