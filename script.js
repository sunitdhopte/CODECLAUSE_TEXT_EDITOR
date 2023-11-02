let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSize = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let alignButtons = document.querySelectorAll(".align");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let fontSizeRef = document.getElementById("fontSize");

//List of fontStyle

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Segoe Script",
    "Calibri",
]


// Intitial Settings

const initializer = () =>{
    // function calls for highlighting buttons
    // No highlights for linkButton, unlink, list, undo,redo since they are one time operations
    highlighter(alignButtons,true);
    highlighter(formatButtons,false);
    highlighter(scriptButtons,true);
};

// highlighter clicked button

const highlighter = (className,needsRemoval) =>{
    className.forEach((button) => {
        button.addEventListener("click",() => {
            // needsRemoval = true means only one button sholud be highlight and other would be normal
            if(needsRemoval){
                let alreadyActive = false;

                // if currently clicked button is already active
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }

                // Removal highlight from other buttons
                highlighterRemover(className);
                if(!alreadyActive){
                    // highlight clicked button
                    button.classList.add("active");
                }
            }
            else{
                // if other buttons can be highlighted
                button.classList.toggle("active"); 
            }
        });
    });
};

const highlighterRemover = (className) =>{
    className.forEach((button)=>{
        button.classList.remove("active");
    });
}

//create options for font names
fontList.map((value) => {
    let option = document.createElement('option');
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
})

//fontSize allows only till 7
for(let i = 1; i<= 7; i++){
    let option = document.createElement("option");
    option.value =  i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
}


// default size
    fontSizeRef.value = 3;


// main logic
const modifyText = (command,defaultUi,value) =>{
    // execCommand executes command on selected text
    document.execCommand(command, defaultUi,value);
};


// FOr basic operations which dont need value parameter

optionsButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        modifyText(button.id,false,null);
    });
});


// options that require value parameter
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", ()=> {
        modifyText(button.id, false, button.value);
    })});
