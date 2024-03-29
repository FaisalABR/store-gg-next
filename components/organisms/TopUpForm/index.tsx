import { useState } from "react";
import Link from "next/link";
import NominalItem from "./NominalItem";
import PaymentItem from "./PaymentItem";
import { BanksTypes, NominalTypes, PaymentTypes } from "@/services/data-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

interface TopUpFormTypes {
  nominals: NominalTypes[];
  payments: PaymentTypes[];
}

export default function TopUpForm(props: TopUpFormTypes) {
  const [verifyID, setVerifyID] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [nominalItem, setNominalItem] = useState<any | null>(null);
  const [paymentItem, setPaymentItem] = useState<any | null>(null);
  const { nominals, payments } = props;

  const router = useRouter();

  const onNominalItemChange = (data: NominalTypes) => {
    setNominalItem(data);
  };

  const onPaymentItemChange = (payment: PaymentTypes, bank: BanksTypes) => {
    const data = {
      payment,
      bank,
    };
    setPaymentItem(data);
  };

  const onSubmit = () => {
    const data = {
      verifyID,
      nominalItem,
      paymentItem,
      bankAccountName,
    };

    if (
      verifyID === "" ||
      bankAccountName === "" ||
      nominalItem === null ||
      paymentItem === null
    ) {
      toast.warn("Data harus diisi semua!!!");
    } else {
      localStorage.setItem("data-topup", JSON.stringify(data));
      router.push("/checkout");
    }
  };
  return (
    <form>
      <div className="pt-md-50 pt-30">
        <div className="">
          <label
            htmlFor="ID"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Verify ID
          </label>
          <input
            type="text"
            className="form-control rounded-pill text-lg"
            id="ID"
            name="ID"
            aria-describedby="verifyID"
            placeholder="Enter your ID"
            value={verifyID}
            onChange={(e) => setVerifyID(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-md-50 pb-md-50 pt-30 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Nominal Top Up
        </p>
        <div className="row justify-content-between">
          {nominals.map((item) => (
            <NominalItem
              key={item._id}
              _id={item._id}
              coinName={item.coinName}
              coinQuantity={item.coinQuantity}
              price={item.price}
              onChange={() => onNominalItemChange(item)}
            />
          ))}

          <div className="col-lg-4 col-sm-6"></div>
        </div>
      </div>
      <div className="pb-md-50 pb-20">
        <p className="text-lg fw-medium color-palette-1 mb-md-10 mb-0">
          Payment Method
        </p>
        <fieldset id="paymentMethod">
          <div className="row justify-content-between">
            {payments.map((payment) =>
              payment.banks.map((bank) => (
                <PaymentItem
                  key={bank._id}
                  bankID={bank._id}
                  type={payment.type}
                  name={bank.bankName}
                  onChange={() => onPaymentItemChange(payment, bank)}
                />
              ))
            )}

            <div className="col-lg-4 col-sm-6"></div>
          </div>
        </fieldset>
      </div>
      <div className="pb-50">
        <label
          htmlFor="bankAccount"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Bank Account Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          id="bankAccount"
          name="bankAccount"
          aria-describedby="bankAccount"
          placeholder="Enter your Bank Account Name"
          value={bankAccountName}
          onChange={(e) => setBankAccountName(e.target.value)}
        />
      </div>
      <div className="d-sm-block d-flex flex-column w-100">
        <button
          type="button"
          className="btn btn-submit rounded-pill fw-medium text-white border-0 text-lg"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </form>
  );
}
