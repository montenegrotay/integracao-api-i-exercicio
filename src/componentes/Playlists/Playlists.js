import axios from "axios";
import React, {  useState } from "react";
import Musicas from "../Musicas/Musicas";
import { useEffect } from "react";


function Playlists() {

    const [playlists, setPlaylists] = useState([])
    
    
    const getAllPlaylists = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
            headers: {
                Authorization: "taynara-montenegro-ammal"
            }
        })
        .then((resposta) => {
            setPlaylists(resposta.data.result.list)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }
    useEffect(() => {
        getAllPlaylists()
    }, [])


    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} />
            })}

        </div>
    );
}

export default Playlists;
