async function deleteHandler(event){
    event.preventDefault();
    const deleteBtn = document.querySelector('#delete-btn');
    if (!confirm('Are you sure you want to delete this post?')){
        return; 
    }
    const response = await fetch(`/api/posts/${deleteBtn.getAttribute("data-post-id")}`, {
        method: 'delete'
    });
    if (response.ok){
        document.location.replace('/dashboard');
    } else {
        alert('Unable to delete post');
    }
}

document.querySelector('#delete-btn').addEventListener('click', deleteHandler);