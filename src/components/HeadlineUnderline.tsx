interface HeadlineUnderlineProps {
  center?: boolean;
}

const HeadlineUnderline = ({ center = true }: HeadlineUnderlineProps) => (
  <div
    className="h-[3px] bg-sand mt-3"
    style={{ width: 60, margin: center ? "12px auto 0" : undefined }}
  />
);

export default HeadlineUnderline;
