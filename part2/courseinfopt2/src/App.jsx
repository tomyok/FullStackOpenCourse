/*
const Header = ({course}) => <h1>{course}</h1>
*/

const Course = ({course}) => {

  return (
    <div>
      <Header name = {course.name}/>
      <Content course = {course}/>
    </div>
  )
}

const Header = ({name}) => {

  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Content = ({course}) => {
  
  return (
  <div>
    {course.parts.map((part) => (
    <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>
    ))}
  </div>
  )
}

const Part = ({name, exercises, id}) => {

  return (
    <p key = {id}>
    {name} {exercises}
    </p>
  )
}

const Total = (props) => {

  return (
  <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course = {course}/>
    </div>
  )
}

export default App