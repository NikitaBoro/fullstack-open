const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) =>{
    const total = parts.reduce((sum,part) => {
        return sum + part.exercises
    },0)
    return(
        <p><b>total of {total} exercises</b></p>
    )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part=>
      <Part key={part.id} part={part} />
    )}   
  </>

const Course = ({course}) => {
  return(
    <>
    {course.map(c=>
      <div key={c.id}>
        <Header course={c.name} />
        <Content parts={c.parts} />
        <Total parts={c.parts} />
      </div>
    )}
    </>
  )
}

export default Course