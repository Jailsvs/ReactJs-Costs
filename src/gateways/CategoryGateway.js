export function ListCategories(successCallback, errorCallback){
  fetch("http://localhost:5000/categories", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((resp) => resp.json())
          .then((data) => {
            console.log("get efetuado com sucesso...")
            if (successCallback)
              successCallback(data)
          })
          .catch((err) => console.log(err))     
}