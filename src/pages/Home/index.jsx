import { Link } from "react-router-dom";
import "./styles.scss";
import { Box } from "@material-ui/system";
import { Button, TextField, Typography, Container } from "@material-ui/core";
import { useState } from "react";

import ConfirmationModal from "../../components/ConfirmationModal";

export default function Home() {
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        value={value}
      />
      <Box
        sx={{
          width: "100vw",
          backgroundImage:
            "url(https://motionarray.imgix.net/preview-317818-pztuVWhnDT-high_0008.jpg)",
          backgroundSize: "cover",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#1f0d85",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#c1ccfd",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            <Typography align="center" variant="h1">
              Quiz Time!!
            </Typography>
            <Typography align="center" variant="h3" color="#343434">
              Choose how many questions you want to answer
            </Typography>

            <TextField
              type="number"
              sx={{ marginTop: "2rem", zIndex: "0" }}
              label="Questions"
              defaultValue={0}
              onChange={(e) => {
                if (e.target.value > 50) {
                  e.target.value = 50;
                }
                setValue(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{ marginTop: "2rem" }}
              size="large"
              disabled={value <= 0}
              onClick={() => setShowModal(true)}
            >
              Start
            </Button>
          </Container>
        </Container>
      </Box>
    </>
  );
}
