let imageURL;

const getFinalImageFromAPI = async (image) =>
{
  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  const apiKey = "RUu8RDzQwdhNdUgNTZRApg75";

  const resp = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  })

  const blob = await resp.blob();

  const url = URL.createObjectURL(blob);
  const imageURL = url;
  return imageURL

}


const showUploadedFileToUser = (img) =>
{
  const imageNode = document.getElementById("userInput")
  const reader = new FileReader()
  reader.onload = (e) => {
    imageNode.src = e.target.result
  }
  reader.readAsDataURL(img)
}

const showFinalImageToUser = (imgUrl) => {
  const imageOutputNode = document.getElementById("userOutput")

  imageOutputNode.src = imgUrl
}

// separation of concerns

const submitHandler = async (e) => 
{
  e.preventDefault();
  const fileInput = document.getElementById("fileInput");
  const image = fileInput.files[0];

  if (image) {
    showUploadedFileToUser(image)
  }
  imageURL = await getFinalImageFromAPI(image);


  // show final image to user
  showFinalImageToUser(imageURL)

  // return imageURL

}
const addSubmitListener = () =>
{
  const form = document.getElementById('upload-form');
  form.addEventListener('submit', submitHandler);
}

function downloadFile(){
  var anchorElement = document.createElement('a'); //<a></a>
      anchorElement.href = imageURL;
      anchorElement.download = 'no_bg.png';
      document.body.appendChild(anchorElement);

      anchorElement.click();

      document.body.removeChild(anchorElement);
 }


/**
 * Function Calls
 */

addSubmitListener()


// const addDownloadImageFeature = (imageURL) =>{
//   var anchorElement = document.createElement("a"); //<a></a>
//   anchorElement.href = imageURL;
//   anchorElement.download = "Removed_Background.png";
//   document.body.appendChild(anchorElement);

//   anchorElement.click();

//   document.body.removeChild(anchorElement);
// }