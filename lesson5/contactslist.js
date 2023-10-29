import React, {Component} from 'react'
import {SectionList,Text} from 'react-native'
import PropTypes from 'prop-types'

import Contact from './components'

const renderSectionHeader = obj => <Text>{obj.section.title}</Text>
// renderItem = obj => <Contact {...obj.item} />

//shorthand

const Contactlist = props => {
    const contactsByLetter = props.contacts.reduce((obj,contact) => {
        const firstLetter = contact.name[0].toUpperCase()
        return {
            ...obj,
            [firstLetter]: [...(obj[firstLetter] || []),contact]
        }

    },{})
    const renderItem = ({item}) => <Contact {...item} onSelectContact={props.onSelectContact} />
    const sections = Object.keys(
        contactsByLetter
    ).sort().map(letter => ({
        title: letter,
        data: contactsByLetter[letter],
    }))

    return (
        <SectionList
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        sections={
            sections
        }
        />
    )
}

Contactlist.propTypes = {
    contacts: PropTypes.array, 
}

export default Contactlist