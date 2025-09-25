import React, { useState } from "react";

function ExpModal({ selfData, handleEditFunc, updateExp, setUpdateExp }) {

    const [data, setData] = useState({ designation: updateExp?.clicked ? updateExp?.data?.designation : "", company_name: updateExp?.clicked ? updateExp?.data?.company_name : "", duration: updateExp?.clicked ? updateExp?.data?.duration : "", location: updateExp?.clicked ? updateExp?.data?.location : "" })
    const onChangeHandle = (e, key) => {
        setData({ ...data, [key]: e.target.value })
    }

    const handleOnDelete = () => {
        let newFilteredData = selfData?.experience.filter((item) => item._id !== updateExp?.data?._id)
        let newData = { ...selfData, experience: newFilteredData }
        handleEditFunc(newData);

    }

    const handleOnSave = () => {
        if (updateExp?.clicked) return updateExpSave()
        let expArr = [...selfData?.experience, data]
        let newData = { ...selfData, experience: expArr }
        handleEditFunc(newData);
    }

    const updateExpSave = () => {
        let newFilteredData = selfData?.experience?.filter((item) => item._id !== updateExp?.data?._id)
        let newArr = [...newFilteredData, data]
        let newData = { ...selfData, experience: newArr }
        handleEditFunc(newData);
    }

    return (
        <div className="mt-8 w-full h-[350px] overflow-auto">
            <div className="profile-icons w-full mb-4">
                <label>Role*</label>
                <br />
                <input value={data.designation} onChange={(e) => onChangeHandle(e, 'designation')} type="text" className="input-context p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter Role" />

            </div>

            <div className="profile-icons w-full mb-4">
                <label>Company*</label>
                <br />
                <input value={data.company_name} onChange={(e) => onChangeHandle(e, 'company_name')} type="text" className="input-context p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter Company Name" />

            </div>

            <div className="profile-icons w-full mb-4">
                <label>Duration*</label>
                <br />
                <input value={data.duration} onChange={(e) => onChangeHandle(e, 'duration')} type="text" className="input-context p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter Duration" />

            </div>

            <div className="profile-icons w-full mb-4">
                <label>Place*</label>
                <br />
                <input value={data.location} onChange={(e) => onChangeHandle(e, 'location')} type="text" className="input-context p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter Place" />


            </div>
            <br />
            <div className="flex justify-between">
                <div className=" upload-btn" onClick={handleOnSave}>Save</div>
                {
                    updateExp?.clicked && <div className=" upload-btn" onClick={handleOnDelete}>Delete</div>
                }
            </div>



        </div>
    )
}

export default ExpModal;