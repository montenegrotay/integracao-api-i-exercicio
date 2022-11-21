import axios from 'axios'
import React, { useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import { useEffect } from 'react'


export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nome, setNome] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")


    const getPlaylistTracks = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, {
            headers: {
                Authorization: "taynara-montenegro-ammal"
            }
        })
        .then((resposta) => {
            setMusicas(resposta.data.result.tracks)
        })
        .catch((erro) => {
            console.log(erro)
        })

    }
    useEffect(() => {
        getPlaylistTracks()
    })


    const addTrackToPlaylist = () => {
        const body = {
            name: nome,
            artist: artista,
            url: url,
        }

        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, {
            headers: {
                Authorization: "taynara-montenegro-ammal"
            }
        })
        .then((resposta) => {
            addTrackToPlaylist()
        })
        .catch((erro) => {
            console.log(erro.response)
        })
    }

    //Remover uma música de uma playlist
    const removeTrackFromPlaylist= (id) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, {
            headers: {
                Authorization: "taynara-montenegro-ammal"
            }
        })
        .then((resposta) => {
            
        })
        .catch((erro) => {
            console.log(erro)
        })
    };



    //Remover uma playlist
    const deletePlaylist = async () => {
        try {
            await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlists.id}`, {
                headers: {
                    Authorization: "taynara-montenegro-ammal" 
                }
            })
        
            props.getAllPlaylists()
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            <button onClick={deletePlaylist}> Deletar playlist </button>
            
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() => removeTrackFromPlaylist(musica.id)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artista} onChange={(e) => setArtista(e.target.value)} />
                <InputMusica placeholder="musica" value={nome} onChange={(e) => setNome(e.target.value)} />
                <InputMusica placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}
