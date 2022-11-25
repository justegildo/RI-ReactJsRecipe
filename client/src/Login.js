import React, {useState} from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from "axios";


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    let params = useParams();

    const authenticate = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        setLoading(true);
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login/`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                setLoading(false);
                localStorage.setItem('user', JSON.stringify(res.data.user, null, 2));
                localStorage.setItem('token', res.data.token);
                if(params.state) history.goBack(); 
                //console.log(res.data.token);
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    history.replace("/dashboard");
                    //window.location = '/';
                 }
            })
            .catch ((err) => {
                console.log(err);
            });
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            <div className="surface-card p-5 shadow-2 w-full lg:w-4 border-round w-6/12 h-4 ">
                
                <div className="text-center mb-5">
                    {/* <img src="images/blocks/logos/hyper.svg" alt="hyper" height="50" className="mb-3" /> */}
                    <div className="text-900 text-3xl font-medium mb-3">Se connecter </div>
                    <div>
                        <Link to='/account'>
                            ou créer un compte
                        </Link>
                    </div>
                </div>

                <div className='p-fluid '>
                    <label htmlFor="email" className="block text-900 font-medium mb-2">Adresse email</label>
                    <InputText id="email" type="email" className="w-full mb-3" value={email} 
                        onChange={(e)=> setEmail(e.target.value)} required />
                    <div className="email error"></div>
                    
                    <label htmlFor="password" className="block text-900 font-medium mb-2">Mot de passe</label>
                    <Password inputId="password" className="w-full mb-3" toggleMask required 
                        value={password} onChange={(e)=> setPassword(e.target.value)} />
                    <div className="password error"></div>
                    
                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberMe" binary className="mr-2" 
                                /*onChange={bind} checked={data.rememberMe}*/ /> 
                            <label htmlFor="rememberMe">Se souvenir de moi</label>
                        </div>
                    </div>
                    
                    <Button autoFocus label="Se connecter" icon="pi pi-user" iconPos="right" 
                        className="w-full" loading={loading} onClick={authenticate} />
                   
                </div>

            </div>
        </div>
    );
};

export default Login;