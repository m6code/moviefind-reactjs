import React from 'react'

import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    NavbarDivider,
    Alignment,
    Button,
} from '@blueprintjs/core'

function Header() {
    return (
        <div>
            <Navbar >
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>
                        <img src={process.env.PUBLIC_URL + 'favicon.png'} className='navLogo' />
                        <span className='navHeadin'>Movie Find</span>
                    </Navbar.Heading>
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <form>
                        <input className='' type='text' placeholder='Search for movie ...' />
                        <Button className='button' type='submit' intent='primary' text='Search' />
                    </form>
                </Navbar.Group>
            </Navbar>
        </div>
    )
}

export default Header
