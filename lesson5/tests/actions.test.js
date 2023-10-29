import * as actions from '../actions';

describe('updateuser returns actions',() => {
    it('returns the correct action',() => {
        expect(actions.updateUser({name:'test name'})).toMatchSnapshot()
    })
    
    it('when passed empty object',() => {
        expect(actions.updateUser({})).toMatchSnapshot()
    })
    
    it('when passed empty name',() => {
        expect(actions.updateUser({name: ''})).toMatchSnapshot()
    })
})

describe('loginUser returns actions',() => {
    const errMessage = 'wrong credentials';
    const fakeToken = 'thisisATestToken';
    const mockLogin = async (username,password) => {
        if (username == 'username' && password == 'password') {
            return fakeToken
        } 
        throw new Error(errMessage)
    }

    it('dispatches the LOG_IN_SENT',async () => {
        const mockDispatch = jest.fn();
        await actions.loginUser('','')(mockDispatch);
        //mockDispatch.mock.calls // all the args  that mock function was invoked on
        // console.log(mockDispatch.mock.calls);
        expect(mockDispatch.mock.calls[0][0]).toEqual({type:actions.LOG_IN_SENT})
        // expect(mockDispatch.mock.calls[1][0]).toEqual({type:actions.LOG_IN_REJECTED})

    })

    it('dispatches the LOG_IN_FULFILLED with correct creds',async () => {
        const mockDispatch = jest.fn();
        // const token = await login('username','password');
        await actions.loginUser('username','password',mockLogin)(mockDispatch);
        // console.log(mockDispatch.mock.calls[1][0]) 
        expect(mockDispatch.mock.calls[1][0]).toEqual({type:actions.LOG_IN_FULFILLED,payload:fakeToken})
        expect(mockDispatch.mock.calls[1]).toMatchSnapshot();
    })

    it('dispatches the LOG_IN_REJECTED with incorrect creds',async () => {
        const mockDispatch = jest.fn();
        await actions.loginUser('','',mockLogin)(mockDispatch);
        expect(mockDispatch.mock.calls[1][0]).toEqual({type:actions.LOG_IN_REJECTED,payload:errMessage})
        expect(mockDispatch.mock.calls[1]).toMatchSnapshot();
    })
})