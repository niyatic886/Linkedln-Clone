import React from "react";

function MessageModal(){

    return(
        <div className="my-4">
              <div className="profile-icons w-full mb-4">
            
            
           <textarea cols={10} rows={10} placeholder="Enter Message" className="input-context p-2 mt-1 w-full border-1 rounded-md"></textarea>
        </div>
         <br />
        <div className=" upload-btn">Save</div>

        </div>
    )
}

export default MessageModal