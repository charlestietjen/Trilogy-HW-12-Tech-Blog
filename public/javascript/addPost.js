async function addPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('textarea[name="post-body"]').value.trim();

    if (title && text) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                title,
                text 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            document.location.replace('/dashboard');
        } else {
            alert('Failed to add post.');
        }
    }
}

document.querySelector('#add-submit-btn').addEventListener('click', addPostHandler);