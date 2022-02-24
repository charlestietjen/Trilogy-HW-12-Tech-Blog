async function commentHandler(event) {
    event.preventDefault();

    const text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if  (text){
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                post_id,
                text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to post comment.');
        }
    }
}

document.querySelector('#comment-submit-btn').addEventListener('click', commentHandler);