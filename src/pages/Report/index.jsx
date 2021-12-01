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
import { useNavigate } from "react-router-dom";
export default function Quiz() {
  const navigate = useNavigate();
  const [, , reportName] = window.location.pathname.split("/");
  const [showModal, setShowModal] = useState(false);
  const report = JSON.parse(localStorage.getItem(reportName));
  return (
    <>
      <Box display="flex">
        <Typography
          variant="h8"
          sx={{
            fontSize: "1.5rem",
            textAlign: "center",
            width: "40vw",
            margin: " 2rem auto",
            backgroundColor: "#cdd8e4",
            borderRadius: "1rem",
            padding: "1rem",
            boxSizing: "border-box",
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
            fontSize: "1.5rem",
            textAlign: "center",
            width: "40vw",
            margin: " 2rem auto",
            backgroundColor: "#cdd8e4",
            borderRadius: "1rem",
            padding: "1rem",
            boxSizing: "border-box",
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
      <Stack direction="column">
        {report.questions.map((question, qindex) => {
          const unanswered = report.selectedAnswers[qindex].value === undefined;
          const correct = report.selectedAnswers[qindex].value === "correct";
          return (
            <Box
              key={question.id}
              sx={{
                width: "90vw",
                margin: " 2rem auto",
                backgroundColor: "#cdd8e4",
                borderRadius: "1rem",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ fontSize: "1.8rem" }}>
                  {decodeURIComponent(question.question)} <br />
                  <Typography variant="h8" sx={{ fontSize: "1.2rem" }}>
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
                    control={<Radio />}
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
                      control={<Radio />}
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
            sx={{ fontSize: 25 }}
          >
            Home
          </Button>
        </Box>
      </Stack>
    </>
  );
}
