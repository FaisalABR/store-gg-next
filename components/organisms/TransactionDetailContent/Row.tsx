import { NumericFormat } from "react-number-format";

interface RowProps {
  label: string;
  value: string | number;
  className?: string;
}

export default function Row(props: Partial<RowProps>) {
  const { label, value, className } = props;
  return (
    <p className="text-lg color-palette-1 mb-20">
      {label}{" "}
      {typeof value === "number" ? (
        <span className={`purchase-details ${className}`}>
          {" "}
          <NumericFormat
            prefix={"Rp. "}
            value={value}
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </span>
      ) : (
        <span className={`purchase-details ${className}`}>{value}</span>
      )}
    </p>
  );
}
