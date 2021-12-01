import { Button, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";

export default function ConfirmationModal({ showModal, setShowModal, value }) {
  const navigate = useNavigate();
  const generateQuiz = () => {
    api.get(`api.php?amount=${value}&encode=url3986`).then((res) => {
      localStorage.setItem("questions", JSON.stringify(res.data.results));
      navigate("/quiz");
    });
  };
  return (
    <div className={showModal ? "container visible" : "container"}>
      <div className="content">
        <Typography align="center" variant="h3">
          Do you want to answer {value} questions?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => generateQuiz()}>
            Start!
          </Button>
        </Box>
      </div>
      <div className="background" onClick={() => setShowModal(false)}></div>
    </div>
  );
}
