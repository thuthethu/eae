import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import api from '../../services/api';
import './Style.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const history = useHistory()
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeletIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Error deleting a case');
        }
    }

    function handleLogout() {
        localStorage.clear();
    
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero" />
                <span>Bem-Vindo a {ongName}</span>

                <Link className="button" to="/incidents/new"> Register new Case</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Registerd Cases</h1>

            <ul>
                {incidents.map(incident =>(
                    <li key= {incident.id} >
                    <b>CASES:</b>
                    <p>{incident.tile}</p>

                    <b>DESCRIPTION:</b>
                    <p>{incident.description}</p>

                    <b>VALUE:</b>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button onClick={() => handleDeletIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}