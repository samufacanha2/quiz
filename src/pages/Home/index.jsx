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
      <Box sx={{ width: "100vw", backgroundColor: "#121212" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#efbbef",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#efefef",
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
                setValue(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{ marginTop: "2rem" }}
              size="large"
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
