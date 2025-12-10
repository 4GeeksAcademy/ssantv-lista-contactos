import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Message from "../components/Message.jsx"


export const User = () => {
    let navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [userInput, setUserInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInput == "") {
            dispatch({ payload: "noUser", type: "set-error" })
            setTimeout(() => {
                dispatch({ payload: "", type: "set-error" })
            }, 2000);
            return
        } else {
            dispatch({ type: "set-user", payload: userInput });

            const response = await fetch(`${store.url}/agendas/${userInput}`);
            if (response.status === 404) {
                dispatch({ payload: "notFound", type: "set-error" })
                await fetch(`${store.url}/agendas/${userInput}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
            } else { dispatch({ payload: "noError", type: "set-error" }) }
            setTimeout(() => {
                navigate("/")
                dispatch({ payload: "", type: "set-error" })
            }, 2000)
            setUserInput("");
        }
    }


    return (
        <form className="justify-content-center" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Inserta tu usuario"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button className="btn" type="submit">Aceptar</button>

            <Message></Message>
        </form>
    );
}
