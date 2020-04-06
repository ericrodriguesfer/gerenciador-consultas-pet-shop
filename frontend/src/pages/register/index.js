import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../../services/api';
import LogoPet from '../../assets/logo-pets-menor.svg';
import './style.css';

toast.configure();

function Register(){
    const history = useHistory();
    const idLogin = localStorage.getItem('idLogin');
    const nameLogin = localStorage.getItem('nameLogin');
    const registrationLogin = localStorage.getItem('registrationLogin');
    const officeLogin = localStorage.getItem('officeLogin');
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    if (!idLogin && !nameLogin && !registrationLogin && !officeLogin) {
        history.push('/');
    }

    const notify = () => {
        toast.success('Erro no cadastro, tente novamente.', {className: 'toastify'});
    }

    const notifySuccessRegister = (name) => {
        toast.success(`A consulta do pet ${name} foi cadastrada com sucesso.`, {className: 'toastify'});
    } 

    async function handleRegister(e){
        e.preventDefault();

        try{
            const response = await api.post('consult', {name, owner, species, breed, phone, email});

            notifySuccessRegister(response.data.name);

            history.push('/home');
        }catch(err){
            notify();
        }
    }

    function turnBackDate() {
        var dateNow = new Date();
        const dateToday = (dateNow.getDate() < 10) ? ('0' + dateNow.getDate()) : dateNow.getDate();
        const dateMouth = (dateNow.getMonth() < 10) ? ('0' + (dateNow.getMonth() + 1)) : dateNow.getMonth();
        const dateYear = dateNow.getFullYear();
        const date = dateToday + '/' + dateMouth + '/' + dateYear;

        return date;
    }

    return(
        <div className="container-register">
            <header>
                <img src={LogoPet} alt="Logo dos pets"/>
                
                <h1 className="title">Cadastrar uma Consulta</h1>

                <Link to="/home" className="button button-logout-register">VOLTAR</Link>
            </header>

            <br />

            <p className="date">Data de hoje: <b>{turnBackDate()}</b></p>

            <br/>
            <br/>
            <br />
            <br />
            <br />

            <center>
                <section className="form-register">
                    <form onSubmit={handleRegister}>
                        <input placeholder="Digite o nome do pet desta consulta" value={name} onChange={e => setName(e.target.value)} required/>
                        <input placeholder="Digite o nome do proprietário do pet" value={owner} onChange={e => setOwner(e.target.value)} required />
                        <input placeholder="Digite a espécie pet desta consulta" value={species} onChange={e => setSpecies(e.target.value)} required />
                        <input placeholder="Digite a raça do pet desta consulta" value={breed} onChange={e => setBreed(e.target.value)} required />
                        <input placeholder="Digite o telefone do propriétario do pet" value={phone} onChange={e => setPhone(e.target.value)} required />
                        <input type="email" placeholder="Digite o email do propriétario do pet" value={email} onChange={e => setEmail(e.target.value)} required />
                        <input placeholder="Digite a data de hoje para esta consula" value={turnBackDate()} readOnly required />
                        <button className="button" type="submit">CADASTRAR CONSULTA</button>
                    </form>
                </section>
            </center>
        </div>
    );
}

export default Register;