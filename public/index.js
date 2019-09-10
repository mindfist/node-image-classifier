const IMAGE_SIZE = 256;

let net;

function loadImg() {
    const imgEl = document.getElementById('img');
    imgEl.width = IMAGE_SIZE;
    imgEl.height = IMAGE_SIZE;
    imgEl.onload = () => predict(img);
}

loadImg();
welcomeMsg();

function welcomeMsg() {
    let displayEl = document.getElementById('file-container')
    let para = document.createElement("p");
    para.className = ("alert alert-info");
    let node = document.createTextNode("Welcome to image classifier upload image to analyze");
    para.appendChild(node);
    displayEl.appendChild(para);
}

async function predict(imgEl) {
    // Load the model
    net = await mobilenet.load();

    // Make prediction.
    const result = await net.classify(imgEl);
    showResults(result)
}

function showResults(predList) {
    const tableEl = document.getElementById('display').getElementsByTagName('tbody')[0];
    tableEl.innerHTML = "";

    for (let i = 0; i < predList.length; i++) {
        let row = tableEl.insertRow(i);
        let imgType = row.insertCell(0);
        let imgProb = row.insertCell(1);

        imgType.innerHTML = predList[i]['className'];
        imgProb.innerHTML = predList[i]['probability'];
    }
}

const filesElement = document.getElementById('file');
filesElement.addEventListener('change', evt => {
    let file = evt.target.files[0];
    // Display thumbnails and make call to predict image
    if (!file.type.match('image.*')) {
        alert
    };

    let reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = e => {
        // Fill the image & call predict.
        let img = document.getElementById('img');
        img.src = e.target.result;
        img.width = IMAGE_SIZE;
        img.height = IMAGE_SIZE;
        img.onload = () => predict(img);
    }
    // Read in the image file as a data URL.
    reader.readAsDataURL(file);

});