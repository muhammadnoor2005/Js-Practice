// const redux = require("redux");

// const shopReducer = (state = {soap:10},action) => {
//     if (action.type === "SOAP_SELL"){
//         return{
//             soap: state.soap - 1,
//         }
//     }
//     if (action.type === "SOAP_ADD"){
//         return{
//             soap: state.soap + action.paylaod,
//         }
//     }
//     return state;
    
// }

// const store = redux.createStore(shopReducer);

// const subscription = () => {
//     const state = store.getState();
//     console.log(state);
// }

// store.subscribe(subscription);

// store.dispatch({type:"SOAP_SELL"});
// store.dispatch({type:"SOAP_ADD",paylaod:10});
