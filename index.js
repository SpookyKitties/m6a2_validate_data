var $2oYDO$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "getData", () => $3b026177ae61cbdd$export$7a171f172be0782e);

function $3b026177ae61cbdd$export$7a171f172be0782e() {
    (0, ($parcel$interopDefault($2oYDO$axios))).get("/api/bankAccounts/data").then((response)=>response).then((data)=>{
        alert(data?.num);
    // Get a reference to the table body element
    //   const tableBody = document.querySelector('#data-table tbody');
    //   // Clear the table body
    //   tableBody?.innerHTML = '';
    //   // Loop through the data and add rows to the table
    //   data.forEach(item => {
    //     const row = document.createElement('tr');
    //     const column1 = document.createElement('td');
    //     const column2 = document.createElement('td');
    //     const column3 = document.createElement('td');
    //     column1.textContent = item.column1;
    //     column2.textContent = item.column2;
    //     column3.textContent = item.column3;
    //     row.appendChild(column1);
    //     row.appendChild(column2);
    //     row.appendChild(column3);
    //     tableBody?.appendChild(row);
    //   });
    }).catch((error)=>console.error(error));
}


//# sourceMappingURL=index.js.map
