import React, { useState } from 'react'
import db from './../firebase/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

export default function Formulario() {
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        //conectamos a firebase e insertamos el usuario (documento) a la coleccion creada en firebase
        try{
            await addDoc(collection(db, 'usuarios'), { 
                nombre: nombre,
                correo: correo
            });
        } catch(error){
            console.log("Hubo un error");
            console.log(error);
        }
        setNombre("")
        setCorreo("")
    }

    return (
        <>
            <h2 className="subtitulo">Formulario de Registro</h2>
            <form action="" onSubmit={onSubmit}> 
                <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Ingresa tu nombre' />

                <input type="email" name="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder='Ingresa tu correo' />

                <input type="submit" className="btn-registro" value="Agregar Usuario"/>
            </form>
        </>
    )
}
