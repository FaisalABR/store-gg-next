import { useEffect, useState } from "react";

export default function CheckoutItem() {
  const [itemData, setItemData] = useState({
    name: "",
    thumbnail: "",
    category: {
      name: "",
    },
  });

  useEffect(() => {
    const dataFromLocal = localStorage.getItem("data-item");
    const dataItemLocal = JSON.parse(dataFromLocal!);
    setItemData(dataItemLocal);
  }, []);

  const IMG = process.env.NEXT_PUBLIC_IMG;
  return (
    <>
      <div className="pe-4">
        <div className="cropped">
          <img
            src={`${IMG}/${itemData.thumbnail}`}
            className="img-fluid"
            alt=""
          />
        </div>
      </div>
      <div>
        <p className="fw-bold text-xl color-palette-1 mb-10">{itemData.name}</p>
        <p className="color-palette-2 m-0">
          Category: {itemData.category.name}
        </p>
      </div>
    </>
  );
}
