import React, { useState } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import Dashboard from './components/Dashboard';
import ButtonDemo from './components2/ButtonDemo';
import ChartDemo from './components2/ChartDemo';
import Documentation from './components2/Documentation';
import FileDemo from './components2/FileDemo';
import FloatLabelDemo from './components2/FloatLabelDemo';
import FormLayoutDemo from './components2/FormLayoutDemo';
import InputDemo from './components2/InputDemo';
import ListDemo from './components2/ListDemo';
import MenuDemo from './components2/MenuDemo';
import MessagesDemo from './components2/MessagesDemo';
import MiscDemo from './components2/MiscDemo';
import OverlayDemo from './components2/OverlayDemo';
import MediaDemo from './components2/MediaDemo';
import PanelDemo from './components2/PanelDemo';
import TableDemo from './components2/TableDemo';
import TreeDemo from './components2/TreeDemo';
import InvalidStateDemo from './components2/InvalidStateDemo';
import BlocksDemo from './components2/BlocksDemo';
import IconsDemo from './components2/IconsDemo';

import Crud from './pages/Crud';
import EmptyPage from './pages/EmptyPage';
import TimelineDemo from './pages/TimelineDemo';


import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
import Recette from './components/Recette';
import Ingredient from './components/Ingredient';
import Account from './components/Account';
import Login from './Login';
import About from './components/About';
import Utilisateur from './components/Utilisateur';

const App = (props) => {
    let userData = localStorage.getItem("user");
    let user = JSON.parse(userData);
    let type = user.typeUser;
    //console.log(type);
    let monMenu = [];

    if(type === "ADMINISTRATEUR"){
        monMenu = [
            {
                label: 'Home',
                items: [{
                    label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard'
                }]
            },
            {
                label: 'Paramètre', icon: 'pi pi-fw pi-sitemap',
                items: [
                    { label: 'Recette', icon: 'pi pi-fw pi-list', to: '/recette' },
                    { label: 'Ingrédient', icon: 'pi pi-fw pi-list', to: '/ingredient' },
                    { label: 'A propos ', icon: 'pi pi-user-plus', to: '/about'},
                    { label: 'Utilisateur ', icon: 'pi pi-user-plus', to: '/user'},
                ]
            },
        ]
    } else if(type === "UTILISATEUR"){
        monMenu = [
            {
                label: 'Home',
                items: [{
                    label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard'
                }]
            },
            {
                label: 'Paramètre', icon: 'pi pi-fw pi-sitemap',
                items: [
                    { label: 'Recette', icon: 'pi pi-fw pi-list', to: '/recette' },
                    { label: 'Ingrédient', icon: 'pi pi-fw pi-list', to: '/ingredient' },
                    { label: 'A propos ', icon: 'pi pi-user-plus', to: '/about'},
                ]
            },
        ]
    }
 

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard'
            }]
        },
        {
            label: 'Paramètre', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Recette', icon: 'pi pi-fw pi-list', to: '/recette' },
                { label: 'Ingrédient', icon: 'pi pi-fw pi-list', to: '/ingredient' },
                { label: 'A propos ', icon: 'pi pi-user-plus', to: '/about'},
                { label: 'Utilisateur ', icon: 'pi pi-user-plus', to: '/user'},
            ]
        },
        {
            label: 'UI Components', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
                { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
                { label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel" },
                { label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate" },
                { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button' },
                { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
                { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
                { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
                { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
                { label: "Media", icon: "pi pi-fw pi-image", to: "/media" },
                { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
                { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
                { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
                { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' },
            ]
        },
        {
            label: 'UI Blocks',
            items: [
                { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: "NEW" },
                { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-react' }
            ]
        },
        {
            label: 'Icons',
            items: [
                { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/icons' }
            ]
        },
        {
            label: 'Pages', icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud' },
                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
                { label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty' }
            ]
        },
        {
            label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
            items: [
                {
                    label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                            ]
                        },
                        {
                            label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                    ]
                },
                {
                    label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark' },
                            ]
                        },
                        {
                            label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            label: 'Get Started',
            items: [
                { label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => { window.location = "#/documentation" } },
                { label: 'View Source', icon: 'pi pi-fw pi-search', command: () => { window.location = "https://github.com/primefaces/sakai-react" } }
            ]
        }
    ];

    return (
        <>
            <AppTopbar onToggleMenuClick={props.onToggleMenuClick}
                layoutColorMode={props.layoutColorMode}
                mobileTopbarMenuActive={props.mobileTopbarMenuActive}
                onMobileTopbarMenuClick={props.onMobileTopbarMenuClick}
                onMobileSubTopbarMenuClick={props.onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={props.onSidebarClick}>
                <AppMenu model={menu}
                    onMenuItemClick={props.onMenuItemClick}
                    layoutColorMode={props.layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/dashboard" exact render={() => <Dashboard colorMode={props.layoutColorMode} location={props.location} />} />
                    <Route path="/formlayout" component={FormLayoutDemo} />
                    <Route path="/input" component={InputDemo} />
                    <Route path="/floatlabel" component={FloatLabelDemo} />
                    <Route path="/invalidstate" component={InvalidStateDemo} />
                    <Route path="/button" component={ButtonDemo} />
                    <Route path="/table" component={TableDemo} />
                    <Route path="/list" component={ListDemo} />
                    <Route path="/tree" component={TreeDemo} />
                    <Route path="/panel" component={PanelDemo} />
                    <Route path="/overlay" component={OverlayDemo} />
                    <Route path="/media" component={MediaDemo} />
                    <Route path="/menu" component={MenuDemo} />
                    <Route path="/messages" component={MessagesDemo} />
                    <Route path="/blocks" component={BlocksDemo} />
                    <Route path="/icons" component={IconsDemo} />
                    <Route path="/file" component={FileDemo} />
                    <Route path="/chart" render={() => <ChartDemo colorMode={props.layoutColorMode} location={props.location} />} />
                    <Route path="/misc" component={MiscDemo} />
                    <Route path="/timeline" component={TimelineDemo} />
                    <Route path="/crud" component={Crud} />
                    <Route path="/empty" component={EmptyPage} />
                    <Route path="/documentation" component={Documentation} />

                    <Route path="/user" component={Utilisateur} />
                    <Route path="/recette" component={Recette} />
                    <Route path="/ingredient" component={Ingredient} />
                    <Route path="/about" component={About} />
                </div>

                {/* <AppFooter layoutColorMode={layoutColorMode} /> */}
            </div>
        </>
    );

}

export default App;
