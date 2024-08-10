import React, { useContext, useState } from 'react'
import './signup.css'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/Contextprovider';

export default function Sign_in() {

    const [logdata, setData] = useState({
        email: "",
        password: ""
    })

    console.log(logdata);

    const { account, setAccount } = useContext(LoginContext);

    const adddata = (e) => {
        const { name, value } = e.target;
        setData(() => {
            return {
                ...logdata, [name]: value
            }
        })

    }

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 400 || !data) {
            toast.warn("Invalid Details 👎!", {
                position: "top-center"
            });
        }
        else {
            setAccount(data);
            toast.success("Login Successfully done 😃!", {
                position: "top-center"
            });
            setData({ ...logdata, email: "", password: "" })

        }

    }

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="amazonlogo" />
                </div>

                <div className="sign_form">
                    <form>
                        <h1>Sign-In</h1>

                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={logdata.email} id="email" />
                        </div>

                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password"
                                onChange={adddata}
                                value={logdata.password} placeholder="At least 6 characters" />
                        </div>

                        <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
                    </form>
                    <ToastContainer />
                </div>

                <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <button>  <NavLink to="/register">Create your Amazon Account</NavLink></button>
                </div>
            </div>

        </section>
    )
}
