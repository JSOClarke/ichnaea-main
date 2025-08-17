interface UniversalWidgetProps {
  title: string;
  value: number;
}

export default function UniversalWidget({
  title,
  value,
}: UniversalWidgetProps) {
  return (
    <div className="main-container bg-white rounded-xl flex-1 h-30 flex flex-col items-center justify-center">
      <div className="title-container font-bold text-gray-800">{title}</div>
      <div className="details-container  tracking-widest">{`£${value.toLocaleString()}`}</div>
      <div className="value-container"></div>
    </div>
  );
}
