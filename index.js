// https://www.javascripttutorial.net/javascript-callback/ to learn the callback async way
// https://www.javascripttutorial.net/javascript-event-loop/ about the event loop
// https://www.javascripttutorial.net/es6/javascript-promises/, source
// https://www.javascripttutorial.net/es-next/javascript-async-await/ source

//! 0 Promise constructor

// The Promise constructor accepts a function as an argument. This function is called the executor. The executor accepts two functions with the names, by convention, resolve() and reject(). When you call the new Promise(executor), the executor is called automatically. 

// Inside the executor, you manually call the resolve() function if the executor is completed successfully and invoke the reject() function in case of an error occurs.

const apiPromiseConstructor = new Promise((resolve, reject) => true ? resolve("I have completed learning JS.") : reject("I haven't completed learning JS yet."));

// If you embed the above JavaScript code in an HTML document and check the console window, you will see that the promise is resolved because the completed variable is set to true. To see the pending state of the promise, we wrap the code of the executor in the setTimeout() function.

const apiPromiseConstructor2 = new Promise((resolve, reject) => 
  setTimeout(() =>
    true ? resolve("I have completed learning JS.") : reject("I haven't completed learning JS yet."), 3000)
    // false ? resolve("I have completed learning JS.") : reject("I haven't completed learning JS yet."), 3000)
);

// Now, you see that the promise starts with the pending state with the value is undefined. The promise value will be returned later once the promise is completed.

// After about 3 seconds, type the apiPromiseConstructor2 in the console window, you will see that the state of the promise becomes resolved and the promise value is the string that we passed to the resolve() function.

// A promise cannot go from the fulfilled state to the rejected state and vice versa. It also cannot go back from the fulfilled state or rejected state to the pending state.

// Once a new Promise object is created, it is in the pending state until it is resolved. To schedule a callback when the promise is either resolved or rejected, you call the methods of the Promise object: then(), catch(), and finally().

// Example of handling only the fullfiled case. You can handle either case or both, see apiPromise
// const handlerExample = apiPromiseConstructor2.then(onFulfilled => console.log("000. onFulfilled ==>", onFulfilled))

//! 1

// The fetch() method takes one mandatory argument, the path to the resource you want to fetch. It returns a Promise that resolves to the Response to that request, whether it is successful or not.
const apiPending = () => fetch('https://source.unsplash.com/random/') // Once a new Promise object is created, it is in the pending state until it is resolved. 

//! 2

// Consuming a Promise. To schedule a callback when the promise is either resolved or rejected, you call the methods of the Promise object: then(), catch(), and finally().
const apiPromise = () => {
  // return fetch('https://source.unsplash.comx/random/') // to return a rejected/error state
  return fetch('https://source.unsplash.com/random/')
  // The then() method is used to schedule a callback to be executed when the promise is successfully resolved.
  .then(
    onFulfilled => console.log("2. onFulfilled ==>", onFulfilled),
    // onRejected => console.log(".then onRejected ==>", onRejected)
  )
  // If you want to schedule a callback to be executed when the promise is rejected, you can use the catch() method of the Promise object
  // Internally, the catch() method invokes the then(undefined, onRejected) method.
  .catch(
    onRejected => console.log("2. onRejected ==>", onRejected)
  )
  .finally(
    () => console.log("2. will execute regardless!")
  )
}

//! 3

// The async keyword allows you to define a function that handles asynchronous operations. This return a promise.
// const apiAsync = async () => {
//   // You use the await keyword to wait for a Promise to settle either in resolved or rejected state
//   const response = await fetch('https://source.unsplash.comx/random/')
//   // const result = await fetch('https://source.unsplash.comx/random/')

//   // Since we are waiting on the promise we will go from pending to either fulfilled or rejected
//   console.log("apiAsync 1", response)
//   return response
// }

// If a promise resolves, the await promise returns the result. However, when the promise rejects, the await promise will throw an error as if there were a throw statement.
// async function getUser(userId) {
//   await Promise.reject(new Error('Invalid User Id'));
// }
// is the same as this:
// async function getUser(userId) {
//   throw new Error('Invalid User Id');
// }

// You can catch the error by using the try...catch statement
const apiAsync = async () => {
  try {
    const response = await fetch('https://source.unsplash.com/random/')
    // const response = await fetch('https://source.unsplash.comx/random/')
    console.log("3. apiAsync response is:", response)
    return response
  } catch(error) {
    return console.log("3. apiAsync Error is:", error);
  }
}

// console.log("0. apiPromiseConstructor -->", apiPromiseConstructor);
// console.log("00. apiPromiseConstructor2 -->", apiPromiseConstructor2);
// console.log("000. handlerExample -->", handlerExample);

// console.log("1. apiPending -->", apiPending());
// console.log("2. apiPromise -->", apiPromise());
// console.log("3. apiAsync -->", apiAsync());

//! 4 https://source.unsplash.com/ --> https://source.unsplash.com/featured/?{KEYWORD},{KEYWORD}

const apiSearch = (...keywords) => fetch(`https://source.unsplash.com/featured/?${keywords.join()}`)

// const imageSearchURL = apiSearch("animals","birds")
//   .then(onFulfilled => {
//     const img = new Image() // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
//     img.srcset = onFulfilled.url
//     return document.getElementById('imagesContainer').appendChild(img)
//   })
//   .catch(onRejected => console.log(onRejected))

// const imageSearchURLAsync = async () => {
//   try {
//     const response = await apiSearch("animals","dogs","cats")
//     const img = new Image() // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
//     img.srcset = response.url
//     return document.getElementById('imagesContainer2').appendChild(img)
//   } catch(error) {
//     return console.log(error)
//   }
// }

// this inverts the image order because of how we are getting the element by id we are just pushing images
// const attachImage = url => {
// 	var img = new Image();
//   img.srcset = url;
//   return document.getElementById('imagesContainer').appendChild(img);
// }

// const imageSearchURL = apiSearch("animals","birds")
//   .then(onFulfilled => {
//     attachImage(onFulfilled.url)
//   })
//   .catch(onRejected => console.log(onRejected))

// const imageSearchURLAsync = async () => {
//   try {
//     const response = await apiSearch("animals","dogs","cats")
//     return attachImage(response.url)
//   } catch(error) {
//     return console.log(error)
//   }
// }

// imageSearchURLAsync()

//! 5 Wait for apiPending & apiSearch
// to maintain order I created two divs for images, other ways are possible but it is not important for this exercise
const attachImage = (url, container = "") => {
	var img = new Image();
  img.srcset = url;
  return document.getElementById(`imagesContainer${container}`).appendChild(img);
}

// const waitForBoth = apiPending()
//   .then(onFulfilled => {
//     attachImage(onFulfilled.url)
//     return apiSearch("animals","birds")
//       .then(
//         onFulfilled2 => attachImage(onFulfilled2.url, 2)
//       )
//       .catch(onRejected2 => console.log(onRejected2))
//   })
//   .catch(onRejected => console.log(onRejected))

const waitForBothAsync = async () => {
  // With two try and catch blocks for each promise we make sure that regardless of outcome for each the next one will show if not with an error
  try {
    const response = await apiPending()
    attachImage(response.url)
    // const response2 = await apiSearch("animals","birds")
    // attachImage(response2.url, 2)
  } catch(error) {
    console.log(error)
  }
  
  try {
    const response2 = await apiSearch("animals","birds")
    return attachImage(response2.url, 2)
  } catch (error) {
    return console.log(error)
  }
}
waitForBothAsync()
