import React, { useState } from "react";

function EditInfoModal({ selfData, handleEditFunc }) {
  const [data, setData] = useState({ f_name: selfData.f_name, headline: selfData.headline, curr_company: selfData.curr_company, curr_location: selfData.curr_location })

  const onChangeHandle = (e, key) => {
    setData({ ...data, [key]: e.target.value })
  }

  const handleSaveBtn = async () => {
    let newData = { ...selfData, ...data }
    handleEditFunc(newData);
  }

  return (
    <div className="mt-8 w-full h-[350px] overflow-auto">
      <div className="profile-icons w-full mb-4">
        <label>Full Name*</label>
        <br />
        <input type="text" value={data.f_name} onChange={(e) => { onChangeHandle(e, 'f_name') }} className="input-context p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter full Name" />

      </div>


      <div className="profile-icons w-full mb-4">
        <label>Headline*</label>
        <br />
        <textarea value={data.headline} onChange={(e) => { onChangeHandle(e, 'headline') }} cols={10} rows={3} className="input-context p-2 mt-1 w-full border-1 rounded-md"></textarea>
      </div>

      <div className="profile-icons w-full mb-4">
        <label>Current Company*</label>
        <br />
        <input type="text" value={data.curr_company} onChange={(e) => { onChangeHandle(e, 'curr_company') }} className="input-context p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter current company" />

      </div>

      <div className="profile-icons w-full mb-4">
        <label>Current Location*</label>
        <br />
        <input type="text" value={data.curr_location} onChange={(e) => { onChangeHandle(e, 'curr_location') }} className="input-context p-2 mt-1 w-full border-1 rounded-md" placeholder="Enter current Location" />

      </div>
      <br />
      <div className=" upload-btn" onClick={handleSaveBtn}>Save</div>

    </div>
  )
}

export default EditInfoModal;