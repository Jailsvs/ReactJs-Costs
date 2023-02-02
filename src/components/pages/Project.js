import {parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading'
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project(){

  const {id} = useParams()
  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [msg, setMsg] = useState()
  const [type, setType] = useState()
  const [showServiceForm, setShowServiceForm] = useState(false)

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
            setServices(data.services)
          })
          .catch((err) => console.log(err))
    }, delayServer)
  }, [id])

  function toogleProjectForm () {
    setShowProjectForm(!showProjectForm)
  }

  function toogleServicetForm(){
    setShowServiceForm(!showServiceForm)
  }

  function createService(project){
    setMsg("")
    const lastService = project.services[project.services.length -1]
    lastService.id = uuidv4()
    const newCost = parseFloat(project.cost) + parseFloat(lastService.cost)
    if (newCost > parseFloat(project.budget)){
      setMsg("Orçamento ultrapassado, verifique o valor do serviço!")
      setType("error")
      project.services.pop()
      return false
    }

    project.cost = newCost
    fetch(`http://localhost:5000/projects/${project.id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project)
        }).then((resp) => resp.json())
          .then((data) => {
            setServices(data.services)
            setShowServiceForm(!showServiceForm)
            setMsg('Serviço adicionado!')
            setType('success')
          })
          .catch((err)=> console.log(err))
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

  function removeService(id, cost){
    const servicesUpdated = project.services.filter((service) => service.id !== id)
    const projectUpdated = project
    projectUpdated.services = servicesUpdated
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
    
    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
          .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMsg('Serviço removido com sucesso!')
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
          <div className={styles.serviceFormContainer}>
            <h2>Adicione um serviço:</h2>
            <button onClick={toogleServicetForm}
                    className={styles.btn}>
              {!showServiceForm ? "Adicionar serviço" : "Fechar"}
            </button>
            <div className={styles.projectInfo}>
              {showServiceForm && (
                <ServiceForm handleSubmit={createService}
                            textBtn="Adicionar Serviço"
                            projectData={project}/>
              )}
            </div>
          </div>
          <h2>Serviços</h2>
          <Container customClass="start">
            {services.length > 0 &&
              services.map((service) => 
                            (<ServiceCard 
                               id={service.id}
                               name={service.name}
                               cost={service.cost}
                               description={service.description}
                               key={service.id}
                               handleRemove={removeService} />))}    
            {services.length === 0 &&
             <p>Não há serviços cadastrados</p>}
          </Container>
        </Container>
      </div>)
    : (<Loading/>)}
    </>
  )
}

export default Project;