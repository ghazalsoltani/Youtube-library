export default function Search() {
    // document.getElementById('videoForm').addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     const formData = new FormData(event.target);
    //     const username = formData.get('username');
    //     const video = {
    //         id: formData.get('videoId'),
    //         title: formData.get('videoTitle')
    //     };

    //     fetch(`http://localhost:3001/users/${username}/videos`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ video }),
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch(error => console.error('Error:', error));
    // });
    return (
        <>
            <form id="searchVideo">
                <input type="text" name="search" />
                <button>Search</button>
            </form>
            {/* <VideoSearch results={results} /> */}
        </>
    );
}