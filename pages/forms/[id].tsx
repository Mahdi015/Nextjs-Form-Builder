import { useDispatch, useSelector } from "react-redux";
import { field, form, selectForms, test } from "../../slices/formsSlice";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";
import EditFieldModal from "../../views/Modals/EditFieldModal";
import { MdPowerInput } from "react-icons/md";
import { IoMdCheckbox, IoMdRadioButtonOn } from "react-icons/io";
import { BsFillMenuAppFill } from "react-icons/bs";

import { AiFillHome } from "react-icons/ai";
import {
  useDraggable,
  DndContext,
  useSensor,
  PointerSensor,
  closestCenter,
  MouseSensor,
} from "@dnd-kit/core";
import { Droppable } from "../../components/Droppable";
import { Draggable } from "../../components/Draggable";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
const FormPage = (context: any) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const router = useRouter();
  const { id } = router.query;
  const values = useSelector(selectForms);
  let valuesToUpdate = JSON.parse(JSON.stringify(values));
  const [formIndex, setformIndex] = useState<number>(0);
  const [testData, settestData] = useState(values);
  const [formFound, setformFound] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [indexFieldToEdit, setindexFieldToEdit] = useState<number>(0);
  const sensors = [useSensor(MouseSensor)];
  const dispatch = useDispatch();

  useEffect(() => {
    settestData(values);
    let find;
    values.map((v, i) => {
      if (v.id == id) {
        setformIndex(i);
        find = true;
        return;
      }
    });
    // find != true ? router.push("/404") :""
  }, [id]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("forms", JSON.stringify(values));
    }
  }, [values]);
  const addInput = () => {
    const id = uuid();
    valuesToUpdate[formIndex].fields.push({
      type: "input",
      required: false,
      fieldTitle: "Input",
      dragId: id,
    });
    dispatch(test(valuesToUpdate));
  };
  const addCheckbox = () => {
    const id = uuid();
    valuesToUpdate[formIndex].fields.push({
      type: "checkbox",
      required: false,
      fieldTitle: "Checkbox",
      options: [{ title: "Option 1" }, { title: "Option 2" }],
      dragId: id,
    });
    dispatch(test(valuesToUpdate));
  };
  const addRadioButton = () => {
    const id = uuid();
    valuesToUpdate[formIndex].fields.push({
      type: "radio",
      required: false,
      fieldTitle: "Radio Button",
      options: [{ title: "Option 1" }, { title: "Option 2" }],
      dragId: id,
    });
    dispatch(test(valuesToUpdate));
  };

  const addSelectInput = () => {
    const id = uuid();
    valuesToUpdate[formIndex].fields.push({
      type: "select",
      required: false,
      fieldTitle: "Select Input",
      options: [{ title: "Option 1" }, { title: "Option 2" }],
      dragId: id,
    });
    dispatch(test(valuesToUpdate));
  };
  const deleteField = (index: number) => {
    console.log(index);
    valuesToUpdate[formIndex].fields.splice(index, 1);
    dispatch(test(valuesToUpdate));
  };

  const handleEditField = (i: number) => {
    setindexFieldToEdit(i);
    setmodalOpen(true);
  };
  const handleDragEnd = (e: any) => {
    const { active, over } = e;
    if (active.id != over.id) {
      const oldPos = valuesToUpdate[formIndex].fields.findIndex(
        (i: any) => i.dragId == active.id
      );
      const newPos = valuesToUpdate[formIndex].fields.findIndex(
        (i: any) => i.dragId == over.id
      );

      let newObj = arrayMove(valuesToUpdate[formIndex].fields, oldPos, newPos);
      valuesToUpdate[formIndex].fields = newObj;
      dispatch(test(valuesToUpdate));
    }
  };
  const renderField = () =>
    values[formIndex].fields?.map((f, i) => {
      switch (f.type) {
        case "input":
          return (
            <Draggable id={f.dragId}>
              <div className="group flex flex-col items-start mb-8 relative hover:shadow-inputboxshadow transition duration-200 ease-in p-3 rounded-xl">
                <div className=" absolute top-3 right-3 flex space-x-1">
                  <AiFillDelete
                    className="z-50"
                    color="#a50050"
                    onClick={() => deleteField(i)}
                  />{" "}
                  <AiFillEdit
                    onClick={() => handleEditField(i)}
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
        case "checkbox":
          return (
            <Draggable id={f.dragId}>
              <div className="group flex flex-col items-start mb-8 relative hover:shadow-inputboxshadow transition duration-200 ease-in p-3 rounded-xl">
                <div className=" absolute top-3 right-3 flex space-x-1">
                  <AiFillDelete
                    className="cursor-pointer z-50"
                    color="#a50050"
                    onClick={() => deleteField(i)}
                  />{" "}
                  <AiFillEdit
                    onClick={() => handleEditField(i)}
                    className="cursor-pointer z-50"
                    color="#F48225"
                  />
                </div>
                <label className="block mb-2 text-sm font-medium  text-gray-300  select-none">
                  {f.fieldTitle}
                </label>

                {f.options?.map((o, i) => (
                  <>
                    <div className="flex ml-2 mb-3">
                      <input
                        id={`checkbox${i}`}
                        type="checkbox"
                        required={f.required}
                        value=""
                        className="w-4 h-4 z-50 text-blue-600  rounded   focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                      />
                      <label className="ml-2 text-sm font-medium  text-gray-300 select-none">
                        {o.title}
                      </label>
                    </div>
                  </>
                ))}
              </div>
            </Draggable>
          );
        case "radio":
          return (
            <Draggable id={f.dragId}>
              <div className="group flex flex-col items-start mb-8 relative hover:shadow-inputboxshadow transition duration-200 ease-in p-3 rounded-xl">
                <div className=" absolute top-3 right-3 flex space-x-1">
                  <AiFillDelete
                    className="cursor-pointer z-50"
                    color="#a50050"
                    onClick={() => deleteField(i)}
                  />{" "}
                  <AiFillEdit
                    onClick={() => handleEditField(i)}
                    className="cursor-pointer z-50"
                    color="#F48225"
                  />
                </div>
                <label className="block mb-2 text-sm font-medium  text-gray-300 select-none ">
                  {f.fieldTitle}
                </label>

                {f.options?.map((o, i) => {
                  let uniqueID = uuid();
                  return (
                    <>
                      <div className="flex ml-2 mb-3">
                        <input
                          required={f.required}
                          id={uniqueID}
                          type="radio"
                          value=""
                          name={uniqueID}
                          className="w-4 h-4 z-50 text-blue-600  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 select-none">
                          {o.title}
                        </label>
                      </div>
                    </>
                  );
                })}
              </div>
            </Draggable>
          );
        case "select":
          return (
            <Draggable id={f.dragId}>
              <div className="group flex flex-col items-start mb-8 relative hover:shadow-inputboxshadow transition duration-200 ease-in p-3 rounded-xl">
                <div className="absolute top-3 right-3 flex space-x-1">
                  <AiFillDelete
                    className="cursor-pointer z-50"
                    color="#a50050"
                    onClick={() => deleteField(i)}
                  />{" "}
                  <AiFillEdit
                    onClick={() => handleEditField(i)}
                    className="cursor-pointer z-50"
                    color="#F48225"
                  />
                </div>
                <label className="block mb-2 text-sm font-medium  text-gray-300 z-50 select-none">
                  {f.fieldTitle}
                </label>
                <select
                  required={f.required}
                  id={`select${i}`}
                  className=" border z-50 text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  {f.options?.map((o, i) => (
                    <option value={o.title}>{o.title}</option>
                  ))}
                </select>
              </div>
            </Draggable>
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
                    values[formIndex].fields &&
                    values[formIndex].fields?.map((v) => v.dragId)
                  }
                  strategy={verticalListSortingStrategy}
                >
                  <>
                    <h1 className="font-bold text-2xl  text-center">Form</h1>

                    <>
                      {values.length != 0 &&
                      values[formIndex].fields?.length !== 0 ? (
                        <form>
                          {values.length != 0 && renderField()}{" "}
                          <div className="flex items-center justify-center w-full">
                            <button className="rounded p-3 bg-btnbg3 w-4/3 text-gray-800 font-bold">
                              Submit
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex items-center justify-center h-2/3">
                          {" "}
                          <h1 className="font-semibold text-xl">
                            Add an element from the list on left
                          </h1>
                        </div>
                      )}
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
