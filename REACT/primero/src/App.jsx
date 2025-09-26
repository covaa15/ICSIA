//import './App.css'

function App() {

  return (
    <>
    <div className ="container">
      <h1>Primero</h1>
      <p>Parrafo</p>
      <p>Otro Parrafo</p>

      <div className="mb-3">
        <label form="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
      </div>
      <div className="mb-3">
        <label form="exampleFormControlTextarea1" className="form-label">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button type="button" className="btn btn-primary">Button Primary</button>
      <button type="button" className="btn btn-danger">Button danger</button>
      </div>

    </>
  )
}

export default App