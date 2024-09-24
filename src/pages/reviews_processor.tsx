import React from "react";
import {
  combinedReviewsDataObj,
  reviewsDataArraySeperateObj,
} from "@/utils/jsonUtils/jsonUtils";

const ReviewsProcessor = () => {
  console.log(reviewsDataArraySeperateObj, "reviewsDataArraySeperateObj");
  console.log(
    reviewsDataArraySeperateObj.map((item) => Object.keys(item).length),
    "reviewsDataArraySeperateObj"
  );
  console.log(combinedReviewsDataObj, "combinedReviewsDataObj");
  console.log(
    Object.keys(combinedReviewsDataObj).length,
    "combinedReviewsDataObj"
  );
  return <div>reviews_processor</div>;
};

export default ReviewsProcessor;
