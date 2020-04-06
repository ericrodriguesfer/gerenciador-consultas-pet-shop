import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {toast} from 'react-toastify';
import api from '../../services/api';
import LogoPet from '../../assets/logo-pets-menor.svg';
import './style.css';

toast.configure();

function Edit() {
    const history = useHistory();
    const idLogin = localStorage.getItem('idLogin');
    const nameLogin = localStorage.getItem('nameLogin');
    const registrationLogin = localStorage.getItem('registrationLogin');
    const officeLogin = localStorage.getItem('officeLogin');
    const [name, setName] = useState(localStorage.getItem('nameEdit'));
    const [owner, setOwner] = useState(localStorage.getItem('ownerEdit'));
    const [species, setSpecies] = useState(localStorage.getItem('speciesEdit'));
    const [breed, setBreed] = useState(localStorage.getItem('breedEdit'));
    const [phone, setPhone] = useState(localStorage.getItem('phoneEdit'));
    const [email, setEmail] = useState(localStorage.getItem('emailEdit'));
    const idEdit = localStorage.getItem('idEdit');

    if (!idLogin && !nameLogin && !registrationLogin && !officeLogin) {
        history.push('/');
    }

    if(!idEdit && !name && !owner && !species && !breed && !phone && !email){
        history.push('/home/edit');
    }

    const notify = () => {
        toast.success('Erro ao atualizar consulta, tente novamente.', {className: 'toastify'});
    }

    const notifySuccessUpdate = () => {
        toast.success('Consulta atualizada com sucesso.', {className: 'toastify'});
    }

    async function handleUpdateConsult(e){
        e.preventDefault();

        try{
            await api.put(`consult/update/${idEdit}`, {name, owner, species, breed, phone, email});
            
            localStorage.setItem('idEdit', '');
            localStorage.setItem('nameEdit', '');
            localStorage.setItem('ownerEdit', '');
            localStorage.setItem('speciesEdit', '');
            localStorage.setItem('breedEdit', '');
            localStorage.setItem('phoneEdit', '');
            localStorage.setItem('emailEdit', '');

            notifySuccessUpdate();
            
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

    return (
        <div className="container-edit">
            <header>
                <img src={LogoPet} alt="Logo dos pets" />

                <h1 className="title-edit">Escolha a consulta a editar</h1>

                <Link to="/home/edit" className="button button-logout-edit">VOLTAR</Link>
            </header>

            <br />

            <p className="date">Data de hoje: <b>{turnBackDate()}</b></p>

            <br />
            <br />
            <br />
            <br />
            <br />

            <center>
                <section className="form-register">
                    <form onSubmit={handleUpdateConsult}>
                        <input placeholder="Digite o nome do pet desta consulta" value={name} onChange={e => setName(e.target.value)} required />
                        <input placeholder="Digite o nome do proprietário do pet" value={owner} onChange={e => setOwner(e.target.value)} required />
                        <input placeholder="Digite a espécie pet desta consulta" value={species} onChange={e => setSpecies(e.target.value)} required />
                        <input placeholder="Digite a raça do pet desta consulta" value={breed} onChange={e => setBreed(e.target.value)} required />
                        <input placeholder="Digite o telefone do propriétario do pet" value={phone} onChange={e => setPhone(e.target.value)} required />
                        <input type="email" placeholder="Digite o email do propriétario do pet" value={email} onChange={e => setEmail(e.target.value)} required />
                        <input placeholder="Digite a data de hoje para esta consula" value={turnBackDate()} readOnly required />
                        <button className="button" type="submit">ATUALIZAR CONSULTA</button>
                    </form>
                </section>
            </center>
        </div>
    );
}

export default Edit;