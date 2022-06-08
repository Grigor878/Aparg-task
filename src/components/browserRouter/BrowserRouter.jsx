import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from '../header/Header'
import Home from '../pages/home/Home'

const BrowserRouter = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}

export default BrowserRouter