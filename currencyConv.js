
const Base_URL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const bnt= document.querySelector("button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg=document.querySelector("#msg");



const updateExchange=async()=>{
  
    let amount=document.querySelector(".amount input" );
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<0){
         amtVal=1;
         amount.value="1";
    }

    const Url=`${Base_URL}/${fromCurr.value.toLowerCase()}.json`; 
    //.value karna is imp karna pura syntax aa jati and Api works on lowercases only

    let response = await fetch(Url);   //promise return; return data in json format
    let data= await response.json();   //converts json format data into js objects
    //both fetch and json are asynchronous that's why await is used

    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];    //we are finding rate of exchange

    let finalAmt= rate* amtVal;

    msg.innerText= `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
                       //1         usd          =   finalans         inr

}

//coverting country list into individual options
//and adding them in select
for(let select of dropdowns){
     
    for(code in countryList){

        let newOption= document.createElement("option");
        newOption.innerText=code; 
        newOption.value=code;
        //for setting from : usd and to: inr 
        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && code==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);

    }
     
   //whenever our select changes-> we will call update flag
    select.addEventListener("change", (evt)=>{
         
        updateFlag(evt.target);
    });
    }

    const updateFlag=(element)=>{
           let currCode=element.value;   //extracting currency from element
           let countryCode= countryList[currCode];
           let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
           let img=element.parentElement.querySelector("img"); //select ke parent mai image hai, see ur html code
           img.src=newsrc;
    }

    window.addEventListener("load",()=>{
   
        updateExchange();
    });

bnt.addEventListener("click", (evt)=>{
    

    evt.preventDefault();   
    //It prevents the form from refreshing the page when the button is clicked,
    // allowing the conversion logic to execute and update the UI without reloading.

   updateExchange();
   
});

