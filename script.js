function shortenURL(){
    var input = document.getElementById("urlInput").value;

    fetch(`https://api.shrtco.de/v2/shorten?url=${input}`).then(response => {
        if(response.ok ){
            return response.json();
        }
        else{
            displayErrorsUsingStatusCode(response.status);
            displayShortenedURL('')
            throw new Error("Something went wrong");
        }
    } ).then(data => {
        var urls = data.result;
        displayShortenedURL(urls);
    }).catch(err=>console.log(err))
  }

  function displayErrorsUsingStatusCode(code){
    var errorDiv = document.getElementById("error");
    errorDiv.innerHTML = "";
    switch(code){
        case 400:
            errorDiv.innerHTML = "Please add a valid link";
            break;
        case 429:
            errorDiv.innerHTML = "Rate limit reached. Please try again later";
            break;
        case 500:
            errorDiv.innerHTML = "Internal server error. Please try again later";
            break;
        default:
            errorDiv.innerHTML = "Something went wrong. Please try again later";
            break;
    }
  }
  
  function displayShortenedURL(shortURL) {
    var shortenedURLDiv = document.getElementById("shortenedURL");
    shortURL && (shortenedURLDiv.innerHTML = `
    <div class="shortenedURL">
        ${showLink(shortURL.original_link)}
        ${showLink(shortURL.full_short_link)}
        ${showLink(shortURL.short_link2)}
        ${showLink(shortURL.full_short_link2)}
        ${showLink(shortURL.short_link3)}
        ${showLink(shortURL.full_short_link3)}
        <button class="copyButton" onclick="copyToClipboard('${shortURL.full_short_link}')">Copy</button>
        <button class="copyButton" onclick="shareOnFacebook('${encodeURIComponent(shortURL.original_link)}')">share</button>
        <a class="copyButton" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shortURL.original_link)}" target="_blank">share</a>
        <a class="copyButton" href="https://twitter.com/share?url=${encodeURIComponent(shortURL.full_short_link)}" target="_blank">share</a>
        <a class="copyButton" href="http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shortURL.full_short_link)}" target="_blank">share</a>
    </div>
    `)
  }
  
function showLink(url){
    return `
    <div class="url-div">
        <div class="url">${url}</div>
        <div class="icons">
            <div class="newWindow6"></div>
            <div class="newWindow6"></div>
        </div>
    `
}


    function copyToClipboard(text) {
        //copy text to clipboard
        navigator.clipboard.writeText(text).then(function() {
            alert("Copied to clipboard");
        }
        , function(err) {
            console.error('Async: Could not copy text: ', err);
        }
        );
    }

function shareOnFacebook(content){
  const navUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + content;
  window.open(navUrl , '_blank');
}