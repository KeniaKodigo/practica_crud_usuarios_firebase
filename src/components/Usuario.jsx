import React, { useState } from 'react'
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function Usuario({id, nombre, correo}) {
    const [editandoTarea, setEditandoTarea] = useState(false);
	const [editarNombre, setEditarNombre] = useState(nombre);
	const [editarCorreo, setEditarCorreo] = useState(correo);

    const actualizarContacto = async(e) => {
		e.preventDefault();

		try {
			await updateDoc(doc(db, 'usuarios', id), {
				nombre: editarNombre,
				correo: editarCorreo
			});
		} catch(error){
			console.log('Hubo un error al intentar actualizar el usuario')
			console.log(error);
		}

		setEditandoTarea(false);
	}

	const eliminarContacto = async(id) => {
		try {
			console.log("Hola");
			await deleteDoc(doc(db, 'usuarios', id));
		} catch(error){
			console.log('Hubo un error al intentar eliminar el usuario')
			console.log(error);
		}
	}

    return (
        <ContenedorContacto onSubmit={actualizarContacto}>
            {editandoTarea ?
                <form action="">
                    <Input 
                        type="text"
                        name="nombre"
                        value={editarNombre}
                        onChange={(e) => setEditarNombre(e.target.value)}
                        placeholder="Nombre"
                    />
                    <Input 
                        type="email"
                        name="correo"
                        value={editarCorreo}
                        onChange={(e) => setEditarCorreo(e.target.value)}
                        placeholder="Correo"
                    />
                    <Boton type="submit" className='btn-actualizar'>Actualizar</Boton>
                </form>
            :
                <>
                    <Nombre>{nombre}</Nombre>
                    <Correo>{correo}</Correo>
                    <Boton onClick={() => setEditandoTarea(!editandoTarea)} className='btn-actualizar'>Editar</Boton>
					<Boton onClick={() => eliminarContacto(id)} className='btn-eliminar'>Borrar</Boton>
                </>
            }
		</ContenedorContacto>
    )
}

const ContenedorContacto = styled.div`
	padding: 10px 0;
	border-bottom: 1px solid rgba(0,0,0,.2);
`;

const Nombre = styled.p`
	font-weight: bold;
`;

const Correo = styled.p`
	font-style: italic;
	color: #6B6B6B;
	margin: 5px 0;
`;

const Boton = styled.button`
	padding: 5px 20px;
	border: none;
	cursor: pointer;
	border-radius: 3px;
	margin: 0px 2px;
	margin-bottom: 10px;
	transition: .3s ease all;
	outline: none;
	color: #fff;
	font-size: 12px;
`;

const Input = styled.input`
	padding: 10px;
	border: 2px solid rgba(0,0,0,.2);
	border-radius: 3px;
	width: 100%;
	margin-bottom: 10px;
	transition: .2s ease all;
	outline: none;
	text-align: center;
	
	&:focus {
		border: 2px solid #3D76E9;
	}
`;