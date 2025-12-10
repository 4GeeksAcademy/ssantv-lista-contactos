import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import '../styles/update.css'

export const Update = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        email: ""
    });

    // Rellenar formulario si estamos editando
    useEffect(() => {
        if (store.contactInfo) {
            setData({ ...store.contactInfo });
        }
    }, [store.contactInfo]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEditing = store.contactInfo !== null;

        const url = isEditing
            ? `${store.url}/agendas/${store.user}/contacts/${store.contactInfo.id}`
            : `${store.url}/agendas/${store.user}/contacts`;

        const method = isEditing ? "PUT" : "POST";
        const resp = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await resp.json(); // Contacto nuevo o actualizado

        if (isEditing) {
            dispatch({ payload: "contactUpdated", type: "set-error" })
            dispatch({
                type: "set-contacts",
                payload: store.contacts.map(contact =>
                    contact.id === data.id ? { ...contact, ...data } : contact
                )
            });
        } else {
            dispatch({ payload: "contactCreated", type: "set-error" })
            dispatch({
                type: "set-contacts",
                payload: [...store.contacts, result]
            });
        }

        dispatch({
            type: "set-contactInfo",
            payload: null
        });

        if (isEditing) {
            setTimeout(() => {
                dispatch({ payload: "", type: "set-error" })
                navigate(`/person/${data.id}`);
            }, 1000)
        } else {
            setTimeout(() => {
                dispatch({ payload: "", type: "set-error" })
                navigate(`/`);
            }, 1000)
        }

    };


    return (
        <>
            <form className="mx-auto p-4 form-grid" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label for="name" className="form-label">Nombre</label>
                        <input
                            value={data.name}
                            type="text"
                            name="name"
                            placeholder="Inserta un nombre"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label for="phone" className="form-label">Teléfono</label>
                        <input
                            value={data.phone}
                            type="number"
                            name="phone"
                            placeholder="Inserta un teléfono"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label for="address" className="form-label">Dirección</label>
                        <input
                            value={data.address}
                            type="text"
                            name="address"
                            placeholder="Inserta una dirección"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label for="email" className="form-label">Email</label>
                        <input
                            value={data.email}
                            type="email"
                            name="email"
                            placeholder="Inserta un email"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <input type="submit" value="Enviar" className="btn submit mt-4" />
            </form>


            <Message></Message>

            <div className="d-flex justify-content-center gap-2 mt-4">
                <Link to="/" className="btn">
                    <i className="fa-solid fa-house"></i> Volver
                </Link>
            </div>
        </>
    );
};
