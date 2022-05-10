const { applyMiddleware } = require('redux');
const {createStore}=require('redux');
const logger=require('redux-logger').default;
const thunk =require('redux-thunk').default;
const axios =require('axios');

const FETCH_USERS_REQUEST="FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS="FETCH_USERS_SUCCESS";
const FETCH_USERS_FAIL="FETCH_USERS_FAIL";

const intialState={
    users:[],
    errors:'',
    isLoding:false
    }

const fetchUserRequest=()=>{
    return {
        type:FETCH_USERS_REQUEST
    }
}
const fetchUserSuccess=(users)=>{
    return {
        type:FETCH_USERS_SUCCESS,
        data:users
    }
}
const fetchUserFail=(errors)=>{
    return {
        type:FETCH_USERS_FAIL,
        data:errors
    }
}

const userReducer=(state=intialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {...state,isLoding:true}
        case FETCH_USERS_SUCCESS:
            return {isLoding:false,users:action.data,errors:''}
        case FETCH_USERS_FAIL:
            return {isLoding:false,errors:action.data,users:[]}
        default :
            return state;
    }
}
const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            let users=response.data.map(user=>user.name);
            dispatch(fetchUserSuccess(users))
        }).catch(err=>{
            dispatch(fetchUserFail(err));
        });
    }
}
const store=createStore(userReducer,applyMiddleware(thunk));
store.subscribe(()=>console.log(store.getState()));
store.dispatch(fetchUsers());