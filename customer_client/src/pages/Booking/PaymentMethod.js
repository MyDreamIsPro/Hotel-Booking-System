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
  Button,
} from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// UI custom
// logic lib
// logic custom
import { createBooking, createPaymentUrl } from "../../api/booking";
import { INTERNAL_BANKS, EXTERNAL_BANKS } from "../../__MOCK__/index";
import { STRING } from "../../constants/index";
//#region CSS

//#endregion

const PAYMENT_METHOD = [
  {
    text: "Thẻ/tài khoản ngân hàng (ATM nội địa)",
    ariaControls: "panel1a-content",
    id: "panel1a-header",
    banks: INTERNAL_BANKS,
    buttonText: "THANH TOÁN NỘI ĐỊA",
  },
  {
    text: "Thẻ tín dụng/ghi nợ quốc tế",
    ariaControls: "panel2a-content",
    id: "panel2a-header",
    banks: EXTERNAL_BANKS,
    buttonText: "THANH TOÁN QUỐC TẾ",
  },
];

const VND_TO_DOLLAR = (vnd) => (vnd / 23000).toFixed(2);

//----------------------------
const PaymentMethod = ({
  selectedBank,
  setSelectedBank,
  setOpenCompleteDialog,
  setPaymentProcessing,
}) => {
  const booking = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_BOOKING_INFO)
  );
  const user = JSON.parse(
    localStorage.getItem(STRING.LOCAL_STORAGE_PROFILE_KEY)
  )._id;

  const handleInternalCheckout = () => {
    if (!selectedBank) alert("Quý khách vui lòng chọn ngân  hàng");
    else {
      setPaymentProcessing(true);
      createPaymentUrl({ bank: selectedBank, amount: booking.amount })
        .then((res) => (window.location.href = res.data))
        .catch((err) => {
          setPaymentProcessing(false);
          console.log("Đã xảy ra lỗi, quý khách vui lòng thử lại sau");
        });
    }
  };

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
            <Button
              variant="contained"
              style={{ marginTop: 20, padding: 15 }}
              onClick={handleInternalCheckout}
            >
              {method.buttonText}
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* PAYPAL */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          style={{ backgroundColor: "#F2F2F2" }}
        >
          <Typography variant="body1" fontWeight="bold">
            Paypal
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#F2F2F2" }}>
          <PayPalScriptProvider
            //client-id stands for the id of business account, who is the seller in this transaction
            //you must log in with another account to purchase
            options={{
              "client-id":
                "AQBTdnr3dm6TENNubrGRnauD8Dy_oReUCTL-5kuAvXE5pkCu78s_dDJs_jHp5Tuc4pHaWdHCJTaCnMH1",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: VND_TO_DOLLAR(booking.amount),
                      },
                      payee: {
                        email_address: "sb-pcny315242414@business.example.com",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  createBooking({
                    user: user,
                    hotel: booking.hotel,
                    room_list: booking.roomIds,
                    amount: booking.amount,
                    payment_method: "PAYPAL",
                    adult: booking.visitor.adult,
                    kid: booking.visitor.kid,
                    baby: booking.visitor.baby,
                    effective_from: booking.startDate,
                    effective_to: booking.endDate,
                    payment_date: new Date(),
                  })
                    .then((res) => {
                      setOpenCompleteDialog(true);
                    })
                    .catch((err) => console.log(err));
                });
              }}
              onCancel={() => console.log("CANCEL")}
            />
          </PayPalScriptProvider>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

PaymentMethod.propTypes = {
  selectedBank: PropTypes.string,
  setSelectedBank: PropTypes.func,
};

export default PaymentMethod;
