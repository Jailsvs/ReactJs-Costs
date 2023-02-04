export function PostProject(project, successCallback, errorCallback){
  fetch("http://localhost:5000/projects", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project)
        }).then((resp) => resp.json())
          .then((data) => {
            console.log("post efetuado com sucesso...")
            if (successCallback)
              successCallback(data)
          })
          .catch((err)=> console.log(err))
}

export function UpdateProject(project, successCallback, errorCallback){
  fetch(`http://localhost:5000/projects/${project.id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project)
        }).then((resp) => resp.json())
          .then((data) => {
            console.log("patch efetuado com sucesso...")
            if (successCallback)
              successCallback(data)
          })
          .catch((err)=> console.log(err))
}

export function GetProject(id, successCallback, errorCallback){
  fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(resp => resp.json())
          .then(data => {
            console.log("get by id efetuado com sucesso...")
            if (successCallback)
              successCallback(data)
          })
          .catch((err) => console.log(err))
}

export function ListProjects(successCallback, errorCallback){
  fetch('http://localhost:5000/projects', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(data => {
      console.log("get efetuado com sucesso...")
      if (successCallback)
        successCallback(data)
    })
    .catch((err) => console.log(err))
}

export function RemoveProject(id, successCallback, errorCallback){
  fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(data => {
      console.log("delete efetuado com sucesso...")
      if (successCallback)
        successCallback(data)
    })
    .catch((err) => console.log(err))
}