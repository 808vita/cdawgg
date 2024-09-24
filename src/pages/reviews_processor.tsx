import React, { useEffect, useState } from "react";
import {
  combinedReviewsDataObj,
  reviewsDataArraySeperateObj,
} from "@/utils/jsonUtils/jsonUtils";
import { backend_call_genani } from "@/utils/fetchHandlers/fetch_gemini_api_call";
import { promptSelectionObject } from "@/utils/helpers/promptSelection";

const ReviewsProcessor = () => {
  const [currentSelectedReviewsState, setCurrentSelectedReviewsState] =
    useState(
      `    
      "Refrigerator booked with full payment and not delivered as promised.. waited two days and the there was no information from the Viveks side about the delay till I called the staff many times and asked.. initially phone was also not answered and I had to call many times for the updates where as they could have informed about delay. could have informed me prior about delay so that I would not have wasted my time and leave while waiting for delivery.. still am waiting today at home only for the delivery and no information so far , calls are also not being answered as well.. Very poor Customer care!!",
      "I had the worst experience buying a Crompton pedestal fan yesterday. I asked them to open and check it once, but they refused, stating that it was a sealed piece and there would be no issues. However, after opening the box at home, I noticed extensive wear and tear on the fan, making it appear used. The wires were tied with a rubber band, and there was a significant amount of dust all around. The paint had worn off in many places. I called customer service, and they assured me that the branch would contact me, but I havent received any calls yet. I have tried calling them, but they havent picked up. If Viveks sees this review, please help solve my problem.",
      "Very bad.staff billed me Rs380/- for extended warranty without my permission.",
      "good service",
      "Good service",
      "We have ordered and paid full payment on 14th January for purchase of 7 kg Samsung washing mc top model and concerned salesman assured it wl be delivered on 14th itself..till this time, it is not delivered, after 3 days..such a poor service..nobody is picking up the phone",
      "Ive purchase Bosch washing machine on 18 sep 2022, As per your sales officer telling free of cost for delivery. But Delivery agent Pandian is asking extra money and we provide 100 rs he is asking exta money behaving very rudely.",`
    );

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

  const testGeminiApiHandler = async () => {
    if (currentSelectedReviewsState !== "") {
      const responseFromGemini = await backend_call_genani(
        currentSelectedReviewsState,
        promptSelectionObject.testPrompt
      );

      if (!responseFromGemini?.error) {
        // set the sucess content to the correct state
        console.log(responseFromGemini, "responseFromGemini");
      }
    }
  };

  useEffect(() => {
    testGeminiApiHandler();
  }, []);

  return <div>reviews_processor</div>;
};

export default ReviewsProcessor;
