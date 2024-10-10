
export const toDataURL = async (url) => {
    let oofBase = null;
    await fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      )
      .then((dataUrl:string) => {
        console.log("RESULT:", dataUrl);
        oofBase = dataUrl.split(',')[1];
      });
  
    return oofBase;
  };
  