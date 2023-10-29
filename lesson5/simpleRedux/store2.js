// action types
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_CONTACT = 'UPDATE_CONTACT'

class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer
    this.state = initialState
  }

  getState() {
    return this.state
  }

  dispatch = (action) => {
    if (typeof action == 'function') {
      action(this.dispatch)
    }
    else{
      console.log('received an action: ',action.type )
      this.state = this.reducer(this.state, action)
    }
  }
}

const DEFAULT_STATE = {user: {}, contacts: []}

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state, action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, {prevContact: action.payload})

    case 'LOG_IN_SUCCESS':
      return merge(state,{token:"fakeToken"})

    default:
      return state
  }
}

const reducer = (state, action) => ({
  user: userReducer(state.user, action),
  contacts: contactReducer(state.contacts, action),
})

// action creators
const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

const login = async (username,password) => {
  const response = await fetch('https://d2dc-129-205-124-233.ngrok-free.app',{
      method: 'POST',
      headers: {
          'content-type': 'application/json',
      },
      body: JSON.stringify({
          username,
          password
      })
  })

  if (response.ok){
      return true;
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}

//asynchronous action creator
const loginUser = (username,password) => dispatch => {
  dispatch({type:"LOG_IN_SENT"})
  login(username,password)
  .then(() => {
    dispatch({type:"LOG_IN_SUCCESS"})
  })
  .catch(error => {
    dispatch({type:"LOG_IN_REJECTED"})
  })

  // return 
}

const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

const store = new Store(reducer, DEFAULT_STATE)
store.dispatch(loginUser('username','password'))

// store.dispatch(updateUser({foo: 'foo'}))
// store.dispatch(updateUser({bar: 'bar'}))
// store.dispatch(updateUser({foo: 'baz'}))

// store.dispatch(addContact({name: 'jordan h', number: '1234567890'}))
// store.dispatch(addContact({name: 'jordan h', number: '1234567890'}))
// store.dispatch(addContact({name: 'david m', number: '5050505050'}))

console.log(store.getState())
