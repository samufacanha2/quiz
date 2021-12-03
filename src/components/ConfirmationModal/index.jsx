import { Button, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function ConfirmationModal({ showModal, setShowModal, value }) {
  const navigate = useNavigate();
  const mediaQuery = useMediaQuery("(min-width:600px)");
  const generateQuiz = () => {
    api.get(`api.php?amount=${value}&encode=url3986`).then((res) => {
      localStorage.setItem("questions", JSON.stringify(res.data.results));
      navigate("/quiz");
    });
  };
  return (
    <div className={showModal ? "container visible" : "container"}>
      <div className="content-confirmation">
        <Typography align="center" variant={mediaQuery ? "h3" : "h5"}>
          Do you want to answer {value} question(s)?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={() => setShowModal(false)}
            sx={{
              color: "white",
              borderColor: "white",
            }}
          >
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
