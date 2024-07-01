import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {AiFillCaretLeft} from "react-icons/ai";
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import BreedsApi from "../../apiurl/BreedsApi";

const AddBreedsPage = () => {
    const {setPage, client} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [error, setError] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [breedsName, setBreedsName] = useState();

    const createBreeds = async () => {
        try {
            const breeds = {
                "breedsName": breedsName
            }

            const response = await client.post(BreedsApi.BREEDS, breeds);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setAlertBox(true)
        }
    }

    const resetForm =()=>{
        setBreedsName('')
    }

    const buttons = [
        {
            func: createBreeds,
            name: 'Save Breeds',
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: 'Reset Form',
            colorStyle: 'bg-blue-600 hover:bg-blue-700',
        },

    ]

    useEffect(() => {
        if (alertBox) {
            const timer = setTimeout(() => {
                setAlertBox(false);
                setResponseCode()
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [alertBox]);

    return (
        <div>
            <div className="text-center m-5 mt-24 w-2/4">
                {alertBox && (
                    responseCode === 201 ? (
                        <SaveDataSuccessComp title={'breeds'} />
                    ) : (
                        <SaveDataFailedComp title={'breeds'} />
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={'Add Breeds'} prevPage={'breeds'}/>
                <FormBodyComp setBreedsName={setBreedsName} breedsName={breedsName}/>
                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )

}

export default AddBreedsPage