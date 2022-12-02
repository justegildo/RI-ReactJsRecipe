import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Switch } from 'react-router-dom';
import { InputTextarea } from 'primereact/inputtextarea';
import RecetteService from '../service/RecetteService';
import axios from "axios";
import IngredientService from '../service/IngredientService';


const Recette = () => {
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

const Table =(props)=>{
    const [items, setItems] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const {setForm, setYesNo} = props;

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {
        const recetteService = new RecetteService();
        recetteService.get().then(data =>{ 
            setLoading(false);
                setItems(data); 
            });
    }    
    //console.log(items)

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
                    url: `${process.env.REACT_APP_API_URL}api/recette/` + item._id})
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

    //console.log(items);
    
    return (
        <div>
            <h4>Mes recettes</h4>
            <Toolbar className="mb-4" 
                left={
                    <React.Fragment>
                        <div className="my-2">
                            <Button label="Créer une recette" icon="pi pi-plus" className="p-button-success mr-2" 
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
                <Column field="id" header="Numéro" sortable style={{width: "10px"}} hidden></Column>
                <Column field="nom" header="Libellé " sortable></Column>
                <Column field="temps" header="Temps " sortable hidden></Column>
                <Column field="nombrePersonne" header="Nombre de personnes " sortable ></Column>
                <Column field="difficultes" header="Difficulté" sortable body={(item) =>
                <span className={`customer-badge status-${item.difficultes === 'NORMALE'
                    ? 'new'
                    : (item.difficultes === 'FACILE' ? 'qualified' : 'unqualified')}`}>
                    {item.difficultes}
                </span>
                } />
                <Column field="description" header="Description " sortable ></Column>
                <Column field="prix" header="Prix " sortable ></Column>
                <Column field="ingredient" header="Ingrédients" sortable ></Column>
                <Column field="dateCreation" header="Date de création" sortable hidden></Column>
                <Column field="dateUpdate" header="Date update" sortable hidden></Column>
                <Column body={ (selectedItem)=>
                    <div className="flex justify-content-end">
                        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" 
                            onClick={()=> editItem(selectedItem)}/>
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2" 
                            onClick={()=> deleteItem(selectedItem)}/>
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
    const [ingredients, setIngredients] = useState(null);

    useEffect(()=> {
        if(!visible) return;
        const ingredientService = new IngredientService();
        ingredientService.getIngredients().then(data =>{ 
            setLoading(false);
            setIngredients(data);   
            })
    }, [visible])
    //console.log(JSON.stringify(ingredients, null, 2)); 

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
    }

    const submit = ()=>{
        if(!data) return;

        setYesNo(
            {   
                visible: true,
                message : data.id ? "Confirmez-vous la modification ?" : "Confirmez-vous l'ajout ?",
                hide: ()=> setYesNo((prev)=>({...prev, visible: false})),
                callback : ()=> {
                    setLoading(true);
                    if(data._id) {
                        //modification d'une recette
                        axios({
                            method: "put",
                            url: `${process.env.REACT_APP_API_URL}api/recette/` + data._id,
                                data,
                                coupleIngredients
                        })
                            .then((res) => {
                                setLoading(false);
                                console.log("modification réussi");
                            })
                            .catch ((err) => {
                                console.log(err);
                            }); 
                    
                    } else {
                        //création d'une recette
                        console.log(data);
                        axios({
                            method: "post",
                            url: `${process.env.REACT_APP_API_URL}api/recette/register/`,
                            data,
                            coupleIngredients
                        })
                            .then((res) => {
                                setLoading(false);
                                console.log("Réussi");
                            })
                            .catch ((err) => {
                                console.log(err);
                            });
                    };
                }
            }
        )
    }

    const [selectedCoupleIngredient, setSelectedCoupleIngredient] = useState();
    const [coupleIngredients, setCoupleIngredients] = useState([]);

    const addChoice = ()=>{
        if(!selectedCoupleIngredient) return;
        let items = [...coupleIngredients, ...[selectedCoupleIngredient]];
        setCoupleIngredients(items);
        setSelectedCoupleIngredient(null);
    }

    let essai = JSON.stringify(coupleIngredients, null, 2);
    console.log(essai);

    const removeSelectedCoupleIngredient = (selectedCoupleIngredient)=> {
        let index = coupleIngredients.indexOf(selectedCoupleIngredient);
        coupleIngredients.splice(index, 1);
        setCoupleIngredients([...coupleIngredients]);
    }

    return(

        <Dialog visible={visible} style={{ width: '600px' }} header="Détails d'un ingrédient" modal className="p-fluid" 
            footer={
                <>
                    <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={hide}  />
                    <Button label="Valider" icon="pi pi-check" className="p-button-text" onClick={submit} loading={loading} />
                </>
            } 
            onHide={hide}
            >  
                <div className="field" hidden>
                    <label htmlFor="id">Identifiant</label>
                    <InputText id="id" value={data && data.id} onChange={bind} readOnly />
                </div>
                <div className="field">
                    <label htmlFor="nom">Libellé</label>
                    <InputText id="nom" value={data && data.nom} onChange={bind} required />
                </div>
                <div className="field">
                    <label htmlFor="temps">Temps (en minutes) </label>
                    <InputText id="temps" value={data && data.temps} onChange={bind} required />
                </div>
                <div className="field">
                    <label htmlFor="nombrePersonne">Nombre de personnes </label>
                    <InputText id="nombrePersonne" value={data && data.nombrePersonne} onChange={bind} required />
                </div>
                <div className="field">
                    <label htmlFor="difficultes">Difficulté </label>
                    <Dropdown id="difficultes" onChange={bind} placeholder="Aucune sélection" value={data?.difficultes}
                        options={["FACILE", "NORMALE" ,"DIFFICILE"]} />
                </div>
                <div className="field">
                    <label htmlFor="description">Description </label>
                    <InputTextarea id="description" value={data && data.description} onChange={bind} required autoResize />
                </div>
                <div className="field">
                    <label htmlFor="prix">Prix</label>
                    <InputText id="prix" value={data && data.prix} onChange={bind} required />
                </div>
                <div className="field">
                    <label htmlFor="dateCreation">Date de création</label>
                    <Calendar id="dateCreation" value={data && new Date(data.dateCreation)} onChange={bind}
                        dateFormat="dd/mm/yy" mask="99/99/9999"  />
                </div>
                <div className="field">
                    <label htmlFor="dateUpdate">Date de mise à jour</label>
                    <Calendar id="dateUpdate" value={data && new Date(data.dateUpdate)} onChange={bind}
                        dateFormat="dd/mm/yy" mask="99/99/9999"  />
                </div>
                <div className="field">
                    <label htmlFor="ingredientsList">Ingrédients</label>
                    <Dropdown id="ingredientsList" options={ingredients} 
                        onChange={(e)=> {setSelectedCoupleIngredient({...selectedCoupleIngredient, ingredient: e.value})}} 
                        value={selectedCoupleIngredient?.ingredient} 
                        optionLabel="nom" 
                        placeholder="Aucune sélection" />
                </div>
                <div className="field">
                    <Button label="Ajouter" className="my-2" onClick={addChoice} />
                </div>

                <DataTable dataKey="id" value={coupleIngredients} responsiveLayout="scroll" 
                paginator rows={10}>
                <Column field="ingredient.nom" header="Libellé"></Column>
                <Column field="ingredient.quantite" header="Quantité"></Column>
                <Column body={ (selectedItem)=>
                    <div className="flex justify-content-end">
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2" 
                            onClick={()=> removeSelectedCoupleIngredient(selectedItem)} />
                    </div>
                } />   
            </DataTable>
                
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

export default Recette;