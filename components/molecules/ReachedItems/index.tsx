interface ReachedProps {
  number: string;
  desc: string;
}

export default function ReachedItems(props: ReachedProps) {
  const { number, desc } = props;
  return (
    <div className="me-lg-35">
      <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
        {number}
      </p>
      <p className="text-lg text-lg-start text-center color-palette-2 m-0">
        {desc}
      </p>
    </div>
  );
}
