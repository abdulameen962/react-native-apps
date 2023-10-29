import reducer from '../reducer'

import * as actions from '../actions'

const DEFAULT_STATE = {
    user:{},
    contact:[],
}

describe('contact reducer', () => {
    it('sucessfully adds new contact',() => {
        expect(reducer(DEFAULT_STATE,actions.addContact({name:'test user',phone:'1234567'}))).toMatchSnapshot();

    })
})

describe('user reducer', () => {
    it('sucessfully adds new user',() => {
        expect(reducer(DEFAULT_STATE,actions.updateUser({name:'test user'}))).toMatchSnapshot();

    })
})
