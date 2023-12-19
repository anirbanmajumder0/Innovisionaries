var bdy=document.querySelector("body");
var srch= document.getElementById("search");

var inpt=document.getElementById("inpt");
console.log(inpt.value);

var listContainer=document.getElementById("listConatiner");

var list1=document.getElementById("list1");
var list2=document.getElementById("list2");

var mrchntId=["10001","100002","10003"]; // All these merchnats provide services at all the pincodes mentioned below
var pincodes=["700015","70001","700020","70023"] 
// So if user enters any of these ^ pincodes all merchant's id will be appended
let i=0,j=0;
srch.addEventListener("click",function(){
    let  count=0;
// CHECKING IF USER ENTERED A PIN
    if(inpt.value==="")
    {
        alert("Enter a Valid PIN");
    }
    else{
        
    listContainer.className="flex border-2 p-2 border-slate-900 gap-1 w-1/2  "
    for(i=0;i<pincodes.length;i++){
    // checking if merchants provide service in at the entered pincode
       
    if(inpt.value===pincodes[i])
        {
            var li1= document.createElement("li");
            var liValue= document.createTextNode(inpt.value);
            li1.appendChild(liValue);
            li1.className="p-2 border-2 border-t-0 w-full border-black"
            list1.appendChild(li1);
            li1.style.height="126px";

            // APPENDING MERCHANT'S ID

            for(j=0;j<mrchntId.length;j++)
            {
            var li2= document.createElement("li");
            var li2Value= document.createTextNode(mrchntId[j]);
            li2.appendChild(li2Value);
            li2.className="p-2 border-2 border-t-0 w-full border-black "
            list2.appendChild(li2);
            }
    
        }
       else {
        count++;
        }
    }  
}
if(count==pincodes.length)
{
    
    var li1= document.createElement("li");
    var liValue= document.createTextNode(inpt.value);
    li1.appendChild(liValue);
    li1.className="p-2 border-2 border-t-0  w-full border-black "
    list1.appendChild(li1);
    li1.style.height="42px";
    // APPENDING MERCHANT'S ID
    
    var li2= document.createElement("li");
    var li2Value= document.createTextNode("No service");
    li2.appendChild(li2Value);
    li2.className="p-2 border-2 border-t-0  w-full border-black "
    list2.appendChild(li2);

}
});















































































// var table=document.getElementById("tabular");
// console.log(table.innerText);
// var tableBody=document.getElementById("tbdy");
// // console.log(tableBody.va);
// var tr= document.createElement("tr");
// var td= document.createElement("td");
// var tdValue= document.createTextNode(inpt.value);
// td.appendChild(tdValue);
// tr.appendChild(td);
// document.appendChild(tr);


// srch.addEventListener("click",function(){
//     bdy.style.backgroundColor="Green";
//     console.log(inpt.value);
//     console.log(tdValue);
//     console.log(table.innerText);
//     // console.log(inpt.value);
// })

// srch.addEventListener("click", function () {
//     bdy.style.backgroundColor = "Green";
//     console.log(inpt.value);
//     console.log(td.textContent); // Access text content of the td element
//     console.log(table.innerText);
//     tableBody.appendChild(tr); // Append the row to the table body
// });