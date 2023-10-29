import MyButton from '../MyButton'
import React from "react"

import renderer from 'react-test-renderer'

describe('MyButton',() => {
    it('renders',() => {
        const button = renderer.create(<MyButton />).toJSON()
        expect(button).toMatchSnapshot();
    })

    it('correctly overrides the default color',() => {
        const color = 'red';
        const button = renderer.create(<MyButton color={color}/>).root;
        expect(button.props.color).toBe(color);
    })
})
