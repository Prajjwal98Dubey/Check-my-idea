// import React from 'react'
import { useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { ADD_MY_PRODUCT, CLOUD_NAME, UPLOAD_PRESET } from "../helpers/backendapi"
import { config } from "../helpers/config"
const MyIdea = () => {
    const [name, setName] = useState("")
    const [shortDesc, setShortDesc] = useState("")
    const [keywords, setKeywords] = useState("")
    const [image, setImage] = useState("")
    const [logo, setLogo] = useState("")
    const [uploading, setUploading] = useState(false)
    const [showUploader, setShowUploader] = useState(false)
    const [longDesc, setLongDesc] = useState("")
    const [founderMessage, setFounderMessage] = useState("")
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (!name || !shortDesc || !logo || !keywords) {
            alert("Enter all the mandatory fields")
            return
        }
        const newKeywordsArray = keywords.split(",")
        await axios.post(ADD_MY_PRODUCT, {
            name: name,
            logo: logo,
            shortDescription: shortDesc,
            longDescription: longDesc,
            keywords: newKeywordsArray,
            founder:JSON.parse(localStorage.getItem("userCheckMyIdea")).email,
            founderMessage:founderMessage
        }, config)
        alert("Product listed")
        setName("")
        setKeywords("")
        setShortDesc("")
        setLongDesc("")
        setLogo("")
        setImage("")
    }
    const uploadImage = async (e) => {
        e.preventDefault()
        if (!image) {
            alert("Add a image")
            return
        }
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', UPLOAD_PRESET)
        await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: 'post',
            body: formData
        }).then((res) => res.json()).then((data) => setLogo(data.url)).catch((err) => console.log(err))
        setUploading(true)
    }
    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-[15px] font-Custom">
                <form>
                    <label htmlFor="name">Name of the Startup</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Telsa" className=" m-1 w-[450px] h-[45px] border border-gray-500 p-1 pl-2 rounded-lg" />
                    <br />
                    <label htmlFor="name">Founder Message</label>
                    <input type="text" value={founderMessage} onChange={(e) => setFounderMessage(e.target.value)} placeholder="e.g. message from the founder" className=" m-1 w-[450px] h-[45px] border border-gray-500 p-1 pl-2 rounded-lg" />
                    <br />
                    <label htmlFor="name">Description (short)</label>
                    <input type="text" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="e.g. making the world's most affordable and fast electric cars." className=" m-1 w-[450px] h-[45px] border border-gray-500 p-1 pl-2 rounded-lg " />
                    <br />
                    <label htmlFor="name">Description (Long)</label>
                    <input type="text" value={longDesc} onChange={(e) => setLongDesc(e.target.value)} placeholder="describe your idea in the best possible manner" className=" m-1 w-[450px] h-[45px] border border-gray-500 p-1 pl-2 rounded-lg " />
                    <br />
                    <label htmlFor="name">Keywords</label>
                    <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. [Automobile,Hardware,Software,Funded]" className=" m-1 w-[450px] h-[45px] border border-gray-500 p-1 pl-2 rounded-lg " /><span className="text-sm ml-[5px] text-gray-400">Tip: use comma after every word</span>
                    <br />
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    <span><button className="w-[140px] h-[30px] bg-blue-500 text-white hover:bg-blue-700 cursor-pointer" onClick={(e) => {
                        setShowUploader(true)
                        uploadImage(e)
                    }}>Upload</button></span>
                    {showUploader ? uploading ? <span>Uploaded</span> : <span>Uploading...</span> : null}
                    <div className="flex justify-center mt-[50px] ">
                        <button onClick={(e) => handleSubmitForm(e)} className="w-[140px] h-[30px] bg-blue-500 text-white hover:bg-blue-700 cursor-pointer">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default MyIdea