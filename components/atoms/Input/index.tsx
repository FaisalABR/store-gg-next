export interface InputProps {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
}

export default function Input(props: InputProps) {
  const { label, ...nativeProps } = props;
  return (
    <>
      <label className="form-label text-lg fw-medium color-palette-1 mb-10">
        {label}
      </label>
      <input
        type="text"
        className="form-control rounded-pill text-lg"
        aria-describedby="name"
        placeholder="Enter your name"
        {...nativeProps}
      />
    </>
  );
}
