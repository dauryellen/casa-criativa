function onOff() {
  document
    .querySelector("#modal")
    .classList
    .toggle("hide")

  document
    .querySelector("body")
    .classList
    .toggle("hideScroll")

  document
    .querySelector("#modal")
    .classList
    .toggle("addScroll")
}

function checkFields(event) {
  const valuesToCheck = [
    "title",
    "category",
    "image",
    "description",
    "link",
  ];

  const isEmpty = valuesToCheck.find(function(value) {
    const checkIfIsString = typeof event.target[value].value === "string";
    const checkIfIsEmpty = !event.target[value].value.trim();

    if(checkIfIsString && checkIfIsEmpty) {
      return true;
    }
  });

  if(isEmpty) {
    event.preventDefault();

    alert("Por favor, preencha todos os campos.");
  }  
}

function delConfirm(id) {
  var res = confirm("Você deseja excluir esse registro?");

  if(res) {
    window.location=`/delete/${id}`;
  }
  alert("Registro excluido com sucesso!");
}