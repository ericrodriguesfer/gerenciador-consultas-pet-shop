import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import LogoPet from '../../assets/logo-pet.svg';
import './style.css';

toast.configure();

function Login(){
    const [email, setEmail] = useState('');
    const [passLast, setPassLast] = useState('');
    const history = useHistory();
    localStorage.setItem('idLogin', '');
    localStorage.setItem('nameLogin', '');
    localStorage.setItem('registrationLogin', '');
    localStorage.setItem('officeLogin', '');

    const notify = () => {
        toast.success('Falha no login, tente novamente.', {className: 'toastify'});
    }

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('/sessions', { email, passLast });

            localStorage.setItem('idLogin', response.data.id);
            localStorage.setItem('nameLogin', response.data.name);
            localStorage.setItem('registrationLogin', response.data.registration);
            localStorage.setItem('officeLogin', response.data.office);

            history.push('/home');
        }catch(err){
            notify();
        }
    }

    return(
        <div className="container-login">
            <img className="logo" src={LogoPet} alt="Logo dos pets"/>

            <section className="body-form">
                <form onSubmit={handleLogin}>
                    <center>
                        <h1 className="title-login">Login</h1>
                    </center>

                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email de acesso" required/>
                    <input type="password" value={passLast} onChange={e => setPassLast(e.target.value)} placeholder="Digite sua senha de acesso" required/>
                    <button className="button" type="submit">ACESSAR</button>
                </form>
            </section>
        </div>
    );
}

export default Login;