import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-1366.svg'
import userImg from '../../assets/user.jpg'
import { AiFillCaretDown, AiOutlineMenu } from 'react-icons/ai'

const Header = () => {
  return (
    <header className='header'>
      <div>
        <AiOutlineMenu className='header__menu' />
        <Link to='/'>
          <img className='header__logo' src={logo} alt="Logo" />
        </Link>
      </div>

      <div className='header__user'>
        <img src={userImg} alt="User-img" />
        <AiFillCaretDown className='header__chevron' />
      </div>
    </header>
  )
}

export default Header