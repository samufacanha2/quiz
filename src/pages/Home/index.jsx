import { Link } from "react-router-dom";
import "./styles.scss";
import { Box } from "@material-ui/system";
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
            <Typography align="center" variant={mediaQuery ? "h1" : "h3"}>
              Quiz Time!!
            </Typography>
            <Typography
              align="center"
              variant={mediaQuery ? "h3" : "h5"}
              color="#343434"
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

          {localStorage.length && (
            <Accordion>
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
                      <Link to={`/report/${report.key}`} key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: "1rem",
                          }}
                        >
                          <Typography>
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
        </Container>
      </Box>
    </>
  );
}
