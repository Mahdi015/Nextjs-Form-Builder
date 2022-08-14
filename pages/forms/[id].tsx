import { useDispatch, useSelector } from "react-redux";
import { field, form, selectForms, test, updateForms } from "../../slices/formsSlice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";


const FormPage = (context: any) => {

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);


  const router = useRouter();
  const { id } = router.query;
  const values = useSelector(selectForms);
  const [currentForm, setcurrentForm] = useState<form>();
  const [formIndex,setformIndex] = useState<number>(0)
  const [testData,settestData] = useState(values)
  const dispatch = useDispatch()

  useEffect(() => {
    settestData(values)
    values.map((v, i) => {
      if (v.id == id) {
        setformIndex(i)
        // console.log(values[i]);
       
      }
    });
  }, [id]);
  useEffect(()=>{
    if (typeof window !== "undefined") {
      localStorage.setItem("forms", JSON.stringify(values));
    }
  },[values])
  const addInput = ()=>{
   
    let x = JSON.parse(JSON.stringify(values));

  x[formIndex].fields.push({type:"input",required:false,value:""})
  console.log(x[formIndex])
  dispatch(test(x))
    //   type:"input",required:false,value:""
    // }
    // testData[formIndex].fields.push(obj)
 
    // const test = Object.assign({type:"input",required:false,value:""}, values[formIndex].fields)
    // console.log(test)
 
    


    
  }

  const renderField = ()=>   values[formIndex].fields.map((f)=>{
    switch(f.type)
    {
      case "input" :
        return <div><input type="text"/></div>
      
      
    }
  })

 return( <>
  {domLoaded && (
  <div className="flex space-x-96 p-8 m-5">
  <div className="flex justify-center items-center flex-col border-solid border-slate-700 border-2 w-96  p-8 h-fit">
    <h1 className="font-bold text-xl mb-10">ELEMENTS</h1>
    <div className="space-y-12">
    <button onClick={()=>addInput()} className="bg-btnbg p-3 rounded font-medium w-80">Input</button>
    <button className="bg-btnbg p-3 rounded font-medium w-80">Input</button>
    <button className="bg-btnbg p-3 rounded font-medium w-80">Input</button>
    <button className="bg-btnbg p-3 rounded font-medium w-80">Input</button>
    </div>
  </div>
  <div className="flex  items-center flex-col border-solid border-slate-700 border-2 w-96 space-y-12 p-5">
   <>
   <h1 className="font-bold text-2xl mb-12">Form</h1>
  <>{values.length !=0 && renderField()}</>
    </>
  </div>
</div>
  )}
</>)
  // return (
  //   <div className="flex space-x-96 p-8 m-5">
  //     <div className="flex justify-center items-center flex-col border-solid border-slate-700 border-2 w-96  p-8 h-fit">
  //       <h1 className="font-bold text-xl mb-10">ELEMENTS</h1>
  //       <div className="space-y-12">
  //       <button onClick={()=>addInput()} className="bg-btnbg p-3 rounded font-medium w-80">Input</button>
  //       <button className="bg-btnbg p-3 rounded font-medium w-80">Input</button>
  //       <button className="bg-btnbg p-3 rounded font-medium w-80">Input</button>
  //       <button className="bg-btnbg p-3 rounded font-medium w-80">Input</button>
  //       </div>
  //     </div>
  //     <div className="flex  items-center flex-col border-solid border-slate-700 border-2 w-96 space-y-12 p-5">
  //      <>
  //      <h1 className="font-bold text-2xl mb-12">Form</h1>
  //     <>{values.length !=0 && renderField()}</>
  //       </>
  //     </div>
  //   </div>
  // );
};

export default FormPage;
