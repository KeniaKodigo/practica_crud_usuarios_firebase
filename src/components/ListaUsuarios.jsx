import React, { useEffect, useState } from 'react'
import db from './../firebase/firebaseConfig'
import { collection, onSnapshot } from 'firebase/firestore'
import Usuario from './Usuario'

export default function ListaUsuarios() {
    const [contactos, setContactos] = useState([])

    useEffect(() => {
        onSnapshot(
            collection(db, "usuarios"),
            (snapshot) => {
                console.log(snapshot);
                console.log(snapshot.docs[0].data());

                const arreglo_contactos = snapshot.docs.map((documento) => {
                    console.log(documento.data());

                    return {...documento.data(), id: documento.id}
                });
                console.log(arreglo_contactos);
                setContactos(arreglo_contactos)
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    return (
        <>
            <h2 className="subtitulo">Lista de Usuarios</h2>
            {
                contactos.length > 0 &&
                <div className="contenedor-usuario">

                        {contactos.map((contacto) => (
                            <Usuario
                                key={contacto.id}
                                id={contacto.id}
                                nombre={contacto.nombre}
                                correo={contacto.correo} 
                            />
                    ))}
                </div>
            }
        </>
    )
}
