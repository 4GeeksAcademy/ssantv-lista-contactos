import { Link, useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Message from "../components/Message";
import '../styles/contacts.css'

export const Details = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();


  const detailsContact = store.contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  if (!detailsContact) {
    return (
      <div className="container text-center mt-5">
        <h2>Contacto no encontrado</h2>
        <Link to="/" className="btn m-3">Volver</Link>
      </div>
    );
  }

  const deleteContact = async (id, nombre) => {
    const confirmar = confirm(`¿Desea eliminar el contacto "${nombre}"?`);
    if (!confirmar) return;

    const response = await fetch(`${store.url}/agendas/${store.user}/contacts/${id}`, {
      method: "DELETE"
    });

    if (response.status === 204) {
      dispatch({ payload: "contactDeleted", type: "set-error" });

      setTimeout(() => {
        dispatch({ type: "set-error", payload: "" });
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      <Message />
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">
          <img
            src={`https://randomuser.me/api/portraits/women/${detailsContact.id}.jpg`}
            className="card-img"
            alt={detailsContact.name}
          />

          <div className="card-body text-center">
            <h2 className="card-title display-6">{detailsContact.name}</h2>
            <p className="card-text mt-3 fs-4">
              <span className="fa-solid fa-envelope"></span> {detailsContact.email}
              <br />
              <span className="fa-solid fa-phone"></span> {detailsContact.phone}
              <br />
              <span className="fa-solid fa-house"></span> {detailsContact.address}
            </p>

            <div className="d-flex justify-content-around gap-2">
              <Link
                to="/update"
                className="btn"
                onClick={() => {
                  dispatch({
                    type: "set-contactInfo",
                    payload: detailsContact
                  });
                }}
              >
                <i className="fa-regular fa-pen-to-square"></i> Editar
              </Link>
              <button href="#" className="btn" onClick={() => deleteContact(detailsContact.id, detailsContact.name)}>
                <i className="fa-solid fa-xmark"></i> Borrar
              </button>
            </div>

            <div className="d-flex justify-content-center gap-2 ">
              <Link to="/" className="btn">
                <i className="fa-solid fa-house"></i> Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
