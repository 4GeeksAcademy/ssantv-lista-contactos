import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Message = () => {
    const { store } = useGlobalReducer();
    const error = store.error;

    if (error === "notFound") {
        return (
            <div className="d-flex justify-content-center mt-4">
                <div className="alert alert-warning fs-6 w-50 text-center" role="alert">
                    El usuario se ha creado al no encontrar uno con ese nombre.
                    <br/>
                    Redirigiendo...
                </div>
            </div>
        );
    } else if (error === "noError") {
        return (
            <div className="d-flex justify-content-center mt-4">
                <div className="alert alert-success fs-6 w-50 text-center" role="alert">
                    Usuario correcto. Redirigiendo...
                </div>
            </div>
        )
    } else if (error === "userDeleted") {
        return (
            <div className="d-flex justify-content-center mt-4">
                <div className="alert alert-danger fs-6 w-50 text-center" role="alert">
                    Usuario eliminado
                </div>
            </div>
        );
    } else if (error === "contactDeleted") {
        return (
            <div className="d-flex justify-content-center mt-4">
                <div className="alert alert-danger fs-6 w-50 text-center" role="alert">
                    Contacto eliminado. Redirigiendo...
                </div>
            </div>
        );
    } else if (error === "contactCreated") {
        return (
            <div className="d-flex justify-content-center mt-4">
                <div className="alert alert-success fs-6 w-50 text-center" role="alert">
                    Se ha creado el contacto. Redirigiendo a la agenda.
                </div>
            </div>
        );
    } else if (error === "contactUpdated") {
        return (
            <div className="d-flex justify-content-center mt-4">
                <div className="alert alert-info fs-6 w-50 text-center" role="alert">
                    Se ha actualizado el contacto. Redirigiendo a la agenda.
                </div>
            </div>
        );
    } else if (error === "noUser") {
        return (
            <div className="d-flex justify-content-center mt-4">
                <div className="alert alert-danger fs-6 w-50 text-center" role="alert">
                    Es necesario añadir un nombre de usuario. Inténtalo de nuevo
                </div>
            </div>
        );
    }

    return null;
};

export default Message;
