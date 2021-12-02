import { Link } from "react-router-dom";
import "./styles.scss";
import { Box } from "@material-ui/system";
import Particles from "react-tsparticles";
import ParticlesParams from "../../assets/particles.json";
import {
  Button,
  TextField,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ConfirmationModal from "../../components/ConfirmationModal";

export default function Home() {
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [previousReports, setPreviousReports] = useState([]);
  const mediaQuery = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    let previousBuffer = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      if (localStorage.key(i).length > 10) {
        previousBuffer.push({
          report: JSON.parse(localStorage.getItem(localStorage.key(i))),
          key: localStorage.key(i),
        });
      }
      setPreviousReports(previousBuffer);
    }
  }, []);
  useEffect(() => {
    console.log(previousReports);
  }, [previousReports]);
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
          backgroundSize: "cover",
        }}
      >
        <Container
          maxWidth="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#7bb1e4",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            <Typography
              align="center"
              variant={mediaQuery ? "h1" : "h3"}
              sx={{
                fontWeight: "bold",
                color: "white",
                textShadow: "2px 2px 2px #000000",
              }}
            >
              Quiz Time!!
            </Typography>
            <Typography
              align="center"
              variant={mediaQuery ? "h3" : "h5"}
              color="#efefef"
              sx={{
                textShadow: "1px 1px #000",
              }}
            >
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
                } else if (e.target.value < 0) {
                  e.target.value = 0;
                }

                setValue(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{
                marginTop: "2rem",
              }}
              size="large"
              disabled={value <= 0}
              onClick={() => setShowModal(true)}
            >
              Start
            </Button>
          </Container>

          {localStorage.length && (
            <Accordion sx={{ borderRadius: "10px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Previous Quizzes Reports</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {previousReports.map((report, index) => {
                    return (
                      <Link
                        to={`/report/${report.key}`}
                        key={index}
                        style={{ textDecoration: "none" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: "1rem",
                          }}
                        >
                          <Typography
                            sx={{
                              backgroundColor: "#7bb1e4",
                              padding: "10px",
                              borderRadius: "10px",
                              color: "white",
                              fontWeight: "bold",
                              textShadow: "1px 1px 1px #0000006c",
                            }}
                          >
                            Relatório -{" "}
                            {new Date(report.report.date).toLocaleString()}
                          </Typography>
                        </Box>
                      </Link>
                    );
                  })}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
          <Particles id="tsparticles" options={ParticlesParams} />

          <Box
            sx={{
              height: "100vh",
              width: "100vw",
              position: "absolute",
              backgroundColor: "#07006b",
              filter: "opacity(0.8)",
              zIndex: "-2",
            }}
          ></Box>
        </Container>
      </Box>
    </>
  );
}
