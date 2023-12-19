const srch = document.getElementById("search");
const inpt = document.getElementById("inpt");
const listContainer = document.getElementById("listConatiner");
const list1 = document.getElementById("list1");
const list2 = document.getElementById("list2");
const pinRegex = /^[0-9]{6}$/;


function createListItem(value, parentList) {
    const li = document.createElement("li");
    const liValue = document.createTextNode(value);
    li.appendChild(liValue);
    li.className = "p-2 border-2 border-t-0 w-full border-black";
    parentList.appendChild(li);
    return li;
}

srch.addEventListener("click", function() {
    if(inpt.value === "" || !pinRegex.test(inpt.value)) {
        alert("Enter a Valid PIN");
        return;
    }

    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin: inpt.value }),
    })
    .then(response => response.json())
    .then(data => {
        listContainer.className = "flex border-2 p-2 border-slate-900 gap-1 w-1/2";

        const li1 = createListItem(inpt.value, list1);
        li1.style.height = data.merchantIds.length > 0 ? "126px" : "42px";

        if(data.merchantIds.length > 0) {
            data.merchantIds.forEach(id => createListItem(id, list2));
        } else {
            createListItem("No service", list2);
        }
    });
});
