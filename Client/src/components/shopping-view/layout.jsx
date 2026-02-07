import React from 'react'
import ShoppingHeader from '../shopping-view/header.jsx'
import { Outlet } from "react-router-dom";


const layout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* shopping view layout */}
        <ShoppingHeader />
        <main className='flex flex-col w-full '>
            <Outlet />
        </main>

    </div>
  )
}

export default layout