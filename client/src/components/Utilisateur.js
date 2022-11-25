import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar'
import UtilisateurService from '../service/UtilisateurService';
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';


const Utilisateur = () => {
    const [yesNo, setYesNo] = useState({});
    const [form, setForm] = useState({});
    
    return (
        <div>
            <div className="card">
                <Table {...{setForm, setYesNo}} />
                <Form {...{form, setYesNo}} />
               <Confirmation {...yesNo} /> 
            </div>
            
        </div>
    );
};

const Table = (props) =>{
    const [items, setItems] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const {setForm, setYesNo} = props;

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {
        const utilisateurService = new UtilisateurService();
        utilisateurService.getUtilisateurs().then(data =>{ 
            setLoading(false);
                setItems(data);   
            })
    }    

    const editItem = (item)=>{
        setForm({
            visible: true,
            hide: ()=> setForm((prev)=>({...prev, visible: false})),
            data: item,
            setData: (data)=> setForm((prev)=>({...prev, data})),
            callback: ()=> {
                setLoading(true);
                loadItems();
            }
        })
    }

    const deleteItem =(item)=>{
        setYesNo({
            visible: true,
            message: "Confirmez-vous la suppression ?",
            hide: ()=> setYesNo((prev)=>({...prev, visible: false})),
            callback: ()=>{
                setLoading(true);
                axios({
                    method: "delete",
                    url: `${process.env.REACT_APP_API_URL}api/user/` + item._id})
                    .then((res) => {
                        setLoading(false);
                        loadItems();
                        console.log("suppression réussi");
                    })
                    .catch ((err) => {
                        console.log(err);
                    }); 
            }
        })
    }


    return (
        <div>
            <Toolbar className="mb-4" 
                left={
                    <React.Fragment>
                        <div className="my-2">
                            <Button label="Actualiser" icon="pi pi-refresh" className="p-button-primry mr-2" 
                                onClick={()=>{setLoading(true); loadItems()}} />
                        </div>
                    </React.Fragment>
                } 
                right={
                    <React.Fragment>
                        <span className="block mt-2 md:mt-0 p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText type="search" placeholder="Recherche..." onInput={(e) => setGlobalFilter(e.target.value)} />
                        </span>
                    </React.Fragment>
                } />
            <DataTable value={items} dataKey="id" globalFilter={globalFilter} responsiveLayout="scroll"
                paginator rows={10}>
                <Column field="id" header="Numéro" sortable hidden></Column>
                <Column field="nom" header="Nom & Prénoms" sortable></Column>
                <Column field="pseudo" header="Pseudo " sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="telephone" header="Téléphone" sortable></Column>
                <Column field="typeUser" header="Type utilisateur" sortable body={(item) =>
                <span className={`customer-badge status-${item.typeUser === 'ADMINISTRATEUR'
                    ? 'new' : 'qualified'}`}>
                    {item.typeUser}
                </span>
                } />
                <Column field="dateCreation" header="Date de création" sortable hidden></Column>
                <Column body={ (selectedItem)=>
                    <div className="flex justify-content-end">
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={()=> editItem(selectedItem)} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2" onClick={()=> deleteItem(selectedItem)} />
                    </div>
                } />
            </DataTable>
        </div>
    );
}


const Form = (props) =>{
    const {visible, hide, data, setData, callback } = props.form;
    const {setYesNo} = props;
    const[loading, setLoading] = useState(false);

    const bind = (e) => {
        if(e.target.value !== undefined) {
            let value = e.target.value;
            //value = value.id ? {id: value.id} : value;
            setData({...data, [e.target.id]: value});
        }
        else if(e.checked !== undefined) {
            setData({...data, [e.target.id]: e.target.checked});
        }else{
            alert("Binding fails.")
        }
        //alert(JSON.stringify(data, null, 2))
    }

    const submit = ()=>{
        if(!data) return;

        setYesNo(
            {   
                visible: true,
                message : data._id ? "Confirmez-vous la modification ?" : "Confirmez-vous l'ajout ?",
                hide: ()=> setYesNo((prev)=>({...prev, visible: false})),
                callback : ()=> {
                    setLoading(true);
                    if(data._id) {
                        //modification d'Utilisateur
                        axios({
                            method: "put",
                            url: `${process.env.REACT_APP_API_URL}api/user/` + data._id,
                                data
                        })
                            .then((res) => {
                                setLoading(false);
                                console.log("modification réussi");
                            })
                            .catch ((err) => {
                                console.log(err);
                            }); 
                    }
                },
            }
        )
    }

    return(

        <Dialog visible={visible} style={{ width: '500px' }} header="Détails d'un utilisateur" modal className="p-fluid" 
            footer={
                <>
                    <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hide}  />
                    <Button label="Valider" icon="pi pi-check" className="p-button-text" onClick={submit} 
                        loading={loading} />
                </>
            } 
            onHide={hide}
            >  
                <div className="field" hidden>
                    <label htmlFor="id">Identifiant</label>
                    <InputText id="id" value={data && data.id} onChange={bind} readOnly />
                </div>
                <div className="field">
                    <label htmlFor="nom">Nom & Prénoms</label>
                    <InputText id="nom" value={data && data.nom} onChange={bind} required />
                </div>
                <div className="field">
                    <label htmlFor="pseudo">Pseudo </label>
                    <InputText id="pseudo" value={data && data.pseudo} onChange={bind} required />
                </div>
                <div className="field">
                    <label htmlFor="email">Adresse email </label>
                    <InputText id="email" value={data && data.email} onChange={bind} required />
                </div>
                <div className="field">
                    <label htmlFor="telephone">Téléphone </label>
                    <InputText id="telephone" value={data && data.telephone} onChange={bind} required />
                </div>
                <div className="field">
                    <label htmlFor="typeUser">Type utilisateur </label>
                    <Dropdown id="typeUser" onChange={bind} 
                        placeholder="Aucune sélection" value={data?.typeUser}
                        options={["ADMINISTRATEUR", "UTILISATEUR"]} />
                </div>
                <div className="field">
                    <label htmlFor="dateCreation">Date de création</label>
                    <Calendar id="dateCreation" value={data && new Date(data.dateCreation)} onChange={bind}
                        dateFormat="dd/mm/yy" mask="99/99/9999"  />
                </div>
        </Dialog>
    )
}


const Confirmation = (props)=>{
    const {visible, hide, message, callback } = props;
    
    return (
        <Dialog modal visible={visible} onHide={hide} 
            header="Confirmation" style={{ width: '350px' }}
            footer={
                <>
                    <Button type="button" label="Non" icon="pi pi-times" 
                        onClick={hide} 
                        className="p-button-text" />
                    <Button type="button" label="Oui" icon="pi pi-check" 
                        onClick={() => { hide(); callback() }} 
                        className="p-button-text" autoFocus />
                </>
            }>
            <div className="flex align-items-center justify-content-center">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                <span>{message != null ? message : "Voulez-vous continuer ?"}</span>
            </div>
        </Dialog>
    )
} 

export default Utilisateur;

