import { useEffect, useState } from "react";
import React from "react";

import { Box, boxSizing } from "@material-ui/system";
import {
  Button,
  Typography,
  Conatiner,
  Stack,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import SubmitModal from "../../components/SubmitModal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();
  const [, , reportName] = window.location.pathname.split("/");
  const [showModal, setShowModal] = useState(false);
  const report = JSON.parse(localStorage.getItem(reportName));
  const mediaQuery = useMediaQuery("(min-width:600px)");
  console.log(mediaQuery);
  return (
    <>
      <Box display="flex" sx={{ backgroundColor: "#283463" }}>
        <Typography
          variant="h8"
          sx={{
            fontSize: !mediaQuery ? "1 rem" : "1.5rem",
            textAlign: "center",
            width: "40vw",
            margin: " 2rem auto",
            height: "7vh",
            backgroundColor: "#85ABF7",
            borderRadius: "1rem",
            padding: "1rem",
            boxSizing: "border-box",
            color: "white",
          }}
        >
          Score:
          {report.selectedAnswers.reduce(
            (acc, cur) => (cur.value === "correct" ? acc + 1 : acc),
            0
          )}
          /{report.selectedAnswers.length}
        </Typography>
        <Typography
          variant="h8"
          sx={{
            fontSize: !mediaQuery ? "1 rem" : "1.5rem",
            textAlign: "center",
            width: "40vw",
            margin: " 2rem auto",
            backgroundColor: "#85ABF7",
            borderRadius: "1rem",
            padding: "1rem",
            boxSizing: "border-box",
            color: "white",
          }}
        >
          Unanswered:
          {report.selectedAnswers.reduce(
            (acc, cur) => (cur.value === undefined ? acc + 1 : acc),
            0
          )}
          /{report.selectedAnswers.length}
        </Typography>
      </Box>
      <Stack
        direction="column"
        sx={{
          backgroundColor: "#283463",
          minHeight: "calc(93vh - 4rem)",
        }}
      >
        {report.questions.map((question, qindex) => {
          const unanswered = report.selectedAnswers[qindex].value === undefined;
          const correct = report.selectedAnswers[qindex].value === "correct";
          return (
            <Box
              key={question.id}
              sx={{
                width: "90vw",
                margin: " 2rem auto",
                backgroundColor: "#85ABF7",
                borderRadius: "1rem",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  sx={{ fontSize: "1.8rem", color: "white" }}
                >
                  {decodeURIComponent(question.question)} <br />
                  <Typography
                    variant="h8"
                    sx={{ fontSize: "1.2rem", color: "white" }}
                  >
                    Catergory: {decodeURIComponent(question.category)}
                  </Typography>
                  <br />
                  <Typography
                    variant="h8"
                    sx={{
                      fontSize: "1.2rem",
                      color: correct ? "green" : "red",
                    }}
                  >
                    {correct
                      ? "correct answer"
                      : unanswered
                      ? "unanswered"
                      : "wrong answer"}
                  </Typography>
                </FormLabel>
                {correct ? (
                  <FormControlLabel
                    disabled
                    checked
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-disabled": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label={decodeURIComponent(
                      report.selectedAnswers[qindex].label
                    )}
                  />
                ) : (
                  <>
                    {report.selectedAnswers[qindex].label && (
                      <FormControlLabel
                        disabled
                        checked
                        control={<Radio />}
                        label={decodeURIComponent(
                          report.selectedAnswers[qindex].label
                        )}
                      />
                    )}

                    <FormControlLabel
                      disabled
                      control={
                        <Radio
                          sx={{
                            color: "white",
                            "&.Mui-disabled": {
                              color: "white",
                            },
                          }}
                        />
                      }
                      sx={{ color: "green" }}
                      label={
                        decodeURIComponent(
                          report.questions[qindex].correct_answer
                        ) + " - correct option"
                      }
                    />
                  </>
                )}
              </FormControl>
            </Box>
          );
        })}
        <Box
          display="flex"
          justifyContent="space-around"
          sx={{ marginBottom: 10 }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{ fontSize: 25, color: "white", borderColor: "white" }}
          >
            Home
          </Button>
        </Box>
      </Stack>
    </>
  );
}
