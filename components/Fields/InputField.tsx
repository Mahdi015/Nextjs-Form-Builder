import React from 'react'
import { field } from '../../slices/formsSlice';
import { Draggable } from '../Draggable';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

import { deleteField, handleFileEdit } from '../../functions/Functions';



type Props = {
    i: number;
    f:field;
    formIndex:number;
    setvaluesToUpdate:(value:any)=>void;
    setindexFieldToEdit: React.Dispatch<React.SetStateAction<number>>;
    setmodalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    valuesToUpdate:any;
  

  };


function InputField({f,i,formIndex,setvaluesToUpdate,setindexFieldToEdit,valuesToUpdate,setmodalOpen}:Props) {
  return (
    <Draggable id={f.dragId}>
      <div key={i}  className="group flex flex-col items-start mb-8 relative hover:shadow-inputboxshadow transition duration-200 ease-in p-3 rounded-xl">
        <div className=" absolute top-3 right-3 flex space-x-1">
          <AiFillDelete
            className="z-50"
            color="#a50050"
            onClick={() =>
              deleteField({ i, valuesToUpdate, setvaluesToUpdate, formIndex })
            }
          />{" "}
          <AiFillEdit
            onClick={() =>
              handleFileEdit({ setindexFieldToEdit, setmodalOpen, i })
            }
            color="#F48225"
            className="z-50"
          />
        </div>
        <label className="block mb-2 text-sm font-medium  text-gray-300 ">
          {f.fieldTitle}
          {f.required ? (
            <span className="text-rose-500 text-sm ml-px  ">*</span>
          ) : (
            ""
          )}
        </label>
        <input
          type="text"
          className="bg-inputbg border outline-none  z-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  border-inputborder placeholder-gray-400 text-white "
          required={f.required}
        />
      </div>
    </Draggable>
  );
}

export default InputField