var display = document.getElementById("display");
var jellyarr = [];
var cpc = 1;
var myCoin = 0;
var coinUI = document.getElementById("coin");
var cps = 0;

function createJelly(className){
    var newJelly = document.createElement("div");
    newJelly.classList.add("jelly");
    newJelly.classList.add(className);
    display.appendChild(newJelly);
    jellyarr.push(className);
    newJelly.addEventListener('click', earnCoin);
}

function earnCoin(){
    myCoin += cpc;
    coinUI.innerHTML = myCoin;
    this.animate(
        [
            {transform: 'scale(1.1)'},
            {transform: 'scale(1)'}
        ],{
            fill: 'forwards',
            easing: 'ease',
            duration: 500
        }
    );
}

function cpcItem(price, cpcnum){
    if(myCoin < price) return;
    myCoin -= price;
    cpc = cpcnum;
    coinUI.innerHTML = myCoin;
}

function cpsItem(price, cpsnum){
    if(myCoin < price) return;
    myCoin -= price;
    cps = cpsnum;
    coinUI.innerHTML = myCoin;
}
var coinpersec = setInterval(() => {
    myCoin += cps;
    coinUI.innerHTML = myCoin;
}, 1000);
function square(){
    if(jellyarr.length >= 8) return;
    if(myCoin < 5000) return;
    myCoin -= 5000;
    cpc = cpc * 2;
    cps = cps * 2;
    coinUI.innerHTML = myCoin;
    createJelly('squ');
}

function circle(){
    if(jellyarr.length >= 8) return;
    if(myCoin < 10000) return;
    myCoin -= 10000;

    clearInterval(coinpersec);
    coinpersec = setInterval(() => {
        myCoin += cps;
        coinUI.innerHTML = myCoin
    }, 500);

    coinUI.innerHTML = myCoin;
    createJelly('cir');
}

function triangle(){
    if(jellyarr.length >= 8) return;
    if(myCoin < 90000) return;
    myCoin -= 90000;
    myCoin = myCoin * 3;
    coinUI.innerHTML = myCoin;
    createJelly('tri');
}
function loadData(){
    if(localStorage.getItem("myCoin") != null){
        myCoin = localStorage.getItem("myCoin");
        myCoin = myCoin * 1;
        cpc = localStorage.getItem("cpc");
        cpc = cpc * 1;
        cps = localStorage.getItem("cps");
        cps = cps * 1;
        ja = JSON.parse(localStorage.getItem("jellyStorage"));
        for(var i = 0; i < ja.length; i++){
            createJelly(ja[i]);
        }
    }else{
        createJelly('squ');
    }
    
}
function saveData(){
    localStorage.setItem("myCoin", myCoin);
    localStorage.setItem("cpc", cpc);
    localStorage.setItem("cps", cps);
    localStorage.setItem("jellyStorage", JSON.stringify(jellyarr));
}

loadData();











