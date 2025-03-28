/*
const Header = ({course}) => <h1>{course}</h1>
*/

const Course = ({courses}) => {

  
  return (
    <div>
      {courses.map((course) => (
        <div key = {course.id}>
          <Header name = {course.name}/>
          <Content key = {course.id} course = {course}/>
        </div>
      ))}
    </div>
  )
}

const Header = ({name, id}) => {
  
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({course , id}) => {
  
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
  <div key = {id}>
    {course.parts.map((part) => (
    <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>
    ))}
    <Total total = {totalExercises}/> 
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

const Total = ({total}) => {

  return (
  <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses = {courses}/>
    </div>
  )
}

export default App