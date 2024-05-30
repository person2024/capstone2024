function Post() {
    var title = document.getElementById("posttitle").value;
    var content = document.getElementById("postcontent").value;
    if (title && content) {
        var post = { title: title, content: content, comments: [] };
        var posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.push(post);
        localStorage.setItem("posts", JSON.stringify(posts)); // Corrected here
        displayPosts();
        document.getElementById("posttitle").value = "";
        document.getElementById("postcontent").value = "";
    } else {
        alert("제목과 내용을 입력해주세요");
    }
}

function displayPosts() {
    var posts = JSON.parse(localStorage.getItem("posts")) || [];
    var postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = ""; // Corrected here
    posts.forEach(function (post, index) {
        var postHTML = `
        <div class="post">
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <div id="comments-${index}"> <!-- Corrected here -->
        <h3>댓글</h3>
        ${displayComments(post.comments)} <!-- Corrected here -->
        </div>
        <input type="text" id="comment-${index}" placeholder="댓글내용">
        <button onclick="addComment(${index})">확인</button> <!-- Corrected here -->
        </div>
        `;
        postsDiv.innerHTML += postHTML;
    });
}

function displayComments(comments) { // Removed unnecessary parameter postIndex
    var commentsHTML = ""; // Removed unnecessary length
    comments.forEach(function (comment) {
        commentsHTML += `<p>${comment}</p>`; // Corrected here
    });
    return commentsHTML;
}

function addComment(postIndex) {
    var commentInput = document.getElementById(`comment-${postIndex}`);
    var comment = commentInput.value;
    if (comment) {
        var posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts[postIndex].comments.push(comment);
        localStorage.setItem("posts", JSON.stringify(posts));
        displayPosts();
        commentInput.value = "";
    } else {
        alert("댓글내용을 입력해주세요");
    }
}

displayPosts();
