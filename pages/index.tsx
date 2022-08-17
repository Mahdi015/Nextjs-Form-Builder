import type { NextPage } from "next";
import formimg from "../assets/form.png";
import noformimg from "../assets/noforms.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { useState, useEffect } from "react";
import { form, selectForms, test } from "../slices/formsSlice";
import AddFormModal from "../views/Modals/AddFormModal";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const Home: NextPage = () => {
  const [formsValues, setformsValues] = useState<form[]>();
  const [modalOpen, setmodalOpen] = useState(false);

  const dispatch = useDispatch();

  const values = useSelector(selectForms);
  let valuesToUpdate = JSON.parse(JSON.stringify(values));
  const [domLoaded, setDomLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  useEffect(() => {
    setformsValues(values);
    console.log(values);
    if (typeof window !== "undefined") {
      localStorage.setItem("forms", JSON.stringify(values));
    }
  }, [values]);
  const handleDeleteForm = (index: number) => {
    valuesToUpdate.splice(index, 1);
    dispatch(test(valuesToUpdate));
  };
  return (
    <>

      {domLoaded && (
        <div className="flex justify-center  flex-col items-center p-8 m-5">

          <h1 className="font-bold text-4xl mb-12">WeavesLines Form Builder</h1>

          {values && values.length !== 0 ? (
            <>
              {values && values.length > 1 ? (
                <h1 className="mb-6">(You have {values.length} forms)</h1>
              ) : (
                <h1 className="mb-6 tracking-widest">
                  (You have {values.length} form)
                </h1>
              )}
              <div className="mb-28 flex justify-center items-center">
                <button
                  onClick={() => setmodalOpen(true)}
                  className="bg-btnbg p-3 rounded font-medium w-80"
                >
                  CREATE FORM
                </button>
              </div>
              <div className="flex space-x-4">
                {values &&
                  values.map((f,i) => (
                    <div
                      
                      className="group flex justify-center flex-col bg-formbg p-7 rounded-xl hover:shadow-inputboxshadow transition duration-200 ease-in transform hover:scale-105  h-56"
                    >
                      <Image onClick={() => router.push(`/forms/${f.id}`)} className="cursor-pointer" src={formimg} width="130px" height="110px" />
                      <h1 onClick={() => router.push(`/forms/${f.id}`)} className="text-center cursor-pointer capitalize  font-semibold">{f.name}</h1>
                      <div className="group-hover:flex hidden space-x-2 justify-center mt-3 absolute bottom-2 w-46 left-0 right-0 ml-auto mr-auto">
                        <AiFillDelete className="cursor-pointer"  onClick={()=>handleDeleteForm(i)} color="#a50050" size={"1.22em"} />{" "}
                        <AiFillEye className="cursor-pointer" onClick={() => router.push(`/forms/${f.id}`)}  color="#F48225" size={"1.22em"} />
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <>
              {" "}
              <Image src={noformimg} width="220px" height="200px" />
              <h1 className="font-medium">YOU DON'T HAVE ANY FORM YET!</h1>
              <p className="mt-2 mb-12 font-normal text-slate-400	text-sm">
                Your form will appear here
              </p>
              <button
                onClick={() => setmodalOpen(true)}
                className="bg-btnbg p-3 rounded font-medium w-80"
              >
                CREATE FORM
              </button>
            </>
          )}
          <AddFormModal modalOpen={modalOpen} setmodalOpen={setmodalOpen} />
        </div>
      )}
    </>
  );
};

export default Home;
