import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AutoAwesomeIcon
        className="w-4 h-4 animate-spin text-white"
        fontSize="large"
      />
    </div>
  );
}
