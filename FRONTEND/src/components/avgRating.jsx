import React from "react";
import { getRecipe } from "../api/recipes";

const AvgRating = ({ id }) => {
  const [avgRating, setAvgRating] = React.useState(0);
  const [recipe, setRecipe] = React.useState(null);

  React.useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipe(id);
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  React.useEffect(() => {
    if (recipe && recipe.ratings && recipe.ratings.length > 0) {
      const totalRating = recipe.ratings.reduce((sum, r) => sum + r.rating, 0);
      const avg = totalRating / recipe.ratings.length;
        setAvgRating(avg);
    }
    else {
        setAvgRating(0);
    }
    }, [recipe]);

    return (
        <div className="flex items-center gap-1">
            { avgRating === 0 ? (
                <p className="text-sm text-gray-600">No ratings yet</p>
            ) : (
                <>
                    <p className="text-sm text-gray-600">{avgRating.toFixed(1)}</p>     
                    <span className="text-amber-500 text-lg">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                                {i < Math.round(avgRating) ? "★" : "☆"}
                            </span>
                        ))}
                    </span>
                </>
            )}
        </div>
    );
};

export default AvgRating;
