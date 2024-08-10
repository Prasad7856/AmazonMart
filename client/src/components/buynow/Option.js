import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/Contextprovider';

export default function Option({ deletedata, get }) {
    const { account, setAccount } = useContext(LoginContext);

    const removedata = async (id) => {
        const res = await fetch(`/remove/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 400 || !data) {
            console.log("error in deleting a item");

        }
        else {
            setAccount(data)
            get();

            toast.success("Iteam remove from cart 😃!", {
                position: "top-center"
            });
        }


    }

    return (
        <div className="add_remove_select">
            <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)}>Delete</p><span>|</span>
            <p className="forremovemedia">Save Or Later</p><span>|</span>
            <p className="forremovemedia">See More like this</p>
            <ToastContainer />
        </div>
    )
}
