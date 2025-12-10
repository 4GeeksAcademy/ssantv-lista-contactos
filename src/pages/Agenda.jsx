import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import '../styles/contacts.css'
import Message from "../components/Message";

export const Agenda = () => {
  const { store, dispatch } = useGlobalReducer();

  const deleteContact = (id, nombre) => {
    const confirmar = confirm(`¿Desea eliminar el contacto "${nombre}"?`);

    if (!confirmar) return;

    fetch(`${store.url}/agendas/${store.user}/contacts/${id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.status === 204) {
          // Quitar del store inmediatamente
          dispatch({
            type: "set-contacts",
            payload: store.contacts.filter(contact => contact.id !== id)
          });
        }
      });
  };

  return (
    <>
      <Message></Message>
      {store.contacts.map((el) => (
        <div className="col-sm-12 col-md-6 col-lg-4 mx-auto m-2" key={el.id}>
          <div className="card">
            <img
              src={`https://randomuser.me/api/portraits/women/${el.id}.jpg`}
              className="card-img"
              alt={el.name}
            />
            <div className="card-body align-self-center">
              <h5 className="card-title display-6 text-center">{el.name}</h5>
              <hr/>
              <p className="card-text text-center">
                <span className="fs-3"><i className="fa-solid fa-phone fs-3"></i> {el.phone}</span>
              </p>
            </div>

            <div className="align-self-center m-1">
              <Link to={`/person/${el.id}`} className="btn mr-2">
                <i className="fa-solid fa-info"></i> Ver más detalles
              </Link>
            </div>
            <div className="d-flex m-3 justify-content-around">
              <Link
                to="/update"
                className="btn"
                onClick={() => {
                  dispatch({ type: "set-contactInfo", payload: el });
                }}
              >
                <i className="fa-regular fa-pen-to-square"></i> Editar
              </Link>
              <button href="#" className="btn" onClick={() => deleteContact(el.id, el.name)}>
                <i className="fa-solid fa-xmark"></i> Borrar
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
