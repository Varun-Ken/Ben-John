import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import React from "react";

const ReviewTile = ({ review }) => {
  const userName = review.userId.userName;

  const starsGiven = review.reviewValue;
  const userRatingArr = [];
  for (let rate = 1; rate <= 5; rate++) {
    userRatingArr.push(rate);
  }
  return (
    <Card className="mt-5">
      <div className="flex items-center ml-2">
        <Avatar>
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
        <p className="ml-2">{userName}</p>
      </div>
      <div className="rating my-3 ml-2">
        {userRatingArr.map((star) => (
          <input
            key={star}
            type="radio"
            name={`${userName}`}
            className="mask mask-star-2 bg-black-400 mx-0.5"
            aria-label={`${star} star`}
            checked={starsGiven == star}
          />
        ))}
      </div>
    </Card>
  );
};

export default ReviewTile;
