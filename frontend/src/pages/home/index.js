import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import LogoPet from '../../assets/logo-pets-menor.svg';
import IconAdd from '../../assets/icons/icone_adicionar.svg';
import IconEdit from '../../assets/icons/icone_editar.svg';
import IconCancel from '../../assets/icons/icone_cancelar.svg';
import IconCompleted from '../../assets/icons/icone_listar.svg';
import IconToday from '../../assets/icons/icone_listar_hoje.svg';
import IconConclude from '../../assets/icons/icone_concluir.svg';
import './style.css';

function Home(){
    const history = useHistory();
    const idLogin = localStorage.getItem('idLogin');
    const nameLogin = localStorage.getItem('nameLogin');
    const registrationLogin = localStorage.getItem('registrationLogin');
    const officeLogin = localStorage.getItem('officeLogin');

    if(!idLogin && !nameLogin && !registrationLogin && !officeLogin){
        history.push('/');
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    function turnBackDate(){
        var dateNow = new Date();
        const dateToday = (dateNow.getDate() < 10) ? ( '0' + dateNow.getDate()) : dateNow.getDate();
        const dateMouth = (dateNow.getMonth() < 10) ? ('0' + (dateNow.getMonth() + 1)) : dateNow.getMonth();
        const dateYear = dateNow.getFullYear();
        const date = dateToday + '/' + dateMouth + '/' + dateYear;

        return date;
    }

    return(
        <div className="container-home">
            <header>
                <img src={LogoPet} alt="Logo dos pets"/>

                <div className="info-administrator">
                    <p>Olá, caro: <b>{nameLogin}</b></p>
                    <p>Cargo: <b>{officeLogin}</b></p>
                    <p>Matrícula: <b>{registrationLogin}</b></p>
                </div>

                <span className="span"></span>

                <button onClick={handleLogout} className="button button-logout">SAIR</button>
            </header>

            <br/>

            <p className="date">Data de hoje: <b>{turnBackDate()}</b></p>

            <br/>
            <br/>

            <center>
                <section className="body-home">
                    <Link to="/register" className="redirect">
                        <div className="box-menu">
                            <center>
                                <img className="icon" src={IconAdd} alt="Icone de adicionar"/>
                                
                                <p><b>ADICIONAR NOVA CONSULTA</b></p>
                            </center>
                        </div>
                    </Link>

                    <Link to="/home/edit" className="redirect">
                        <div className="box-menu">
                            <center>
                                <img className="icon edit" src={IconEdit} alt="Icone de adicionar" />

                                <p><b>EDITAR UMA CONSULTA</b></p>
                            </center>
                        </div>
                    </Link>

                    <Link to="/cancel" className="redirect">
                        <div className="box-menu">
                            <center>
                                <img className="icon" src={IconCancel} alt="Icone de adicionar" />

                                <p><b>CANCELAR UMA CONSULTA</b></p>
                            </center>
                        </div>
                    </Link>

                    <Link to="/today" className="redirect">
                        <div className="box-menu">
                            <center>
                                <img className="icon" src={IconToday} alt="Icone de adicionar" />

                                <p><b>LISTAR CONSULTAS DE HOJE</b></p>
                            </center>
                        </div>
                    </Link>

                    <Link to="/finished" className="redirect">
                        <div className="box-menu">
                            <center>
                                <img className="icon" src={IconCompleted} alt="Icone de adicionar" />

                                <p><b>LISTAR CONSULTAS CONCLUÍDAS</b></p>
                            </center>
                        </div>
                    </Link>

                    <Link to="/conclude" className="redirect">
                        <div className="box-menu">
                            <center>
                                <img className="icon" src={IconConclude} alt="Icone de adicionar" />

                                <p><b>CONCLUIR UMA CONSULTA</b></p>
                            </center>
                        </div>
                    </Link>
                </section>
            </center>
        </div>
    );
}

export default Home;