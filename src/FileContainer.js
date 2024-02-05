function FileContainer() {
    let fileTitle = "File";
    let fileContent = `@book{key ,
        author = {L M Napster},
        title = {Mathematical Theory of Efficient Piracy},
        series = {Lecture Notes in Mathematics},
        volume = {3204},
        publisher = {Springer Verlag},
        address = {New York NY},
        year = {1998}
        }
        `;
        //Using <pre> to keep formatting. This is not a preferred way.
    return (
    <div id="file" className="container-fluid"> 
        <div className="row">
            <div className="file-container">
                <h2 className="file-title">{fileTitle}</h2>
                <div className="files"><pre>
                    <p>{fileContent}</p> 
                    
                </pre></div>
            </div>
        </div>
    </div>
    )
}

export default FileContainer;
