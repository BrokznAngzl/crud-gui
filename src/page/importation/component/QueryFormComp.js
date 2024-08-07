import React from "react";
import FormQueryHeaderComp from "../../../component/form/FormQueryHeaderComp";
import FormButtonComp from "../../../component/form/FormButtonComp";
import QueryFormBodyComp from "./QueryFormBodyComp";

const QueryFormComp = (props) => {
    const {
        toggleForm, showForm, title, buttons,
        startDate, setStartDate, endDate, setEndDate, breeds, setBreeds, housingID, setHousingID, avgWeight,
        setAvgWeight, quanity, setQuanity, allBreeds, allHousing, importCode, setImportCode
    } = props

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <FormQueryHeaderComp {...{toggleForm, showForm, title}}/>

            {showForm && (
                <QueryFormBodyComp
                    {...{
                        startDate, setStartDate, endDate, setEndDate,
                        setAvgWeight, avgWeight, setQuanity, quanity,
                        setBreeds, breeds, setHousingID, housingID,
                        allHousing, allBreeds, importCode, setImportCode
                    }}
                />
            )}

            {showForm && (
                <FormButtonComp buttons={buttons}/>
            )}
        </div>
    )

}

export default QueryFormComp