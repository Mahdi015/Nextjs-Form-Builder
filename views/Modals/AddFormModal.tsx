import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { uuid } from "uuidv4";
import { form, createForm } from "../../slices/formsSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -40%)",
  width: "430px",
  height: "300px",
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
};

const ButtonStyled = styled(Button)(() => ({
  borderRadius: 20,
  contrastText: "#fff",
  width: "70%",
  backgroundColor: "#a50050",
  "&:hover": {
    backgroundColor: "#b50a5c",
  },
}));

export default function AddFormModal({ modalOpen, setmodalOpen }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formName, setformName] = useState("");
  const handleClose = () => setmodalOpen(false);

  const handleAddForm = () => {
    if (formName.length > 0) {
      const id = uuid();
      const data: form = {
        id,
        name: formName,
        fields: [],
      };
      dispatch(createForm(data));
      handleClose();
      router.push(`/forms/${id}`);
    } else {
      toast.error("Please enter a form name", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        progress: undefined,
      });
    }
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
                    marginBottom: 1,
                    marginTop: 1,
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Create Form
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
                <Typography width={140}>Form Name :</Typography>

                <input
                  name="fieldTitle"
                  type="text"
                  required
                  className="bg-inputbg border outline-none  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5  border-inputborder placeholder-gray-400 text-white "
                  value={formName}
                  onChange={(e) => setformName(e.target.value)}
                />
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
                item
                xs={12}
              >
                <ButtonStyled
                  type="submit"
                  onClick={() => handleAddForm()}
                  variant="contained"
                >
                  Create
                </ButtonStyled>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
