const baseUrl = "http://localhost:3000/Hotel";

const send = async () => {
  let res = await fetch(baseUrl);
  let data = await res.json();
  datashow(data);
};

const datashow = (data) => {
  const ab = document.querySelector("#show13");
  ab.innerHTML = "";

  data.forEach((e) => {
    ab.innerHTML += `
      <tr>
        <td>${e.Name}</td>
        <td>${e.Addhar}</td>
        <td>${e.Mobile}</td>
        <td>${e.Person}</td>
        <td>${e.Price * e.Person}</td>
        <td>${e.Address}</td>
        <td onclick="del1('${e.id}')">DELETE</td>
        <td onclick="final('${e.id}')">Update</td>
      </tr>
    `;
  });
};

const del1 = (id) => {
  fetch(`${baseUrl}/${id}`, { method: "DELETE" })
    .then(() => send());
};

const datasend = () => {
  const inpname = document.querySelector("#name").value;
  const inpaddhar = document.querySelector("#addhar").value;
  const inpmobile = document.querySelector("#mobile").value;
  const inmperson = document.querySelector("#person").value;
  const inpaddress = document.querySelector("#address").value;

  fetch(baseUrl, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      Name: inpname,
      Addhar: inpaddhar,
      Mobile: inpmobile,
      Person: inmperson,
      Price: 500,
      Address: inpaddress
    })
  }).then(() => {
    send();
    document.querySelector("form").reset();
  });

  return false;
};

const final = async (id) => {
  let res = await fetch(`${baseUrl}/${id}`);
  let getData = await res.json();

  const formdata = document.querySelector("#formData");

  formdata.innerHTML = `
    <h3>Update Entry</h3>
    <form>
      Enter Name: <input type="text" id="upname" value="${getData.Name}"><br>
      Enter Addhar: <input type="text" id="upaddhar" value="${getData.Addhar}"><br>
      Enter Mobile: <input type="text" id="upmobile" value="${getData.Mobile}"><br>
      Enter Person: <input type="number" id="upperson" value="${getData.Person}"><br>
      Enter Address: <input type="text" id="upaddress" value="${getData.Address}"><br>
      <input type="button" value="Update" onclick="Update1('${getData.id}')">
    </form>
  `;
};

const Update1 = (id) => {
  const inpname = document.querySelector("#upname").value;
  const inpaddhar = document.querySelector("#upaddhar").value;
  const inpmobile = document.querySelector("#upmobile").value;
  const inpperson = document.querySelector("#upperson").value;
  const inpaddress = document.querySelector("#upaddress").value;

  fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      Name: inpname,
      Addhar: inpaddhar,
      Mobile: inpmobile,
      Person: inpperson,
      Price: 500,
      Address: inpaddress
    })
  }).then(() => {
    send();
    document.querySelector("#formData").innerHTML = "";
  });
};

const search2 = async () => {
  const inp12 = document.querySelector("#search1").value.toLowerCase();
  const res = await fetch(baseUrl);
  const data1 = await res.json();

  const filterdata = data1.filter((e) =>
    e.Name.toLowerCase().includes(inp12) ||
    e.Person.toString().includes(inp12)
  );

  datashow(filterdata);
};
