import React,{useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import LogoPet from '../../assets/logo-pets-menor.svg';
import './style.css';

function HomeEdit() {
    const history = useHistory();
    const idLogin = localStorage.getItem('idLogin');
    const nameLogin = localStorage.getItem('nameLogin');
    const registrationLogin = localStorage.getItem('registrationLogin');
    const officeLogin = localStorage.getItem('officeLogin');
    const [consults, setConsults] = useState([]);
    localStorage.setItem('idEdit', '');
    localStorage.setItem('nameEdit', '');
    localStorage.setItem('ownerEdit', '');
    localStorage.setItem('speciesEdit', '');
    localStorage.setItem('breedEdit', '');
    localStorage.setItem('phoneEdit', '');
    localStorage.setItem('emailEdit', '');

    if (!idLogin && !nameLogin && !registrationLogin && !officeLogin) {
        history.push('/');
    }
    
    useEffect(() => {
        api.get('/consult/profile/no/conclude').then(response => {setConsults(response.data)});
    });

    async function handleUpdateConsult(consult){
        localStorage.setItem('idEdit', consult.id);
        localStorage.setItem('nameEdit', consult.name);
        localStorage.setItem('ownerEdit', consult.owner);
        localStorage.setItem('speciesEdit', consult.species);
        localStorage.setItem('breedEdit', consult.breed);
        localStorage.setItem('phoneEdit', consult.phone);
        localStorage.setItem('emailEdit', consult.email);

        history.push('/edit');
    }

    function turnBackDate() {
        var dateNow = new Date();
        const dateToday = (dateNow.getDate() < 10) ? ('0' + dateNow.getDate()) : dateNow.getDate();
        const dateMouth = (dateNow.getMonth() < 10) ? ('0' + (dateNow.getMonth() + 1)) : dateNow.getMonth();
        const dateYear = dateNow.getFullYear();
        const date = dateToday + '/' + dateMouth + '/' + dateYear;

        return date;
    }

    function turnBackDateConsult(data){
        var dataBrazilian = data.split("/");

        dataBrazilian[2] < 10 ? dataBrazilian[2] = '0' + dataBrazilian[2] : dataBrazilian[2] = dataBrazilian[2];
        dataBrazilian[1] < 10 ? dataBrazilian[1] = '0' + dataBrazilian[1] : dataBrazilian[1] = dataBrazilian[1];

        return (dataBrazilian[2] + '/' + dataBrazilian[1] + '/' + dataBrazilian[0]);
    }

    return (
        <div className="container-edit">
            <header>
                <img src={LogoPet} alt="Logo dos pets" />

                <h1 className="title-edit">Escolha a consulta a editar</h1>

                <Link to="/home" className="button button-logout-edit">VOLTAR</Link>
            </header>

            <br />

            <p className="date">Data de hoje: <b>{turnBackDate()}</b></p>

            <br />
            <br />

            <center>
                <section className="body-edit">
                    {consults.length > 0 ? (consults.map(consult => (
                        <div className="box-edit" key={consult.id}>
                            <h3>{consult.name}</h3>
                            <br />
                            <hr />
                            <p><b>Proprietário: </b> {consult.owner}</p>
                            <p><b>Espécie: </b> {consult.species}</p>
                            <p><b>Raça: </b> {consult.breed}</p>
                            <p><b>Data: </b> {turnBackDateConsult(consult.date)}</p>
                            <hr />
                            <button onClick={() => handleUpdateConsult(consult)} className="redirect button button-edit">EDITAR ESTA CONSULTA</button>
                        </div>
                    ))) : (
                        <h4>Ainda não há consultas</h4>
                    )}
                </section>
            </center>
        </div>
    );
}

export default HomeEdit;