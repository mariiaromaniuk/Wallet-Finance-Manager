import React from 'react'
import { Header } from 'react-native-elements'

const HeaderTitle = () => {
    return(
        <Header
            placement="left"
            backgroundColor="#10ae00"
            // leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Your Loan Calculator', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />
    )
}

export default HeaderTitle