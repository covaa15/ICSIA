function Dos() {
    return (
        <>
            <h1>Primera Pagina</h1>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>

           { <div className="card" style={{ width: "18rem" }}>
                <img src="https://media.istockphoto.com/id/1358464345/es/foto/yegua-y-potro.jpg?s=612x612&w=0&k=20&c=kA6e2xO-JGBVgSiwuewg8g-g72kshOJulwlMgqZc8i4=" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>}
        </>
    )
}
export default Dos