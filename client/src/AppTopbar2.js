import React, {useState}  from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export const AppTopbar = (props) => {
    const [yesNo, setYesNo] = useState({});

    const logout =()=>{
        console.log("coucou")
        setYesNo({
            visible: true,
            message: "Voulez-vous vraiment se déconnecter ?",
            hide: ()=> setYesNo((prev)=>({...prev, visible: false})),
        })
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


    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.svg' : 'assets/layout/images/logo-white.svg'} alt="logo"/>
                <span>SymRecipe</span>
            </Link>

            <Confirmation {...yesNo} />

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar"/>
                            <span>Events</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" /*onClick={}*/ >
                            <i className="pi pi-cog"/>
                            <span>Settings</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={logout}>
                           {/*  <i className="pi pi-user"/>
                            <span>Déconnexion </span> */}
                           
                        </button>
                    </li>
                </ul>
                <Button label=' Déconnexion' onClick={logout}/>
        </div>
    );
}
