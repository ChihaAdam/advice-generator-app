const btn = document.getElementById("btn");
const advice = document.getElementById("advice");
const adviceID=document.getElementById("adviceID");
const label=document.getElementById("adviceIDLabel");
let loadingInterval; 
let timeout;


const adviceFetch = async () => {
    try {
        let i=0;
        let points="";
        btn.disabled=true;
        adviceID.textContent="";
        label.textContent="";
        advice.style.color="hsl(193, 38%, 86%)";
        advice.style.textShadow="none";
        loadingInterval=setInterval(()=>{
            points= ".".repeat(i);
            advice.textContent=`Loading ${points}`;
            i=(i+1)%4;
        },300);
        timeout=setTimeout(()=>{
            throw new Error("Request timeout");
        },20000)
        const response=await fetch(`https://api.adviceslip.com/advice?t=${Date.now()}`);
        const data=await response.json();
        const adviceBody=data.slip;
        clearInterval(loadingInterval);
        advice.textContent=adviceBody.advice;
        adviceID.textContent=`#${adviceBody.id}`;
        label.textContent="ADVICE";
    }
    catch(error){
        const message = error.message.includes("timeout") 
                        ? "Request timed out - check connection" 
                        : "Failed to get advice";
        clearInterval(loadingInterval);
        advice.textContent = message;
        console.error("API Error:", error);
        advice.style.color="red";
        advice.style.textShadow="0px 0px 0px 2px white "
    }
    finally{
        btn.disabled = false;
        clearTimeout(timeout);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const divider = document.getElementById("divider");

    const updateImageSrc = () => {
        if (window.innerWidth < 500) {
            divider.src = "images/pattern-divider-mobile.svg";
        } else {
            divider.src = "images/pattern-divider-desktop.svg";
        }
    };

    updateImageSrc();
});

adviceFetch();
btn.addEventListener("click",adviceFetch);