import React, { useState } from 'react';
import { FiLogIn} from 'react-icons/fi';
import { Link, useHistory  } from 'react-router-dom'

import api from '../../services/api'
import './Styles.css';
import heroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'

export default function Logon() {
    const [id, setid] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('login fail, try again.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Sign Up</h1>

                    <input placeholder="Your ID" 
                    value={id}
                    onChange={e => setid(e.target.value)}
                    />
                    <button className="button" type="submit"> Enter</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        don't have sign in
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}