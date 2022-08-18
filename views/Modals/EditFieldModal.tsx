import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

interface initialdata {
  type?: string;
  fieldTitle?: string;
  required?: boolean;
  options?: [{ title: string }];
  dragId: string;
}

const style = {
  position: "absolute",
  right: 0,
  width: "450px",
  height: "100%",
  bgcolor: "#241b43",
  borderRadius: "5px",
  boxShadow: 24,
  outline: "none",
  overflow: "auto",
  p: 5,
  "@media (max-width: 780px)": {
    height: "100%",
    width: "100%",
    padding: "32px 0 32px 0",
  },
};

type Props = {
  modalOpen: boolean;
  setmodalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  formIndex: number;
  valuesToUpdate: any;
};

export default function EditFieldModal({
  modalOpen,
  setmodalOpen,
  index,
  formIndex,
  valuesToUpdate,
}: Props) {
  const [addOptionValue, setaddOptionValue] = useState("");
  const [toastMsg, settoastMsg] = useState("");

  let init: initialdata = {
    type: "",
    fieldTitle: "",
    required: false,
    options: [{ title: "init" }],
    dragId: "",
  };
  const [fieldValues, setfieldValues] = useState<initialdata>(init);

  const handleClose = () => setmodalOpen(false);
  useEffect(() => {
    toastMsg && toastMsg.length !== 0 && dispToast(toastMsg);
  }, [toastMsg]);

  const dispToast = (errorMsg: string) => {
    let id = "toast1";
    toast.error(errorMsg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      toastId: id,
      progress: undefined,
    });
    settoastMsg("");
  };
  useEffect(() => {
    if (valuesToUpdate[formIndex].fields.length !== 0) {
      init = {
        type: valuesToUpdate[formIndex].fields[index]?.type,
        fieldTitle: valuesToUpdate[formIndex].fields[index]?.fieldTitle,
        required: valuesToUpdate[formIndex].fields[index]?.required,
        options: valuesToUpdate[formIndex].fields[index]?.options,
        dragId: valuesToUpdate[formIndex].fields[index]?.dragId,
      };

      if (valuesToUpdate[formIndex].fields[index]?.type == "input") {
        delete init.options;
      }
    }
    setfieldValues(init);
  }, [valuesToUpdate, modalOpen]);
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setfieldValues({ ...fieldValues, [name]: value });
  };
  const handleOptionChanges = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const { value } = e.target;
    let obj = JSON.parse(JSON.stringify(fieldValues.options));
    obj[i].title = value;
    setfieldValues({ ...fieldValues, ["options"]: obj });
  };

  const handleSaveChanges = () => {
    valuesToUpdate[formIndex].fields[index] = fieldValues;
    setmodalOpen(false);
  };
  const handelChangeFieldRequired = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    value == "True"
      ? setfieldValues({ ...fieldValues, ["required"]: true })
      : setfieldValues({ ...fieldValues, ["required"]: false });
  };
  const handleAddOptionsInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    setaddOptionValue(value);
  };
  const handleAddOptions = () => {
    if (addOptionValue.length == 0) {
      settoastMsg("Enter Option");
      return;
    }
    let obj = JSON.parse(JSON.stringify(fieldValues.options));
    obj.push({ title: addOptionValue });
    setfieldValues({ ...fieldValues, ["options"]: obj });
    setaddOptionValue("");
  };
  const handleDeleteOption = (i: number) => {
    let obj = JSON.parse(JSON.stringify(fieldValues.options));
    obj.splice(i, 1);
    setfieldValues({ ...fieldValues, ["options"]: obj });
  };
  return (
    <div>
      <Modal
        disableScrollLock={true}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{
                    marginBottom: 6,
                    marginTop: 1,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Element Configuration
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  marginBottom: "1.5rem",
                  marginTop: "1.7rem",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Typography width={140} sx={{ fontSize: "1rem" }}>
                  Question Text
                </Typography>
                <input
                  name="fieldTitle"
                  type="text"
                  className="bg-inputbg border outline-none   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5  border-inputborder placeholder-gray-400 text-white "
                  value={fieldValues.fieldTitle}
                  onChange={(e) => handleFieldChange(e)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  marginBottom: "1.5rem",
                  marginTop: "1.7rem",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Typography width={140} sx={{ fontSize: "1rem" }}>
                  Is Required ?
                </Typography>
                <select
                  onChange={(e) => handelChangeFieldRequired(e)}
                  value={fieldValues.required ? "True" : "False"}
                  id={`id${index}`}
                  className=" border  text-sm rounded-lg   block w-80 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={"True"}>True</option>
                  <option value={"False"}>False</option>
                </select>
              </Grid>
            </Grid>
            {fieldValues && fieldValues.type != "input" && (
              <Grid
                item
                xs={12}
                sx={{
                  marginBottom: "1.5rem",
                  marginTop: "1.7rem",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  widht: "100%",
                }}
              >
                <Typography width={120} sx={{ fontSize: "1rem" }}>
                  Options
                </Typography>
                <div className=" flex flex-col ">
                  {fieldValues &&
                    fieldValues.options?.map((o, i) => (
                      <div className="flex items-center justify-center space-x-5 w-full ">
                        <input
                          name="options"
                          type="text"
                          className="bg-inputbg border outline-none  mb-2  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5  border-inputborder placeholder-gray-400 text-white "
                          value={o.title}
                          onChange={(e) => handleOptionChanges(e, i)}
                        />
                        <AiFillDelete
                          size={"1.27em"}
                          className="cursor-pointer"
                          color="#98172B"
                          onClick={() => handleDeleteOption(i)}
                        />
                      </div>
                    ))}
                  <div className="flex flex-col">
                    <input
                      name="addoption"
                      type="text"
                      value={addOptionValue}
                      onChange={(e) => handleAddOptionsInputChange(e)}
                      className="bg-inputbg border outline-none  mb-2  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5  border-inputborder placeholder-gray-400 text-white "
                    />
                    <button
                      style={{ backgroundColor: "#4d416d" }}
                      className="bg-btnbg2 p-3 rounded "
                      onClick={() => handleAddOptions()}
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sx={{
                marginTop: "6rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                widht: "100%",
              }}
            >
              <button
                style={{ backgroundColor: "#4d416d", width: "250px" }}
                className="bg-btnbg2 p-3 rounded font-semibold capitalize"
                onClick={() => handleSaveChanges()}
              >
                save changes
              </button>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
