import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { field, selectForms, updateForm } from "../../slices/formsSlice";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";
import EditFieldModal from "../../views/Modals/EditFieldModal";
import {
  DndContext,
  useSensor,
  closestCenter,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "react-toastify";


// Import Fields

import Selectinput  from "../../components/Fields/Selectinput";
import CheckboxField from "../../components/Fields/CheckboxField";
import InputField from "../../components/Fields/InputField";
import Radiobutton from "../../components/Fields/Radiobutton";


// Import Icons
import { AiFillHome } from "react-icons/ai";
import { MdPowerInput } from "react-icons/md";
import { IoMdCheckbox, IoMdRadioButtonOn } from "react-icons/io";
import { BsFillMenuAppFill } from "react-icons/bs";




const FormPage = (context: any) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const router = useRouter();
  const { id } = router.query;
  const values = useSelector(selectForms);
  let getValues = JSON.parse(JSON.stringify(values));
  const [formIndex, setformIndex] = useState<number>(0);
  const [valuesToUpdate, setvaluesToUpdate] = useState(getValues);
  const [modalOpen, setmodalOpen] = useState(false);
  const [indexFieldToEdit, setindexFieldToEdit] = useState<number>(0);
  const sensors = [useSensor(MouseSensor)];
  const dispatch = useDispatch();

  useEffect(() => {

    values.map((v, i) => {
      if (v.id == id) {
        setformIndex(i);
        return;
      }
    });
  
  }, [id]);

  useEffect(() => {
    setvaluesToUpdate(getValues);
    if (typeof window !== "undefined") {
      localStorage.setItem("forms", JSON.stringify(values));
    }
  }, [values]);
  const addInput = () => {
    const id = uuid();
    let obj = [...valuesToUpdate];
    obj[formIndex].fields?.push({
      type: "input",
      required: false,
      fieldTitle: "Input",
      dragId: id,
    });
    setvaluesToUpdate(obj);
  };
  const addCheckbox = () => {
    const id = uuid();
    let obj = [...valuesToUpdate];
    obj[formIndex].fields.push({
      type: "checkbox",
      required: false,
      fieldTitle: "Checkbox",
      options: [{ title: "Option 1" }, { title: "Option 2" }],
      dragId: id,
    });
    setvaluesToUpdate(obj);
  };
  const addRadioButton = () => {
    const id = uuid();
    let obj = [...valuesToUpdate];
    obj[formIndex].fields.push({
      type: "radio",
      required: false,
      fieldTitle: "Radio Button",
      options: [{ title: "Option 1" }, { title: "Option 2" }],
      dragId: id,
    });
    setvaluesToUpdate(obj);
  };

  const addSelectInput = () => {
    const id = uuid();
    let obj = [...valuesToUpdate];
    obj[formIndex].fields.push({
      type: "select",
      required: false,
      fieldTitle: "Select Input",
      options: [{ title: "Option 1" }, { title: "Option 2" }],
      dragId: id,
    });
    setvaluesToUpdate(obj);
  };



  const handleDragEnd = (e: any) => {
    let obj = [...valuesToUpdate];
    const { active, over } = e;
    if (active.id != over.id) {
      const oldPos = valuesToUpdate[formIndex].fields.findIndex(
        (i: any) => i.dragId == active.id
      );
      const newPos = valuesToUpdate[formIndex].fields.findIndex(
        (i: any) => i.dragId == over.id
      );

      let newObj = arrayMove(valuesToUpdate[formIndex].fields, oldPos, newPos);
      obj[formIndex].fields = newObj;
      setvaluesToUpdate(obj);
    }
  };
  const handleSaveChanges = () => {
    dispatch(updateForm(valuesToUpdate));
    toast.success("Changes Saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    setmodalOpen(false);
  };
  const handleResetForm = () => {
    setvaluesToUpdate(getValues);
    toast.info("Form reset done!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const renderField = () =>
    valuesToUpdate[formIndex].fields?.map((f: field, i: number) => {
      switch (f.type) {
        case "input":
          return (
             // Generating Inputs Fields
            <InputField i={i} f={f} formIndex={formIndex} setvaluesToUpdate={setvaluesToUpdate} setindexFieldToEdit={setindexFieldToEdit}   valuesToUpdate={valuesToUpdate} setmodalOpen={setmodalOpen} />
          );
        
        case "checkbox":
          return (
            // Generating Checkbox Fields
            <CheckboxField i={i} f={f} formIndex={formIndex} setvaluesToUpdate={setvaluesToUpdate} setindexFieldToEdit={setindexFieldToEdit}   valuesToUpdate={valuesToUpdate} setmodalOpen={setmodalOpen} />
          );
       
        case "radio":
          return (
             // Generating Radiobutton Fields
            <Radiobutton i={i} f={f} formIndex={formIndex} setvaluesToUpdate={setvaluesToUpdate} setindexFieldToEdit={setindexFieldToEdit}   valuesToUpdate={valuesToUpdate} setmodalOpen={setmodalOpen} />
          );
        case "select":
          return (
            // Generating Select Input Fields
            <Selectinput i={i} f={f} formIndex={formIndex} setvaluesToUpdate={setvaluesToUpdate} setindexFieldToEdit={setindexFieldToEdit}   valuesToUpdate={valuesToUpdate} setmodalOpen={setmodalOpen} />
          );
      }
    });

  return (
    <>
      {domLoaded && (
        <>
          <EditFieldModal
            modalOpen={modalOpen}
            setmodalOpen={setmodalOpen}
            index={indexFieldToEdit}
            formIndex={formIndex}
            valuesToUpdate={valuesToUpdate}
          />

          <div className="mt-12 ml-20">
            <button
              onClick={() => router.push("/")}
              className="p-5 bg-btnbg2 rounded-md flex space-x-3 items-center font-semibold"
            >
              <AiFillHome size={"1.1em"} />
              <span className="text-base">Home</span>
            </button>
          </div>
          <div className="flex space-x-72 p-8 m-5">
            <div className="flex justify-center items-center flex-col border-solid border-slate-700 border-2 w-96  p-8 h-fit">
              <h1 className="font-bold text-xl mb-10">ELEMENTS</h1>
              <div className="space-y-12">
                <button
                  onClick={() => addInput()}
                  className="bg-btnbg p-3 rounded font-medium w-80 flex space-x-4 items-center justify-center"
                >
                  <span className="mb-1 w-24 flex">Input</span>
                  <MdPowerInput size={"1.6em"} />
                </button>
                <button
                  onClick={() => addCheckbox()}
                  className="bg-btnbg p-3 rounded font-medium w-80 flex space-x-4 items-center justify-center"
                >
                  <span className="mb-1 w-24 flex">Checkbox</span>
                  <IoMdCheckbox size={"1.2em"} />
                </button>
                <button
                  onClick={() => addRadioButton()}
                  className="bg-btnbg p-3 rounded font-medium w-80 flex space-x-4 items-center justify-center"
                >
                  <span className="mb-1 w-24 flex items-start">
                    Radio Button
                  </span>
                  <IoMdRadioButtonOn size={"1.2em"} />
                </button>
                <button
                  onClick={() => addSelectInput()}
                  className="bg-btnbg p-3 rounded font-medium w-80 flex space-x-4 items-center justify-center"
                >
                  <span className="mb-1 w-24 flex items-start">
                    Select Input
                  </span>
                  <BsFillMenuAppFill size={"1.2em"} />
                </button>
              </div>
            </div>

            <div className="flex   flex-col border-solid border-slate-700 border-2 w-2/5 space-y-12 p-5">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={
                    valuesToUpdate[formIndex].fields &&
                    valuesToUpdate[formIndex].fields?.map(
                      (v: field) => v.dragId
                    )
                  }
                  strategy={verticalListSortingStrategy}
                >
                  <>
                    <h1 className="font-bold text-2xl capitalize text-center">{valuesToUpdate[formIndex].name} Form</h1>

                    <>
                      {valuesToUpdate.length != 0 &&
                      valuesToUpdate[formIndex].fields?.length !== 0 ? (
                        <form>
                          {valuesToUpdate.length != 0 && renderField()}{" "}
                        </form>
                      ) : (
                        <div className="flex items-center justify-center h-2/3">
                          {" "}
                          <h1 className="font-semibold text-xl">
                            Add an element from the list on left
                          </h1>
                        </div>
                      )}
                      <div className="flex items-center space-x-8 justify-center w-full">
                        <button
                          type="button"
                          onClick={() => handleResetForm()}
                          className="rounded p-3 bg-btnbg5 w-36 text-gray-800 font-bold"
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          disabled={values == valuesToUpdate}
                          onClick={() => handleSaveChanges()}
                          className="rounded p-3 bg-btnbg3 w-36 text-gray-800 font-bold"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => router.push(`/forms/validate/${id}`)}
                          className="rounded p-3 bg-btnbg4 w-36 text-gray-800 font-bold"
                        >
                          Validate
                        </button>
                      </div>
                    </>
                  </>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FormPage;
