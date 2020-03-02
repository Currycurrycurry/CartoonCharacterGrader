var model = undefined;
const classifierElement = document.getElementById('classifier');
const loaderElement = document.getElementById('loader');

async function initialize() {

    model = await tf.loadLayersModel('trained-model/model.json');
    classifierElement.style.display = 'block';
    loaderElement.style.display = 'none';

    document.getElementById('predict').addEventListener('click', () => predict());
}


async function predict () {

    const imageElement = document.getElementById('img');
    let tensorImg = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([128, 128]).toFloat().expandDims();
    //alert(tensorImg);
    prediction = await model.predict(tensorImg).data();
    for (let i = 0; i <prediction.length ; i++) {
        if(prediction[i]===1){
            rate(i);
        }
    }
}

function rate(i){
    document.getElementById("ratedNumber").innerText= " Score(10/10): "+i;
}

function changeImage() {
    var imageDisplay = document.getElementById('img');
    var uploadedImage = document.getElementById('my-file-selector').files[0];
    imageDisplay.src = URL.createObjectURL(uploadedImage);
}

initialize();