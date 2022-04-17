import { useState } from "react";
// UI lib
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  styled,
} from "@mui/material";
// UI custom
import UserInfo from "./UserInfo";
import PaymentMethod from "./PaymentMethod";
import CompletePage from "./CompletePage";
// logic lib

// logic custom

//#region CSS
const RootStyle = styled(Box)(({ theme }) => ({
  width: "60%",
  marginRight: 20,
  [theme.breakpoints.down(920)]: {
    width: "100%",
  },
}));
//#endregion

//----------------------------

const steps = [
  {
    label: "Thông tin khách hàng",
    page: <UserInfo />,
  },
  {
    label: "Chi tiết thanh toán",
    page: <PaymentMethod />,
  },
  {
    label: "Xác nhận đặt phòng",
    page: <CompletePage />,
  },
];

export default function StepLayout() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBank, setSelectedBank] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <RootStyle>
      <Stepper activeStep={activeStep} orientation="vertical">
        {/* USER INFO */}
        <Step>
          <StepLabel>
            <Typography
              variant="h6"
              color={activeStep === 0 ? "primary" : "#637381"}
            >
              Thông tin khách hàng
            </Typography>
          </StepLabel>
          <StepContent>
            <UserInfo />
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
              >
                Tiếp tục
              </Button>
              <Button disabled onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Quay lại
              </Button>
            </Box>
          </StepContent>
        </Step>
        {/* PAYMENT METHOD */}
        <Step>
          <StepLabel>
            <Typography
              variant="h6"
              color={activeStep === 1 ? "primary" : "#637381"}
            >
              Chi tiết thanh toán
            </Typography>
          </StepLabel>
          <StepContent>
            <PaymentMethod
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
            />
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
              >
                Tiếp tục
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Quay lại
              </Button>
            </Box>
          </StepContent>
        </Step>
        {/* COMPLETE PAGE */}
        <Step>
          <StepLabel
            optional={<Typography variant="caption">Bước cuối</Typography>}
          >
            <Typography
              variant="h6"
              color={activeStep === 2 ? "primary" : "#637381"}
            >
              Xác nhận đặt phòng
            </Typography>
          </StepLabel>
          <StepContent>
            <CompletePage />
            <Box sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 1, mr: 1 }}
              >
                Kết thúc
              </Button>
              <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                Quay lại
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </RootStyle>
  );
}
