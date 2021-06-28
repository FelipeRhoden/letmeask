import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { database } from '../service/firebase';
import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/UseAuth';

export function NewRoom(){

  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return(
    <div id="page-auth">
      <aside>
        <img alt="Ilustração simbolizando perguntas e respostas" src={illustrationImg}/>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvida de sua audiência em tempo-real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}