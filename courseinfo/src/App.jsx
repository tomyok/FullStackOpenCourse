/*
const Header = ({course}) => <h1>{course}</h1>
*/

const Header = (props) => {

  const {course} = props

  return (
    <div>
      <h1>{course.name}</h1>
      <Content name = {course.parts[0].name} exercises = {course.parts[0].exercises}/>
      <Content name = {course.parts[1].name} exercises = {course.parts[1].exercises}/>
      <Content name = {course.parts[2].name} exercises = {course.parts[2].exercises}/>
      <Total total = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  const {name} = props
  const {exercises} = props
  return (
    <p>
    {name} {exercises}
    </p>
  )
}

const Content = (props) => {
  const {name} = props
  const {exercises} = props
  

  return (
  <div>
    <Part name = {name} exercises = {exercises}/>
  </div>
  )
}

const Total = (props) => {

  return (
  <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = {
  name: 'Half Stack application development',
  parts: [
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]
  }

  return (
    <div>
      <Header course = {course}/>
    </div>
  )
}

export default App