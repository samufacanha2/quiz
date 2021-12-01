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
import { useNavigate } from "react-router-dom";
import SubmitModal from "../../components/SubmitModal";
export default function Quiz() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const questions = JSON.parse(localStorage.getItem("questions"));

  const initialState = () => {
    let a = [];
    for (let i = 0; i < questions.length; i++) {
      a.push({
        index: i,
      });
    }
    return a;
  };
  const [selectedAnswers, setSelectedAnswers] = React.useState(initialState());

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);
  return (
    <>
      <SubmitModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedAnswers={selectedAnswers}
        questions={questions}
      />
      <Stack direction="column">
        {questions.map((question, qindex) => {
          let questionsBuffer = [
            { label: question.correct_answer, value: "correct" },
          ];
          question.incorrect_answers.forEach((answer) => {
            questionsBuffer.push({ label: answer, value: "incorrect" });
          });

          const orderedAnswers = questionsBuffer.sort((a, b) => {
            return a.label.localeCompare(b.label);
          });

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
                </FormLabel>

                <RadioGroup name="radio-buttons-group">
                  {orderedAnswers.map((answer, index) => (
                    <FormControlLabel
                      key={index}
                      value={`${answer.value}${index}`}
                      control={<Radio />}
                      label={decodeURIComponent(answer.label)}
                      onChange={(e) => {
                        setSelectedAnswers((selectedAnswers) =>
                          selectedAnswers.map((selectedAnswer) => {
                            if (selectedAnswer.index == qindex) {
                              return {
                                index: qindex,
                                value: e.target.value.slice(0, -1),
                                label: decodeURIComponent(answer.label),
                              };
                            } else return selectedAnswer;
                          })
                        );
                      }}
                    />
                  ))}
                </RadioGroup>
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
          <Button
            variant="contained"
            onClick={() => setShowModal(true)}
            sx={{ fontSize: 25 }}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </>
  );
}
