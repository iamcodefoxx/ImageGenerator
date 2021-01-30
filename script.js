//get acces to input box
const input = document.getElementById("input");

// add event on enter
input.addEventListener("keydown", function(event)
{
  if (event.key == "Enter")
    loadImg();
});

// add event on click
document.getElementsByClassName("fa fa-search")[0].addEventListener("click", loadImg);

// create an array of images
function createImagesArray(data)
{
  const imageNodes = [];
  for(let i = 0;i < data.results.length;i++)
  {
    imageNodes[i] = document.createElement("div");
    imageNodes[i].className = "img";
    imageNodes[i].style.backgroundImage = "url("+data.results[i].urls.raw+")";
    imageNodes[i].addEventListener("dblclick", function(){
    window.open(data.results[i].links.download, '_blank');
    })
    document.getElementById("grid").insertAdjacentElement("beforeend", imageNodes[i]);
  }
}

// create the function for loadImg
function loadImg()
{
  removeImages();

  const url = "https://api.unsplash.com/search/photos?query='"+input.value+"'&per_page=9&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo";

  fetch(url)

  .then(response => 
  {
      if(response.ok)
        return response.json();
      else
        console.log(response.status);
  })

  .then(data =>
  { 
    createImagesArray(data);
  });    
}

function removeImages()
{
  var i = 0;
  var list = document.getElementById("grid");

  while(i < list.childNodes.length)
  {
    list.removeChild(list.childNodes[i]);
  }
}

// window.addEventListener('load', loadImg);
// document.getElementById("button").addEventListener("click", loadCat);

// function loadCat(){
//   var request = new XMLHttpRequest();
//   request.open('GET','https://api.thecatapi.com/v1/images/search',true)

//   request.onload = function(){
//     if(this.status == 200){
//       var catImage = JSON.parse(this.responseText); 
//       var node0 = document.createElement("div");

//       node0.className = "img";
//       node0.style.backgroundImage = "url("+catImage[0].url+")";
//     }
//     document.getElementsByClassName("grid")[0].insertAdjacentElement("beforeend", node0);
//   }
//   request.send();
// }