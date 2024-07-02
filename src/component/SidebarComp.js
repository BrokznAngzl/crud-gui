import React, {useContext, useState} from "react";
import '../Stysheet.css'
import {AppContext} from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import SideMenuComp from "./SideMenuComp";
import {TbFileReport, TbTable} from "react-icons/tb";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";

const SidebarComp = () => {
    const {t} = useTranslation();
    const {sidebarItems, setSidebarItems, page, setPage} = useContext(AppContext);
    const [tableMenu, setTableMenu] = useState(true);
    const [reportMenu, setReportMenu] = useState(false);

    const sideMenuObj = [
        {
            title: t('side.menu.customer'),
            href: 'customer'
        },
        {
            title: t('side.menu.housing'),
            href: 'housing'
        },
        {
            title: t('side.menu.breeds'),
            href: 'breeds'
        },
        {
            title: t('side.menu.import'),
            href: 'import'
        },
        {
            title: t('side.menu.farm'),
            href: 'farm'
        },
    ]

    const sideReportObj = [
        {
            title: 'TEST Report',
            href: 'abcreport'
        },
        {
            title: 'DFG Report',
            href: 'dfgreport'
        },
    ]

    return (
        <div className={`md:flex md:flex-col w-64 bg-gray-800 sidebar ${sidebarItems ? 'show' : 'hidden'}`}>
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <span className="text-white font-bold uppercase">Porky Database</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 bg-gray-800">
                    <div>
                        <div
                            className={"flex justify-between content-between w-full hover:bg-gray-700 text-gray-100 cursor-pointer"}
                            onClick={(e) => setTableMenu(!tableMenu)}>
                            <div>
                                <p
                                    className="flex items-center px-4 py-2">
                                    <TbTable className="h-5 w-5 mr-2"/>
                                    {t('side.menu.table')}
                                </p>
                            </div>
                            <div className={"flex justify-content items-center px-4 py-2"}>
                                {
                                    tableMenu ? <AiFillCaretUp/> : <AiFillCaretDown/>
                                }
                            </div>
                        </div>

                        {
                            tableMenu && <SideMenuComp sideMenu={sideMenuObj}/>
                        }
                    </div>
                    <div>
                        <div
                            className={"flex justify-between content-between w-full hover:bg-gray-700 text-gray-100 cursor-pointer"}
                            onClick={(e) => setReportMenu(!reportMenu)}>
                            <div>
                                <p
                                    className="flex items-center px-4 py-2">
                                    <TbFileReport className="h-5 w-5 mr-2"/>
                                    {t('side.menu.report')}
                                </p>
                            </div>
                            <div className={"flex justify-content items-center px-4 py-2"}>
                                {
                                    reportMenu ? <AiFillCaretUp/> : <AiFillCaretDown/>
                                }
                            </div>
                        </div>

                        {
                            reportMenu && <SideMenuComp sideMenu={sideReportObj}/>
                        }
                    </div>

                </nav>
            </div>
        </div>
    );
};

export default SidebarComp