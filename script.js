document.addEventListener('DOMContentLoaded', function() {
    // Handle both FAQ and Blog expand/collapse
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        question.addEventListener('click', function() {
            let answer = this.nextElementSibling;
            let icon = this.querySelector('.expand-icon, .expand-icon-blog');
            
            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
                icon.style.transform = "rotate(180deg)";
            } else {
                answer.style.display = "none";
                icon.style.transform = "rotate(0deg)";
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const blogCards = document.querySelectorAll('.blog-card');
    const contentWrapper = document.querySelector('.blog-content-wrapper');
    const bullets = document.querySelectorAll('.blog-bullet');
    let currentBlog;

    blogCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const blogId = this.getAttribute('data-blog');
            const contentToShow = document.getElementById(blogId);
            
            // Reset all cards and bullets to inactive
            blogCards.forEach(c => c.classList.remove('active'));
            bullets.forEach(b => b.classList.remove('active'));
            
            if (currentBlog === blogId) {
                // If this blog is already open, close it
                contentWrapper.style.display = 'none';
                currentBlog = null;
            } else {
                // Show the new blog
                document.querySelectorAll('.blog-content').forEach(content => {
                    content.style.display = 'none';
                });

                if (contentToShow) {
                    contentToShow.style.display = 'block';
                    contentWrapper.style.display = 'block';
                    this.classList.add('active');
                    bullets[index].classList.add('active'); // Highlight corresponding bullet
                    currentBlog = blogId;
                    
                    // Scroll the clicked card to the center of the container
                    const container = document.querySelector('.blog-scroller');
                    const cardWidth = this.offsetWidth;
                    const containerWidth = container.offsetWidth;
                    const scrollLeft = this.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
                    container.scrollTo({
                        left: scrollLeft,
                        behavior: 'smooth'
                    });
                    
                    // Add close button if not already present
                    if (!contentWrapper.querySelector('.close-blog')) {
                        const closeButton = document.createElement('span');
                        closeButton.innerHTML = '×';
                        closeButton.className = 'close-blog';
                        closeButton.addEventListener('click', function() {
                            contentWrapper.style.display = 'none';
                            blogCards.forEach(c => c.classList.remove('active'));
                            bullets.forEach(b => b.classList.remove('active'));
                            currentBlog = null;
                        });
                        contentWrapper.appendChild(closeButton);
                    }
                }
            }
        });
    });
});