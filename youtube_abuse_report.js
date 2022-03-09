function waitForXResult(selector, timeoutInMs=5000) {
  x = document.evaluate(selector, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);  
  let startTimeInMs = Date.now();
  while (x.snapshotLength == 0){
    x = document.evaluate(selector, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) {throw new Error("Timeout on selector: " + selector);}
  };
  return x;
};

function checkElem(elem){
  if (!elem.isConnected) {throw new Error("Element is disconnected");}
  if (typeof(elem.click) !== 'function') {throw new Error("Element does not have a .click() method");}
  return elem;
}

function xResultToElem(XResult) {
  if (XResult.snapshotLength == 1){
    elem = checkElem(XResult.snapshotItem(0));
    return elem;
  }
  if (XResult.snapshotLength > 1){
    elems = [];
    for (let i = 0; i < XResult.snapshotLength; i++){
      elem = checkElem(XResult.snapshotItem(i));
      elems.push(elem);
    }
    return elems;
  }
  throw new Error("snapshotLength <=0, impossible to get element");
};


function waitForElement(selector, timeoutInMs=5000){
  x = waitForXResult(selector, timeoutInMs);
  elem = xResultToElem(x);
  while (x.snapshotLength == 0){
    x = waitForXResult(selector, timeoutInMs);
    elem = xResultToElem(x);
    if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) {throw new Error("Timeout on selector: " + selector);}
  };
  return elem;
};

function clickAll(elems){
  if (!Array.isArray(elems)){throw new Error("Elems are not array");}
  if (elems.length == 1){throw new Error("Elems are array of length 1");}
  for (const elem of elems) {elem.click();}
};

function report_abuse(){      
    console.log("1. Click on flag-button");
    elem = waitForElement("//div[@id='action-buttons']//button");
    elem.click();
    console.log("1. Click on flag-button DONE");
    
    console.log("2. Select a menu item #5");
    elem = waitForElement("//tp-yt-paper-listbox[@id='items']/*[5]");
    elem.click();
    console.log("2. Select a menu item #5 DONE");
    
    console.log("3. Select a cause #6 (options)");
    elem = waitForElement("//div[@id='options-select']/*[1]/*[@role='radio'][6]");
    elem.click();
    console.log("3. Select a cause #6 (options) DONE");
    
    console.log("4. After selecting - Next button");
    elem = waitForElement("//*[@id='next-button']");
    elem.click();
    console.log("4. After selecting - Next button DONE");
    
    console.log("5. Select all videos");
    elems = waitForElement("//div[@id='checkboxContainer']/div/div");
    clickAll(elems);
    console.log("5. Select all videos DONE");
  
    console.log("6. After selecting - Next button");
    elem = waitForElement("//*[@id='next-button']");
    elem.click();
    console.log("6. After selecting - Next button DONE");
    
    console.log("7. Insert text");
    elem = waitForElement("//textarea[@id='textarea']")
    elem.value = "Це відео допомагає вбивати наших близьких і закликає до геноциду Українського народу"
    console.log("7. Insert text DONE");
        
    // Commented to avoid a real report
    // console.log("8. After text - Next button and FINISH");
    // elem = waitForElement("//*[@id='next-button']");
    // elem.click();
    // console.log("8. After text - Next button and FINISH DONE");
};


// it's not a danger Youtube channel actually
let channel = "https://www.youtube.com/channel/UC4ostx0p8yLZaN7WpC_g7fQ";
await window.open(URL=channel+"/about", name="_self");
document.onload = report_abuse();