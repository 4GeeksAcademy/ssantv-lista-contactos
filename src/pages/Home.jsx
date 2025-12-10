import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Agenda } from "./Agenda.jsx";
import Message from "../components/Message.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const deleteUser = async () => {
  const confirmar = confirm(`¿Desea eliminar el usuario "${store.user}"?`);
  if (!confirmar) return;

  const response = await fetch(`${store.url}/agendas/${store.user}`, {
    method: "DELETE"
  });

  if (response.status === 204) {
    dispatch({ type: "set-user", payload: "" });
    dispatch({ type: "set-error", payload: "userDeleted" });

    setTimeout(() => {
      dispatch({ type: "set-error", payload: "" });
    }, 2000);
  }
};


  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch(`${store.url}/agendas/${store.user}`);
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "set-contacts", payload: data.contacts || [] });
      } else if (response.status === 404) {
        // Si no existe, crea
        await fetch(`${store.url}/agendas/${store.user}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        dispatch({ type: "set-contacts", payload: [] });
      }
    };

    fetchContacts();
  }, [store.user]);

  if (!store.user) {
    return (
      <div className="container mt-5">
        <div className="card text-center p-3">
          <Message/>
          <h5 className="card-title">
            Actualmente no hay ningún usuario añadido.
            <br />
            Por favor, accede a la zona de inicio de sesión
            <br />
            <br />
            <Link to="/user">Iniciar sesión</Link>
          </h5>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5">
        <div className="card text-center p-3">
          <h5 className="card-title display-4">
            Contactos de {store.user}
          </h5>
          <div className="d-flex justify-content-center gap-2">
            <Link to="/user" className="btn">
					Cambio de usuario
				</Link>
            <button className="btn" onClick={() => deleteUser(store.user)}>Eliminar usuario</button>
          </div>
        </div>
        <div className="container text-center">
          <Link to="/Update" className="btn">Añadir nuevo contacto</Link>
        </div>
      </div>

      <div className="container mx-auto mt-4">
        <div className="row justify-text-center">
          <Agenda />
        </div>
      </div>
    </>
  );
};
