import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar'
import IngredientService from '../service/IngredientService';
import axios from "axios";

const Ingredient = () => {
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
        const ingredientService = new IngredientService();
        ingredientService.getIngredients().then(data =>{ 
            setLoading(true);
                setItems(data);   
            })
    }    
 
    const openNew = () => {
        setForm({
            visible: true,
            hide: ()=> setForm((prev)=>({...prev, visible: false})),
            data: null,
            setData: (data)=> setForm((prev)=>({...prev, data})),
            callback: ()=> {
                setLoading(true);
                loadItems();
            }
        });
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
                    url: `${process.env.REACT_APP_API_URL}api/ingredient/` + item._id})
                    .then((res) => {
                        setLoading(false);
                        loadItems();
                        console.log("suppression r??ussi");
                    })
                    .catch ((err) => {
                        console.log(err);
                    }); 
            }
        })
    }


    return (
        <div>
            <h4>Mes ingr??dients</h4>
            <h6>Il y a  ingr??dients</h6>
            <Toolbar className="mb-4" 
                left={
                    <React.Fragment>
                        <div className="my-2">
                            <Button label="Cr??er un ingr??dient" icon="pi pi-plus" className="p-button-success mr-2" 
                                onClick={openNew} />
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
                <Column field="id" header="Num??ro" sortable hidden></Column>
                <Column field="nom" header="Libell?? " sortable></Column>
                <Column field="prix" header="Prix " sortable></Column>
                <Column field="quantite" header="Quantit?? " sortable></Column>
                <Column field="dateCreation" header="Date de cr??ation" dateFormat="mm/dd/yy" sortable></Column>
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
                        //modification d'ingredient
                        axios({
                            method: "put",
                            url: `${process.env.REACT_APP_API_URL}api/ingredient/` + data._id,
                                data,
                        })
                            .then((res) => {
                                setLoading(false);
                                console.log("modification r??ussi");
                            })
                            .catch ((err) => {
                                console.log(err);
                            });
                    
                    } else {
                        //cr??ation d'ingr??dient
                        axios({
                            method: "post",
                            url: `${process.env.REACT_APP_API_URL}api/ingredient/register/`,
                            data
                        })
                            .then((res) => {
                                setLoading(false);

                                console.log("R??ussi");
                                //alert("R??ussi");
                            })
                            .catch ((err) => {
                                console.log(err);
                            });
                    };
                },
            }
        )
    }

    return(

        <Dialog visible={visible} style={{ width: '500px' }} header="D??tails d'un ingr??dient" modal className="p-fluid" 
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
                    <label htmlFor="id">Num??ro</label>
                    <InputText id="id" value={data && data.id} onChange={bind} readOnly />
                </div>
                <div className="field">
                    <label htmlFor="nom">Libell??</label>
                    <InputText id="nom" value={data && data.nom} onChange={bind} required /*tooltip="libell??"*/
                        />
                        {/* <Message severity="error" text="Username is required" /> */}
                </div>
                <div className="field">
                    <label htmlFor="prix">Prix </label>
                    <InputText id="prix" value={data && data.prix} onChange={bind} required />
                </div>
                <div className="field">
                    <label htmlFor="quantite">Quantite </label>
                    <InputText id="quantite" value={data && data.quantite} onChange={bind} required />
                </div>
                <div className="field" hidden>
                    <label htmlFor="dateCreation">Date de cr??ation</label>
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

export default Ingredient;

