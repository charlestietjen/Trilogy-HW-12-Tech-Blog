async function editHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('textarea[name="post-body"]').value.trim();
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    console.log(JSON.stringify({
        title,
        text
    }));

    const response = await fetch(`/api/posts/${id}`, {
        method: 'put',
        body: JSON.stringify({
            title,
            text
        }),
        headers: {
            'Content-Type':'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/dashboard/');
    } else{
        alert('Failed to update post.');;
    }
}

document.querySelector('#edit-submit-btn').addEventListener('click', editHandler);