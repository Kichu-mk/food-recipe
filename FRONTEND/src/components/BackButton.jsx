import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  const params = useParams(); 


  return <button onClick={() => navigate(-1)} className="bg-amber-500 p-2  text-amber-50 rounded-r-full hover:px-4 transform transition-transform duration-900">
    <ArrowLeft />
  </button>;
};

export default BackButton;
