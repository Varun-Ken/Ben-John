import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut, Menu, Sidebar } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/authSlice/authSlice'

const AdminHeader = ({open,setOpen}) => {
  const dispatch = useDispatch()
  return (
    <header className='flex items-center justify-between p-4 border-b bg-background'>
      <Button className="lg:hidden" onClick={() => setOpen(!open)}>
      <AlignJustify />
      <span className='sr-only'>Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button onClick={() => dispatch(logoutUser())}>
          <LogOut /> Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader