// Blog Management System using localStorage

// Initialize blog on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if admin mode (add ?admin=true to URL)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
        document.getElementById('adminPanel').style.display = 'block';
    }

    // Check if viewing a single post
    const postId = urlParams.get('post');
    if (postId) {
        showPost(postId);
    } else {
        showBlogList();
    }

    // Setup form handler
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', savePost);
    }

    // Update current year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Get all posts from localStorage
function getAllPosts() {
    const posts = localStorage.getItem('blogPosts');
    return posts ? JSON.parse(posts) : [];
}

// Save posts to localStorage
function saveAllPosts(posts) {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Show blog list
function showBlogList() {
    document.getElementById('blogList').style.display = 'block';
    document.getElementById('postView').style.display = 'none';
    
    const posts = getAllPosts();
    const blogList = document.getElementById('blogList');
    
    if (posts.length === 0) {
        blogList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <h3>No posts yet</h3>
                <p>Add your first post using the admin panel (add ?admin=true to URL)</p>
            </div>
        `;
        return;
    }

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    blogList.innerHTML = posts.map(post => `
        <div class="blog-post-card" onclick="showPost('${post.id}')">
            <div class="post-meta">
                <span class="post-date">${formatDate(post.date)}</span>
                ${post.tags && post.tags.length > 0 ? `
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
            <h2 class="post-title">${post.title}</h2>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="?post=${post.id}" class="read-more">Read more →</a>
        </div>
    `).join('');
}

// Show single post
function showPost(postId) {
    document.getElementById('blogList').style.display = 'none';
    document.getElementById('postView').style.display = 'block';
    
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        document.getElementById('postContent').innerHTML = `
            <div class="empty-state">
                <h3>Post not found</h3>
                <button class="btn btn-primary" onclick="showBlogList()">Back to Blog</button>
            </div>
        `;
        return;
    }

    const postContentDiv = document.getElementById('postContent');
    postContentDiv.innerHTML = `
        <div class="post-content-header">
            <h1 class="post-content-title">${post.title}</h1>
            <div class="post-content-meta">
                <span>${formatDate(post.date)}</span>
                ${post.tags && post.tags.length > 0 ? `
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
        <div class="post-content-body">
            ${renderMarkdown(post.content)}
        </div>
    `;
}

// Simple markdown renderer
function renderMarkdown(text) {
    if (!text) return '';
    
    let html = text;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
    
    return '<p>' + html + '</p>';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Toggle admin form
function toggleAdminForm() {
    const form = document.getElementById('postForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Cancel edit
function cancelEdit() {
    document.getElementById('postForm').reset();
    document.getElementById('postId').value = '';
    document.getElementById('postForm').style.display = 'none';
}

// Save post
function savePost(e) {
    e.preventDefault();
    
    const posts = getAllPosts();
    const postId = document.getElementById('postId').value;
    const title = document.getElementById('postTitle').value;
    const excerpt = document.getElementById('postExcerpt').value;
    const content = document.getElementById('postContent').value;
    const tags = document.getElementById('postTags').value.split(',').filter(t => t.trim());
    
    const post = {
        id: postId || Date.now().toString(),
        title,
        excerpt,
        content,
        tags,
        date: postId ? posts.find(p => p.id === postId).date : new Date().toISOString(),
        updated: new Date().toISOString()
    };
    
    if (postId) {
        // Update existing post
        const index = posts.findIndex(p => p.id === postId);
        if (index !== -1) {
            posts[index] = post;
        }
    } else {
        // Add new post
        posts.push(post);
    }
    
    saveAllPosts(posts);
    cancelEdit();
    showBlogList();
    
    alert('Post saved successfully!');
}

// Edit post (for admin)
function editPost(postId) {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    document.getElementById('postId').value = post.id;
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postExcerpt').value = post.excerpt;
    document.getElementById('postContent').value = post.content;
    document.getElementById('postTags').value = post.tags ? post.tags.join(', ') : '';
    
    document.getElementById('postForm').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'block';
    
    // Scroll to form
    document.getElementById('postForm').scrollIntoView({ behavior: 'smooth' });
}

// Delete post (for admin)
function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    const posts = getAllPosts();
    const filteredPosts = posts.filter(p => p.id !== postId);
    saveAllPosts(filteredPosts);
    showBlogList();
    alert('Post deleted successfully!');
}

