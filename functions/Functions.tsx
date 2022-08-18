import React from "react";
import { field } from "../slices/formsSlice";


type deleteFieldFnProps = {
    i: number;
    valuesToUpdate:any;
    formIndex:number;
    setvaluesToUpdate:(value:any)=>void;
  };

  type editModalFnProps = {
    i: number;
    setindexFieldToEdit: React.Dispatch<React.SetStateAction<number>>;
    setmodalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };

export const deleteField = ({i,valuesToUpdate,setvaluesToUpdate,formIndex}:deleteFieldFnProps) => {
    let obj = [...valuesToUpdate];
    obj[formIndex].fields.splice(i, 1);
    setvaluesToUpdate(obj);
  };
  

  export   const handleFileEdit = ({setindexFieldToEdit,setmodalOpen,i}:editModalFnProps) => {
    setindexFieldToEdit(i);
    setmodalOpen(true);
  };