export const Course = ({courses}) => {

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
  
export const Header = ({name}) => {
    
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
export const Content = ({course , id}) => {
    
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
  
export const Part = ({name, exercises, id}) => {
  
    return (
      <p key = {id}>
      {name} {exercises}
      </p>
    )
  }
  
export const Total = ({total}) => {
  
    return (
    <p>Number of exercises {total}</p>
    )
  }