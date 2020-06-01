import React from 'react'
import PropTypes from 'prop-types'

import {
    Navbar,
    Alignment,
    Button,
} from '@blueprintjs/core'

function Header(props) {


    return (
        <div>
            <Navbar fixedToTop='true' >
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>
                        <img src={process.env.PUBLIC_URL + 'favicon.png'} className='navLogo' alt='logo'/>
                        <span className='navHeadin'>Movie Find</span>
                    </Navbar.Heading>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <form onSubmit={props.performSearch}>
                        <input
                            className=''
                            type='text'
                            placeholder='Search for movie ...'
                            ref={props.inputRef} 
                            required                          
                            />
                        <Button className='button' type='submit' intent='primary' text='Search' />
                    </form>
                </Navbar.Group>
            </Navbar>
        </div>
    )
}

Header.propTypes ={
    performSearch : PropTypes.func.isRequired,
    inputRef : PropTypes.object.isRequired,
}

export default Header
