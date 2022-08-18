import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { field, selectForms } from "../../../slices/formsSlice";
import { uuid } from "uuidv4";
import { Tick } from "react-crude-animated-tick";

function ValidateForm() {
  const router = useRouter();
  const values = useSelector(selectForms);
  const [formValidated, setformValidated] = useState(false);
  const { id } = router.query;
  const [formIndex, setformIndex] = useState<number>(0);

  useEffect(() => {
    values.map((v, i) => {
      if (v.id == id) {
        setformIndex(i);
        return;
      }
    });
  }, [id]);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const renderField = () =>
    values[formIndex].fields?.map((f: field, i: number) => {
      switch (f.type) {
        case "input":
          return (
            // Generating Inputs Fields
            <div className="flex flex-col items-start mb-8 relative  transition duration-200 ease-in p-3 rounded-xl">
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
                required
              />
            </div>
          );

        case "checkbox":
          return (
            <div className="flex flex-col items-start mb-8 relative transition duration-200 ease-in p-3 rounded-xl">
              <label className="block mb-2 text-sm font-medium  text-gray-300  select-none">
                {f.fieldTitle}{" "}
                {f.required ? (
                  <span className="text-rose-500 text-sm ml-px  ">*</span>
                ) : (
                  ""
                )}
              </label>

              {f.options?.map((o, i) => (
                <>
                  <div className="flex ml-2 mb-3">
                    <input
                      id={`checkbox${i}`}
                      type="checkbox"
                      required={f.required}
                      className="w-4 h-4 z-50 text-blue-600  rounded   focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                    />
                    <label className="ml-2 text-sm font-medium  text-gray-300 select-none">
                      {o.title}
                    </label>
                  </div>
                </>
              ))}
            </div>
          );

        case "radio":
          return (
            <div className="flex flex-col items-start mb-8 relative  transition duration-200 ease-in p-3 rounded-xl">
              <label className="block mb-2 text-sm font-medium  text-gray-300 select-none ">
                {f.fieldTitle}{" "}
                {f.required ? (
                  <span className="text-rose-500 text-sm ml-px  ">*</span>
                ) : (
                  ""
                )}
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
          );
        case "select":
          return (
            // Generating Select Input Fields
            <div className="flex flex-col items-start mb-8 relative  transition duration-200 ease-in p-3 rounded-xl">
              <label className="block mb-2 text-sm font-medium  text-gray-300 z-50 select-none">
                {f.fieldTitle}
              </label>
              <select
                required={f.required}
                id={`select${i}`}
                className=" border z-50 text-sm rounded-lg   block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Option</option>

                {f.options?.map((o, i) => (
                  <option key={i} value={o.title}>{o.title}</option>
                ))}
              </select>
            </div>
          );
      }
    });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setformValidated(true);
  };
  return (
    <>
      {domLoaded && (
        <>
          <div className="p-12 m-10 flex items-center justify-center">
            <div className="flex flex-col border-solid border-slate-700 border-2 w-2/5  p-5 h-full">
              {values.length != 0 && values[formIndex].fields?.length !== 0 ? (
                formValidated ? (
                  <>
                    <Tick size={220} />
                    <h1 className="font-semibold text-center tracking-widest mb-6 text-xl">
                      Form Submited Successfully !
                    </h1>
                  </>
                ) : (
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="font-bold text-2xl capitalize text-center mb-12">
                      {values && values[formIndex]?.name}
                    </h1>
                    {values.length != 0 && renderField()}{" "}
                    <div className="flex items-center space-x-8 justify-center w-full">
                      <button
                        type="submit"
                        className="rounded p-3 bg-btnbg4 w-36 text-gray-800 font-bold"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ValidateForm;
