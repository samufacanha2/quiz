import { Button, Typography } from "@material-ui/core";
import { Box } from "@material-ui/system";
import "./styles.scss";
export default function ConfirmationModal({ showModal, setShowModal, value }) {
  return (
    <div className={showModal ? "container visible" : "container"}>
      <div className="content">
        <Typography align="center" variant="h3">
          Do you want to answer {value} questions?
        </Typography>
        <Box justifyContent="space-between">
          <Button variant="outlined" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={() => setShowModal(false)}>
            Start!
          </Button>
        </Box>
      </div>
      <div className="background" onClick={() => setShowModal(false)}></div>
    </div>
  );
}
