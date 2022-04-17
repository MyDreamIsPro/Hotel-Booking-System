import PropTypes from "prop-types";
// UI lib
import {
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Grid,
  Box,
  Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// UI custom

// logic lib

// logic custom

//#region CSS

//#endregion

const PAYMENT_METHOD = [
  {
    text: "Thẻ/tài khoản ngân hàng (ATM nội địa/quốc tế)",
    ariaControls: "panel1a-content",
    id: "panel1a-header",
    banks: [
      {
        value: "BIDV",
        img: "/static/bank/BIDV.png",
      },
      {
        value: "MBANK",
        img: "/static/bank/M_BANK.png",
      },
      {
        value: "NCB",
        img: "/static/bank/NCB.png",
      },
      {
        value: "TCB",
        img: "/static/bank/TECH_COM_BANK.png",
      },
      {
        value: "TPB",
        img: "/static/bank/TP_BANK.png",
      },
      {
        value: "VCB",
        img: "/static/bank/VIET_COM_BANK.png",
      },
      {
        value: "VTB",
        img: "/static/bank/VIETIN_BANK.png",
      },
    ],
  },
  {
    text: "Thẻ tín dụng/ghi nợ quốc tế",
    ariaControls: "panel2a-content",
    id: "panel2a-header",
    banks: [
      {
        value: "VISA",
        img: "/static/bank/VISA.png",
      },
      {
        value: "MC",
        img: "/static/bank/MASTER_CARD.png",
      },
      {
        value: "JCB",
        img: "/static/bank/JCB.png",
      },
    ],
  },
];

//----------------------------
const PaymentMethod = ({ selectedBank, setSelectedBank }) => {
  return (
    <div>
      {PAYMENT_METHOD.map((method) => (
        <Accordion key={method.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={method.ariaControls}
            id={method.id}
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <Typography variant="body1" fontWeight="bold">
              {method.text}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor: "#F2F2F2" }}>
            <Grid container rowSpacing={1.5} columnSpacing={{ xs: 1.5 }}>
              {method.banks.map((bank) => (
                <Grid key={bank.value} item xs={4} sm={3}>
                  <Box
                    style={{
                      height: 130,
                      backgroundColor: "#FFF",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                      borderWidth: 2,
                      borderColor:
                        selectedBank === bank.value ? "#5393f9" : "#FFF",
                      borderStyle: "solid",
                      transition: "border .3s ease",
                    }}
                    onClick={() => setSelectedBank(bank.value)}
                  >
                    <Radio
                      checked={selectedBank === bank.value}
                      style={{ position: "absolute", top: 1, left: 1 }}
                    />
                    <img
                      src={bank.img}
                      alt="bank logo"
                      style={{
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

PaymentMethod.propTypes = {
  selectedBank: PropTypes.string,
  setSelectedBank: PropTypes.func,
};

export default PaymentMethod;
