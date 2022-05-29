import { useState, useEffect } from "react";
import Page from "../components/Page";
import { Button, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { test } from "../api/test";
import { checkPaymentReturn } from "../api/booking";

export default function Test() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const vnp_params = {};
    for (const [key, value] of searchParams) {
      vnp_params[key] = value;
    }
    console.log(vnp_params);
    checkPaymentReturn(vnp_params)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleTest = () => {
    test({ amount: amount })
      .then((res) => {
        console.log(res.data);
        window.location.href = res.data;
      })
      .catch((err) => console.log(err));
  };
  return (
    <Page title="TEST | Tuanvq" style={{ paddingTop: 200 }}>
      <TextField
        label="Giá"
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleTest}
        style={{ marginTop: 50, padding: 50 }}
      >
        TEST
      </Button>
    </Page>
  );
}
