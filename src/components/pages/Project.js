import styles from './Project.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading'
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

function Project(){

  const {id} = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [msg, setMsg] = useState()
  const [type, setType] = useState()

  const delayServer = 300

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(resp => resp.json())
          .then(data => {
            setProject(data)
          })
          .catch((err) => console.log(err))
    }, delayServer)
  }, [id])

  function toogleProjectForm () {
    setShowProjectForm(!showProjectForm)
  }

  function editPost(project){
    setMsg("")
    if (project.budget < project.cost) {
      setMsg("O orçamento não pode ser inferior ao custo do projeto!")
      setType("error")
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project)
        }).then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMsg("Projeto atualizado!")
            setType("success")
          })
          .catch((err)=> console.log(err))
  }

  return (
    <>
    {project.name ? 
      (<div className={styles.projectDetails}>
        <Container customClass="column">
          {msg && <Message type={type} msg={msg}/>}
          <div className={styles.detailsContainer}>
            <h1>Projeto: {project.name}</h1>
            <button onClick={toogleProjectForm}
                    className={styles.btn}>
              {!showProjectForm ? "Editar projeto" : "Fechar"}
            </button>
            {!showProjectForm ? (
              <div className={styles.projectInfo}>
                <p>
                  <span>Categoria:</span> {project.category.name}
                </p>
                <p>
                  <span>Total Orçamento:</span> R${project.budget}
                </p>
                <p>
                  <span>Total Utilizado:</span> R${project.cost}
                </p>
              </div>) 
              : (
                <div className={styles.projectInfo}>
                  <ProjectForm handleSubmit={editPost}
                               btnText="Concluir Edição"
                               projectData={project}  />
                </div>) 
            }
          </div>
        </Container>
      </div>)
    : (<Loading/>)}
    </>
  )
}

export default Project;