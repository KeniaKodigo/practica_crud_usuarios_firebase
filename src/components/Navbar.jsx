import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import ListaUsuarios from './ListaUsuarios'
import Formulario from './Formulario'


export default function Navbar() {
    return (
        <BrowserRouter>
            <div className='contenedor-menu'>
                <ul>
                    <Link to="/" className='link'>Inicio</Link>
                    
                    <Link to="/registro" className='link'>Registro de Usuarios</Link>
                </ul>
            </div>

            <Routes>
                <Route path='/' element={<ListaUsuarios />}/>
                <Route path='/registro' element={<Formulario />}/>
            </Routes>
        </BrowserRouter>
    )
}
