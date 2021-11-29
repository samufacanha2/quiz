import { useEffect } from "react";
import React from "react";

import api from "../../services/api.js";
import { useLocation } from "react-router";
import { Box } from "@material-ui/system";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [questions, setQuestions] = React.useState([]);
  useEffect(() => {
    api.get(`api.php?amount=${state}`).then((res) => {
      setQuestions(res.data.results);
    });
  }, []);

  return (
    <Box>
      {questions.map((question) => (
        <div key={question.id}>
          <h1>{question.question}</h1>
        </div>
      ))}
      <Button variant="outlined" onClick={() => navigate("/")}>
        Home
      </Button>
    </Box>
  );
}
