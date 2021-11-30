import { Button, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

export default function ConfirmationModal({
  showModal,
  setShowModal,
  selectedAnswers,
}) {
  const navigate = useNavigate();
  return (
    <div className={showModal ? "container visible" : "container"}>
      <div className="content">
        <Typography align="center" variant="h3">
          {selectedAnswers
            .map((answer) => answer.value)
            .map((isFilled, index) => {
              console.log(isFilled);
              return (
                !isFilled && (
                  <Typography align="center" variant="h3">
                    You have not answered question {index + 1},
                  </Typography>
                )
              );
            })}
          do you want to proceed?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => {}}>
            Submit
          </Button>
        </Box>
      </div>
      <div className="background" onClick={() => setShowModal(false)}></div>
    </div>
  );
}
