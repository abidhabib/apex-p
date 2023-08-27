import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
    return (
        <>
            <Header />
            <main className='main'>
                
                <Outlet></Outlet>
            </main>
        </>
    )
}

export default Layout