export default function Video(props) {
    //get id from props
    const id = props.id
    // Id from Json user file
    const idVideo = `https://www.youtube.com/embed/${id}`

    return (
        <>
            <iframe width="560" height="315" src={idVideo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </>
    )
}