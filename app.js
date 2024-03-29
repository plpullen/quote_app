function ranColorNum(){
    return Math.floor(Math.random()*255)
}

function toHex(x){
    let hexNum = parseInt(x).toString(16);
    hexNum = hexNum.length == 1 ? '0' + hexNum: hexNum;
    return hexNum
}

function ranTenNum(){
    return Math.floor(Math.random()*9)
}

const hexObj = {0:'f',1:'e',2:'d',3:'c',4:'b',5:'a',6:'9',7:'8',8:'7',9:'6',a:'5',b:'4',c:'3',d:'2',e:'1',f:'0'}
let invertedHex = '#'
function hexInverter(tempHex){
    for(let i = 0; i < tempHex.length; i++){
        let key = tempHex[i]
        invertedHex += hexObj[key]
    } return invertedHex
}

let w = window.innerWidth;
let h = window.innerHeight;
let bottomNum = document.getElementById('content').getBoundingClientRect().bottom
let quoteArr = []

//set quote text
let quote = document.getElementById("quote")
let author = document.getElementById("author")
let elementsArr = [quote, author]
const url = "https://api.quotable.io/random"

//-------------------------------------------------------------------------->function to refresh page on click
function refreshPage(){
    window.location.reload();
    } 

let getQuote = ()=>{
    fetch(url)
    .then(data => data.json())
    .then((item) =>{
        //set random bolded word
        quoteArr = item.content.split(' ')
        // let toBold = Math.floor(Math.random()*quoteArr.length)
        // quoteArr.splice(toBold,1, '<strong>quoteArr[toBold]</strong>')

    quote.innerText= quoteArr.join(' ')
    author.innerText = item.author
    })
    return quoteArr
}

window.addEventListener("load", getQuote)
document.getElementById('btn').addEventListener("click", refreshPage)





//set text color
let r = ranColorNum()
let g = ranColorNum()
let b = ranColorNum()
for(el of elementsArr){
    el.style.color = 'rgb(' + r +', ' + g +', '+ b +')'
}
// quote.style.color = 'rgb(' + r +', ' + g +', '+ b +')'
// author.style.color = 'rgb(' + r +', ' + g +', '+ b +')'

//set inverted stroke color with invertedHex -------applying a stroke color seems to eliminate the fontsizing and color
r = toHex(r)
g = toHex(g)
b = toHex(b)
tempHex = r+g+b
invertedHex = hexInverter(tempHex)
for(el of elementsArr){
    el.style.webkitTextStroke = `1px ${invertedHex}`;
}
// quote.style.webkitTextStroke = `1px ${invertedHex}`;
// author.style.webkitTextStroke = `1px ${invertedHex}`;


//set text size
let num = ranTenNum()
if(num < 2 || bottomNum < 0){
    num+=1
}
if(num>5){
    author.style.fontSize = "3rem"
}
if(quoteArr.length > 15 && num > 4){
    num = 4
}
// if(bottomNum < 0){
//     topNum-=((-bottomNum)/h)*100
// }
quote.style.fontSize = num + 'rem'



//set text position - THIS IS PROBLEMATIC - NOT EXACTLY DOING WHAT I NEED -----------------------------<

// if(num>3){
// let topNum = Number(ranTenNum() +'0')
// let leftNum = Number(ranTenNum() +'0')
// let rightNum = quote.getBoundingClientRect().right
// let quoteW = quote.getBoundingClientRect().width
// let quoteH = quote.getBoundingClientRect().height



// if(rightNum < 0){
//     leftNum=((-rightNum)/w)*100
// }

// if(quoteH > bottomNum){
//     topNum-=((quoteH-bottomNum)/h)*100
// }
// if(quoteW > rightNum){
//     leftNum-=((quoteW-rightNum)/w)*100
// }
//---------test for positioning the by the div
// document.getElementById('content').style.top = topNum + '%'
// document.getElementById('content').style.top = leftNum + '%'
// document.getElementById('content').style.height = (100-topNum) + 'vh'
// }


// for(el of elementsArr){
//     el.style.top = topNum + '%'
//     el.style.left = leftNum + '%'
// }


//select and set the background
let binary = ranTenNum()
if(binary<5){
//set background image
document.getElementsByTagName("body")[0].style.backgroundImage = `url(https://picsum.photos/${w}/${h}/?random&t=` + new Date().getTime() +")";
}else{
//or set background color
let x = toHex(ranColorNum())
let y = toHex(ranColorNum())
let z = toHex(ranColorNum())
document.body.style.backgroundColor = '#' + x + y + z;
}


//---------------------------------------track the button to the mouse
let btn = document.getElementById('btn');
const onMouseMove = (e) =>{
  btn.style.left = e.pageX - 50 + 'px';
  btn.style.top = e.pageY - 50 + 'px';
}
document.addEventListener('mousemove', onMouseMove);
