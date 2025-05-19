import { ClipLoader } from "react-spinners";

export default function LoadingSpinner({
  size = 40,
  color = "#FF6600",
  height = "h-40",
}) {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      <ClipLoader size={size} color={color} />
    </div>
  );
}
