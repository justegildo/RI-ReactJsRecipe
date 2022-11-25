import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, {useState} from 'react';
import axios from "axios";
import { Checkbox } from 'primereact/checkbox';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

const Account = () => {
    const [loading, setLoading] = useState(false);
    const [nom, setNom] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [typeUser, setTypeUser] = useState("");
    
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    let history = useHistory();


    const send = () => {
        setLoading(true);

        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        const telephoneError = document.querySelector(".telephone.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(".password-confirm.error");

        if(password != controlPassword) {
            passwordConfirmError.innerHTML =
            "Les mots de passe ne correspondent pas";
            setLoading(false);

        } else{
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    nom,
                    pseudo,
                    email,
                    telephone,
                    typeUser,
                    password,
                },
            })
                .then((res) => {
                    setLoading(false);
                    if(res.data.errors){
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        telephoneError.innerHTML = res.data.errors.telephone;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        history.replace("/login");
                    }
                })
                .catch((err) => {
                    //console.log(err)
                });
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '130vh', justifyContent: 'center', alignItems: 'center'}}>
            <div className="surface-card p-5 shadow-2 w-full lg:w-5 border-round w-6/12 h-4 " >
                <div className="text-center mb-5">
                    {/* <img src="images/blocks/jpg/account.png" alt="hyper" height="70" className="mb-3" /> */}
                    <div className="text-900 text-3xl font-medium mb-3">Créer un compte</div>
                    <div>
                        <Link to='/login'>
                            ou se connecter
                        </Link>
                    </div>
                    
                </div>
                <div className='p-fluid '>
                    <label htmlFor="nom" className="block text-900 font-medium mb-2" >Nom & Prénoms</label>
                    <InputText id="nom" type="text" className="w-full mb-3" value={nom} 
                        onChange={(e)=> setNom(e.target.value)} required/>
                </div>

                <div className='p-fluid mt-4'>
                    <label htmlFor="pseudo" className="block text-900 font-medium mb-2">Pseudo </label>
                    <InputText id="pseudo" type="text" className="w-full mb-3" value={pseudo} 
                        onChange={(e)=> setPseudo(e.target.value)} required />
                </div>
                <div className="pseudo error"></div>

                <div className='p-fluid mt-4'>
                    <label htmlFor="email" className="block text-900 font-medium mb-2" >Adresse email</label>
                    <InputText id="email" type="email" className="w-full mb-3" value={email} 
                        onChange={(e)=> setEmail(e.target.value)} required/>
                </div>
                <div className="email error"></div>

                <div className='p-fluid mt-4'>
                    <label htmlFor="telephone" className="block text-900 font-medium mb-2" >Téléphone</label>
                    <InputText id="telephone" type="telephone" className="w-full mb-3" value={telephone} 
                        onChange={(e)=> setTelephone(e.target.value)} required/>
                </div>
                <div className="telephone error"></div>

                <div className="p-fluid mt-4" hidden>
                    <label htmlFor="typeUser">Type utilisateur </label>
                    <Dropdown id="typeUser" onChange={(e) => setTypeUser(e.target.value)} className="w-full mb-3"
                        placeholder="Aucune sélection" value={typeUser}
                        options={["ADMINISTRATEUR", "UTILISATEUR"]} />
                </div>

                <div className='p-fluid mt-4'>
                    <label htmlFor="password" className="block text-900 font-medium mb-2" >Mot de passe</label>
                    <Password inputId="password" className="w-full mb-3" type="nom" value={password} 
                        onChange={(e)=> setPassword(e.target.value)} required toggleMask />
                </div>
                <div className="password error"></div>

                <div className='p-fluid mt-4'>
                    <label htmlFor="controlPassword" className="block text-900 font-medium mb-2" >Confirmer mot de passe</label>
                    <Password inputId="controlPassword" className="w-full mb-3" type="controlPassword" value={controlPassword} 
                        onChange={(e)=> setControlPassword(e.target.value)} required toggleMask />
                </div>
                <div className="password-confirm error"></div>

                <Button label="S'inscrire" icon="pi pi-user" iconPos="left" className="w-full mt-4" 
                    loading={loading} onClick={send} />
                
            </div>
        </div>
    );
};

export default Account;