import axios from "axios";
import React, {  useState } from "react";
import Musicas from "../Musicas/Musicas";
import { useEffect } from "react";




function Playlists() {

    const [playlists, setPlaylists] = useState([])
    const [pesquisa, setPesquisa] = useState([])
    
    
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


    //Procurar playlists
    const searchPlaylist = async () => {
        try {
            const response = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${pesquisa}`, {
                headers: {
                    Authorization: "taynara-montenegro-ammal"
                }
            })

        console.log(response.data)
        setPlaylists(response.data.result.playlist);
        } catch (error) {
            console.log(error)
        }
    };



    
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} />
            })}

            
            <input
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            placeholder="Pesquisar"
            />

            <button onClick={searchPlaylist}>
            Pesquisar
            </button>

        </div>
    );
}

export default Playlists;
