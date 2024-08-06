function Card({imageUrl, title, imdbLink, year}) {
  return (
    <div className="card">
        <img src={imageUrl} alt={title} className="card-image"/>
        <div className="card-content">
            <h2 className="card-title">{title} ({year})</h2>
             <a href={imdbLink} target="_blank">View on IMDB</a>   
        </div>
    </div>
  )
}

export default Card
