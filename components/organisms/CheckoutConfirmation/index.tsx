import { setCheckout } from "@/services/player";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CheckoutConfirmation() {
  const [checkbox, setCheckbox] = useState<any | null>(false);

  const router = useRouter();

  const onSubmit = async () => {
    if (!checkbox) {
      toast.error("Pastikan anda sudah transfer!");
    } else {
      const dataTopUpLocal = localStorage.getItem("data-topup");
      const dataItemLocal = localStorage.getItem("data-item");

      const itemTopUp = JSON.parse(dataTopUpLocal!);
      const item = JSON.parse(dataItemLocal!);

      const data = {
        voucher: item._id,
        nominal: itemTopUp.nominalItem._id,
        payment: itemTopUp.paymentItem.payment._id,
        bank: itemTopUp.paymentItem.bank._id,
        name: itemTopUp.bankAccountName,
        accountUser: itemTopUp.verifyID,
      };

      const response = await setCheckout(data);

      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success("Checkout berhasil!");
        router.push("/complete-checkout");
      }
    }
  };

  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input
          type="checkbox"
          checked={checkbox}
          onChange={(e) => setCheckbox(e.target.value)}
        />
        <span className="checkmark"></span>
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          type="button"
          onClick={onSubmit}
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}
