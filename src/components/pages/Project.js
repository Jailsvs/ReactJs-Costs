import styles from './Project.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading'
import Container from '../layout/Container';

function Project(){

  const {id} = useParams()
  const [project, setProject] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const delayServer = 3000

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

  return (
    <>
    {project.name ? 
      (<div className={styles.projectDetails}>
        <Container customClass="column">
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
                  <p>detalhes projeto</p>
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