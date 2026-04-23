import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); 
    }
  };

  return <button onClick={handleBack} className="bg-amber-500 p-2  text-amber-50 rounded-r-full hover:px-4 transform transition-transform duration-900">
    <ArrowLeft />
  </button>;
};

export default BackButton;
