import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import {AppContext} from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import DataStatusMessage from "../../component/DataStatusMessage";
import BreedsApi from "../../apiurl/BreedsApi";
import QueryFormComp from "./component/QueryFormComp";

const BreedsPage = () => {
    const { t } = useTranslation();
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = [t('table.id'), t('table.name')]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [breedsName, setBreedsName] = useState();

    const getAllBreeds = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get(BreedsApi.BREEDS)
            setTableData(await response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const deleteBreeds = async (record) => {
        try {
            const breeds = {
                "breedsID": record.breedsID
            }
            const response = await client.delete(BreedsApi.BREEDS, {
                data: breeds
            })

            if (response.status === 204) {
                console.log('deleted successfully')
                getAllBreeds()

            }
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setBreedsName('')
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`${t('alert.box.delete.request')} ${record.breedsName} ?`);
        if (result) deleteBreeds(record)
    };

    const findBreeds = async () => {
        try {
            if (!breedsName) {
                getAllBreeds()
            } else {
                const breeds = {
                    breedsID: null,
                    breedsName: breedsName
                }
                setLoading(true)
                setTableData()
                const result = await client.post(BreedsApi.FIND, breeds);
                const queryResult = await result.data
                if (queryResult && queryResult.length > 0) {
                    setTableData(queryResult)
                }
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    useEffect(() => {
        getAllBreeds()
    }, []);

    const buttons = [
        {
            func: findBreeds,
            name: t('button.find.breeds'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },
    ]

    return (
        <div>
            {/* form */}
            <div className={"flex justify-between"}>
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={t('form.header.breeds')}
                               breedsName={breedsName} setBreedsName={setBreedsName}
                               buttons={buttons}/>

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('addbreeds')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {t('form.header.breeds.add')}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg={t('status.loading')} textColor={'text-gray-600'}/>
            ) : (tableData && tableData.length !== 0) ?(
                <TableComp {...{tableData, columnHeader}} management={true}
                           editePage={'editbreeds'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg={t('status.no.data')} textColor={'text-red-600'}/>
            )}

        </div>
    );
};

export default BreedsPage;
