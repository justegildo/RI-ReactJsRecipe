import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useHistory } from 'react-router-dom';

export const AppTopbar = (props) => {
    const [yesNo, setYesNo] = useState({});
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [position, setPosition] = useState('center');
    const history = useHistory();

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayPosition': setDisplayPosition,
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Fermer" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            </div>
        );
    };

    // pour utiliser les données stockées dans le localStorage, il faut les convertir
    let userData = localStorage.getItem("user");
    let user = JSON.parse(userData);
    let firstLettre = user.nom;
    
    const logout = () => {
        setYesNo({
            visible: true,
            message: "Voulez-vous vraiment se déconnecter ?",
            hide: () => setYesNo((prev) => ({ ...prev, visible: false })),
            callback: () => {
                localStorage.clear('token');
                history.push("/login");
            }
        })
    }

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 
                    'assets/layout/images/logo-dark.svg' : 
                    'assets/layout/images/logo-white.svg'} alt="logo" />
                <span>RI-Recipe</span>
            </Link>

            <Confirmation {...yesNo} />

            <div className="card">
                <Dialog header="Détails de l'utilisateur" visible={displayPosition} position={position} 
                    onHide={() => onHide('displayPosition')} style={{ width: '24vw' }} modal 
                    footer={renderFooter('displayPosition')}
                    draggable={false} resizable={false}>
                    <p>Nom & prénoms: <em>{ user.nom}</em> </p>
                    <p>Pseudo: <em>{ user.pseudo}</em></p>
                    <p>Email: <em>{ user.email}</em></p>
                    <p>Type d'utilisateur: <em>{ user.typeUser}</em></p>
                </Dialog>
            </div>
            

            <button type="button" className="p-link  layout-menu-button 
                layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button 
                layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", 
                { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                <li>
                    <Button label={firstLettre.charAt(0)} className="p-button-rounded mr-2 mb-2" 
                       onClick={() => onClick('displayPosition', 'top-right')}
                    />
                </li>
                <li>
                    <Button className='p-button-rounded p-button-danger mr-2 mb-2' 
                        icon="pi pi-power-off" onClick={logout} />
                </li>
            </ul>

        </div>
    );
}


const Confirmation = (props) => {
    const { visible, hide, message, callback } = props;

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