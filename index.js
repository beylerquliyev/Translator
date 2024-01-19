
let ulLanguage=document.querySelector("#ulLanguage")
let ulLanguage2=document.querySelector("#ulLanguage2")
let btn1=document.querySelector("#btn1")
let btn2=document.querySelector("#btn2")
let inptSearch=document.querySelector("#inptSearch")
let inptSearch2=document.querySelector("#inptSearch2")
let Translate=document.querySelector("#Translate")
let exampleFormControlTextarea1=document.querySelector("#exampleFormControlTextarea1")
let exampleFormControlTextarea2=document.querySelector("#exampleFormControlTextarea2")
let img=document.querySelector("#img")
let nulArr=[]
let code
let code2
async function GetData(){

    const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '879d4a12f7msh1c4bfd16f7f9a52p15b0a0jsnb7549da40228',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  
    let data=result.data.languages.map((item,index)=>{
        return `
      
                       <li><a  onclick= " NameL(this)"  data-info="${item.code}"   id="${index}" class="dropdown-item" href="#">${item.name}</a>
        `

    }).join("")
    let data2=result.data.languages.map((item,index)=>{
        return `
      
                       <li><a  onclick= " NameL2(this)"  data-info="${item.code}"  id="${index}" class="dropdown-item" href="#">${item.name}</a>
        `
    }).join("")
    ulLanguage.innerHTML=data
    ulLanguage2.innerHTML=data2
    nulArr=[...result.data.languages]
  
    inptSearch.addEventListener("input",()=>{
       
        let search1 =result.data.languages .filter((item) => {
           
            if(item.name.toLowerCase().includes(inptSearch.value.toLowerCase())){
                return item.name
            }         
         });
         ulLanguage.innerHTML=search1.map((item,index)=>{return `
         <li><a data-info="${item.code}" onclick= "NameL(this)"  id="${index}" class="dropdown-item" href="#">${item.name}</a>
`
         }).join("")
    })

    inptSearch2.addEventListener("input",()=>{
       
        let search2 = result.data.languages.filter((item) => {
            return item.name.toLowerCase().includes(inptSearch2.value.toLowerCase())
         });
         ulLanguage2.innerHTML=search2.map((item,index)=>{return `
      
         <li><a data-info="${item.code}"  onclick= " NameL2(this) "  id="${index}" class="dropdown-item" href="#">${item.name}</a>
`
         }).join("")
    })	
} catch (error) {
	console.error(error);
}

}
function NameL(element){
  
  btn1.innerHTML=element.textContent

  code=element.dataset.info
}

function NameL2(element){
  
    btn2.innerHTML=element.textContent
    code2=element.dataset.info
   
  }
  
GetData()
async function PostData(){
    const url = 'https://text-translator2.p.rapidapi.com/translate';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '879d4a12f7msh1c4bfd16f7f9a52p15b0a0jsnb7549da40228',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: new URLSearchParams({
		source_language: `${code}`,
		target_language: `${code2}`,
		text: `${exampleFormControlTextarea1.value}`
       
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    exampleFormControlTextarea2.value=result.data.translatedText
    img.style.display = 'none';
    Translate.style.paddingLeft = '0px';

    console.log(code);
    console.log(code2);
    console.log(result);
   
	
} catch (error) {
	console.error(error);
    img.style.display = 'none';
    Translate.style.paddingLeft = '0px';

}
}

Translate.addEventListener("click",()=>{
    Translate.style.paddingLeft = '130px';
    img.style.display = 'block';
    PostData()
})