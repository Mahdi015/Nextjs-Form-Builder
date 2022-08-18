import React from "react";
import { field } from "../../slices/formsSlice";
import { Draggable } from "../Draggable";

//Import Icons
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteField, handleFileEdit } from "../../functions/Functions";

type Props = {
  i: number;
  f: field;
  formIndex: number;
  setvaluesToUpdate: (value: any) => void;
  setindexFieldToEdit: React.Dispatch<React.SetStateAction<number>>;
  setmodalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  valuesToUpdate: any;
};

function Selectinput({
  f,
  i,
  formIndex,
  setvaluesToUpdate,
  setindexFieldToEdit,
  valuesToUpdate,
  setmodalOpen,
}: Props) {
  return (
    <Draggable id={f.dragId}>
      <div key={i}  className="group flex flex-col items-start mb-8 relative hover:shadow-inputboxshadow transition duration-200 ease-in p-3 rounded-xl">
        <div className="absolute top-3 right-3 flex space-x-1">
          <AiFillDelete
            className="cursor-pointer z-50"
            color="#a50050"
            onClick={() =>
              deleteField({ i, valuesToUpdate, setvaluesToUpdate, formIndex })
            }
          />{" "}
          <AiFillEdit
            onClick={() =>
              handleFileEdit({ setindexFieldToEdit, setmodalOpen, i })
            }
            className="cursor-pointer z-50"
            color="#F48225"
          />
        </div>
        <label className="block mb-2 text-sm font-medium  text-gray-300 z-50 select-none">
          {f.fieldTitle}
          {f.required ? (
            <span className="text-rose-500 text-sm ml-px  ">*</span>
          ) : (
            ""
          )}
        </label>
        <select
          required={f.required}
          id={`select${i}`}
          className=" border z-50 text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        >
          {f.options?.map((o, i) => (
            <option key={i} value={o.title}>{o.title}</option>
          ))}
        </select>
      </div>
    </Draggable>
  );
}

export default Selectinput;
