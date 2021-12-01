import { Button, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

export default function SubmitModal({
  showModal,
  setShowModal,
  selectedAnswers,
  questions,
}) {
  const navigate = useNavigate();
  const isFilledAnswers = selectedAnswers.map((answer) => answer.value);
  const notFull = isFilledAnswers.includes(undefined);
  const handleSubmit = () => {
    const report = { questions, selectedAnswers, date: new Date() };
    const reportId = `report${questions[0].question}${(
      Math.random() * 10
    ).toString()}`;
    localStorage.setItem(reportId, JSON.stringify(report));
    navigate(`/report/${reportId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={showModal ? "container visible" : "container"}>
      <div className="content">
        {notFull ? (
          <Typography align="center" variant="h3" sx={{ fontSize: "2rem" }}>
            You have unanswered question(s)
            {isFilledAnswers.map((isFilled, index) => {
              console.log(isFilled);
              return !isFilled && ` #${index + 1}, `;
            })}
            do you want to proceed?
          </Typography>
        ) : (
          <Typography align="center" variant="h3">
            You have answered all the questions. <br />
            do you want to proceed?
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </Box>
      </div>
      <div className="background" onClick={() => setShowModal(false)}></div>
    </div>
  );
}
