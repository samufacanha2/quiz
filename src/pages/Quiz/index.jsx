import { useEffect } from "react";
import React from "react";

import api from "../../services/api.js";
import { useLocation } from "react-router";
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

export default function Quiz() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [questions, setQuestions] = React.useState([]);
  useEffect(() => {
    api.get(`api.php?amount=${state}`).then((res) => {
      setQuestions(res.data.results);
      console.log(res.data.results);
    });
  }, []);

  return (
    <Stack direction="column">
      {questions.map((question) => (
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
              {question.question} <br />
              <Typography variant="h8" sx={{ fontSize: "1.2rem" }}>
                Catergory: {question.category}
              </Typography>
            </FormLabel>

            <RadioGroup name="radio-buttons-group">
              <FormControlLabel
                value="correct"
                control={<Radio />}
                label={question.correct_answer}
              />
              {question.incorrect_answers.map((answer, index) => (
                <FormControlLabel
                  value={`incorrect${index}`}
                  control={<Radio />}
                  label={answer}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      ))}
      <Button variant="outlined" onClick={() => navigate("/")}>
        Home
      </Button>
    </Stack>
  );
}
