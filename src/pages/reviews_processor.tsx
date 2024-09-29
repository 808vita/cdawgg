import React, { useEffect, useState, useCallback } from "react";
import { Button, Spinner } from "@nextui-org/react";
import {
  combinedReviewsDataObj,
  placeIdArray,
  reviewsDataArraySeperateObj,
} from "@/utils/jsonUtils/jsonUtils";
import { backend_call_genani } from "@/utils/fetchHandlers/fetch_gemini_api_call";
import {
  availablePromptsArray,
  promptSelectionObject,
} from "@/utils/helpers/promptSelection";
import ReviewProcessorRadioSelector from "@/components/uiComponents/ReviewProcessorRadioSelector";
import { produce } from "immer";

const loadingStateTemplate = {};

placeIdArray.map((item, index) => (loadingStateTemplate[item] = {}));

let processedBundledReviewsDict = {};
let errorsBundledReviewsArray = [];

let processedMonthSplitReviewsDict = {};

/**
 * 
 * @returns page jsx
 * 
 * review processor page
 * this holds the module for data pre-processing  |
 * the raw reviews where sent to gemini api to process & consolidate it for the using it in other modules.
 */
const ReviewsProcessor = () => {
  const [promptSelectorState, setPromptSelectorState] = useState(
    availablePromptsArray[0]
  );

  const [loadingStates, setloadingStates] = useState(loadingStateTemplate);

  const handleSetLoadingStates = useCallback(
    (placeid, processingKey, boolVal) => {
      setloadingStates(
        produce((draft) => {
          const record = draft[placeid];
          record[processingKey] = boolVal;
        })
      );
    },
    []
  );

  const [topLevelLoadingstate, setTopLevelLoadingState] = useState({
    placeId_index: "",
  });

  const handleSetTopLevelLoadingState = useCallback((data = "") => {
    setTopLevelLoadingState(
      produce((draft) => {
        draft["placeId_index"] = data;
      })
    );
  }, []);

  const [spinnerLoading, setSpinnerLoading] = useState(false);

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
  console.log(placeIdArray, "placeIdArray");

  const testGeminiApiHandler = async (
    mode,
    placeid,
    processingKey,
    reviewDataString
  ) => {
    if (reviewDataString !== "") {
      const responseFromGemini = await backend_call_genani(
        reviewDataString,
        // promptSelectionObject.identifyProductsPrompt
        promptSelectionObject[promptSelectorState],
        placeid,
        processingKey,
        handleSetLoadingStates
      );

      if (!responseFromGemini?.error) {
        // set the sucess content to the correct state
        console.log(responseFromGemini, "responseFromGemini");

        if (mode === handlerModeOptions.bundled) {
          processedBundledReviewsDict[placeid][processingKey] = [
            //@ts-ignore
            ...new Set(responseFromGemini?.test_content),
          ];
        }
        if (mode === handlerModeOptions.month_split) {
          processedMonthSplitReviewsDict[placeid][processingKey] = [
            //@ts-ignore
            ...new Set(responseFromGemini?.test_content),
          ];
        }

        // let jsonData = JSON.stringify(responseFromGemini);
        // downloadJsonStringed(
        //   jsonData,
        //   "responseFromGemini.json",
        //   "application/json"
        // )
      }

      if (responseFromGemini?.error) {
        if (mode === handlerModeOptions.bundled) {
          errorsBundledReviewsArray.push(placeid);
        }
      }
    }
  };
  function downloadJsonStringed(jsonContent, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([jsonContent], { type: contentType });
    // 'text/plain'
    // 'application/json'
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  // let data = { oof: "cat", cat: "oof" };
  // let jsonData = JSON.stringify(data);
  // useEffect(() => {
  //   testGeminiApiHandler();
  //   const oof = ["cat", "dog", "meow"];
  //   let text = oof.toString();
  //   console.log(text, "oof.toString");
  //   // download(jsonData, 'json.txt', 'text/plain');
  //   downloadJsonStringed(jsonData, "json.json", "application/json");
  // }, []);

  useEffect(() => {
    console.log(loadingStates, "loadingStates");

    const loadingArray = Object.values(loadingStates)
      .map((item) => Object.values(item))
      .flat();
    console.log(loadingArray, "loadingArray");
    if (loadingArray.includes(true)) {
      setSpinnerLoading(true);
    } else {
      setSpinnerLoading(false);
    }
  }, [loadingStates]);

  const handlerModeOptions = {
    bundled: "bundled_reviews",
    month_split: "month_split_reviews",
  };

  const iterateCallGeminiHandler = (mode, placeIdArray) => {
    console.log("starting iterator... ", mode, placeIdArray);
    handleSetTopLevelLoadingState("starting");
    let index = 0;

    let interval = setInterval(function () {
      console.log("index", index, placeIdArray[index]);
      handleSetTopLevelLoadingState(
        "processing _" + placeIdArray[index] + "_ " + index
      );

      const selectedObj = combinedReviewsDataObj[placeIdArray[index]][mode];
      const keysArray = Object.keys(selectedObj);

      console.log("index", index, selectedObj);
      console.log("keysArray", keysArray);

      keysArray.map((processingKey) => {
        // console.log(
        //   selectedObj[processingKey].toString(),
        //   processingKey,
        //   "keysArray processingKey"
        // );

        if (mode === handlerModeOptions.bundled) {
          processedBundledReviewsDict[placeIdArray[index]] = {};
        }

        if (mode === handlerModeOptions.month_split) {
          processedMonthSplitReviewsDict[placeIdArray[index]] = {};
        }

        testGeminiApiHandler(
          mode,
          placeIdArray[index],
          processingKey,
          selectedObj[processingKey].toString()
        );
      });

      if (mode === handlerModeOptions.bundled) {
        console.log(mode, index);
      } else if (mode === handlerModeOptions.month_split) {
        console.log(mode);
      }

      index++;
      if (index === placeIdArray.length) {
      // if (index === 3) {
        // for testing - a limited number
        // change the conditional to check for the length of the array
        clearInterval(interval);
        console.log("interval cleared", mode);
        handleSetTopLevelLoadingState("");
      }
    }, 60000);
    // change interval to 60000 or higher 60 secs or higher
  };

  return (
    <div>
      <ReviewProcessorRadioSelector
        promptSelectorState={promptSelectorState}
        setPromptSelectorState={setPromptSelectorState}
      />
      {topLevelLoadingstate.placeId_index === "" && !spinnerLoading ? (
        <Button
          size="lg"
          className="m-4"
          onClick={() =>
            iterateCallGeminiHandler(handlerModeOptions.bundled, placeIdArray)
          }
        >
          Bundled Reviews Processor
        </Button>
      ) : (
        <Button color="secondary" isLoading>
          {topLevelLoadingstate.placeId_index}
        </Button>
      )}
      {spinnerLoading && <Spinner />}
      <Button
        size="lg"
        className="m-4"
        onClick={async () => {
          let jsonData = JSON.stringify(processedBundledReviewsDict);
          downloadJsonStringed(
            jsonData,
            promptSelectorState + "_processedBundledReviewsDict.json",
            "application/json"
          );
          console.log("error array", errorsBundledReviewsArray);
        }}
      >
        Download Bundled Reviews Processor
      </Button>
      {topLevelLoadingstate.placeId_index === "" && !spinnerLoading ? (
        <Button
          size="lg"
          className="m-4"
          onClick={() =>
            iterateCallGeminiHandler(
              handlerModeOptions.month_split,
              placeIdArray
            )
          }
        >
          Month split Reviews Processor
        </Button>
      ) : (
        <Button color="secondary" isLoading>
          {topLevelLoadingstate.placeId_index}
        </Button>
      )}
      <Button
        size="lg"
        className="m-4"
        onClick={async () => {
          let jsonData = JSON.stringify(processedMonthSplitReviewsDict);
          downloadJsonStringed(
            jsonData,
            promptSelectorState + "processedMonthSplitReviewsDict.json",
            "application/json"
          );
          console.log("error array", errorsBundledReviewsArray);
        }}
      >
        Download month_split Reviews Processor
      </Button>
    </div>
  );
};

export default ReviewsProcessor;
