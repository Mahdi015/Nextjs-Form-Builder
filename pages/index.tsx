import type { NextPage } from 'next'
import forms from "../assets/forms.png"
import Image from 'next/image'
import { useDispatch,useSelector } from 'react-redux'
import type { RootState } from '../store'
import {useState, useEffect } from 'react'
import { form, selectForms, updateForms } from '../slices/formsSlice'
import AddFormModal from '../views/Modals/AddFormModal'
const Home: NextPage = () => {

  const [formsValues,setformsValues] = useState<form[]>()
  const [modalOpen,setmodalOpen] = useState(false)
  const values = useSelector(selectForms)
const dispatch = useDispatch()
  useEffect(()=>{
    setformsValues(values)
    console.log(values)
    if (typeof window !== "undefined") {
      localStorage.setItem("forms", JSON.stringify(values));
    }
  },[values])
  return (
   <div className='flex justify-center  flex-col items-center p-8 m-5'>
      <h1 className='font-bold text-4xl mb-28'>WeavesLines Form Builder</h1>
      <Image
      src={forms}
      width="200px"
      height="180px"
      />
      <h1 className='font-medium'>YOU DON'T HAVE ANY FORM YET!</h1>
      <p className='mt-2 mb-12 font-normal text-slate-400	text-sm'>Your form will appear here</p>
      <button onClick={()=>setmodalOpen(true)} className='bg-btnbg p-3 rounded font-medium w-80'>CREATE FORM</button>
    <AddFormModal modalOpen={modalOpen} setmodalOpen={setmodalOpen}/>
    {formsValues && formsValues.map((f)=>(
      <a href={`/forms/${f.id}`}>{f.name}</a>
    ))}
   </div>

  )
}

export default Home
