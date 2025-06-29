import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopHeader from './ShopHeader'

const ShopLayout = () => {
  return (
    <div className="f1ex flex-col bg-white overflow-hidden">
      {/* Common Header */}
      <ShopHeader />
      <main className='flex flex-col w-full'>
        <Outlet />
      </main>
      
    </div>
  )
}

export default ShopLayout