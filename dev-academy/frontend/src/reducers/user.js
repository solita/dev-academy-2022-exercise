const userReducer = (state = 0, action) => {
    switch(action.type){
        case "FETCH_ALL":
            return state
        case "UPDATE":
            return state
        default:
            return state
    }
}

export default userReducer