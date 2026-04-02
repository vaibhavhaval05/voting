let current = 0;
let slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    updateSlideCounter();
}

function nextSlide() {
    showSlide(current + 1);
}

function prevSlide() {
    showSlide(current - 1);
}

function updateSlideCounter() {
    // Optional: Add slide counter display
    console.log(`Slide ${current + 1} of ${slides.length}`);
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        nextSlide();
    } else if (event.key === 'ArrowLeft') {
        prevSlide();
    } else if (event.key === 'Home') {
        showSlide(0);
    } else if (event.key === 'End') {
        showSlide(slides.length - 1);
    }
});

// Touch/swipe support for mobile
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    if (!startX || !startY) return;

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;

    // Check if it's a horizontal swipe (more horizontal than vertical)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            nextSlide(); // Swipe left
        } else {
            prevSlide(); // Swipe right
        }
    }

    startX = 0;
    startY = 0;
});

// Initialize first slide
if (slides.length > 0) {
    slides[0].classList.add('active');
}
updateSlideCounter();

// Add Enter navigation in keyboard handling
// (ensure this does not overwrite earlier settings)

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        nextSlide();
    }
});

// Chart rendering
function renderCharts() {
    const barCtx = document.getElementById('votesBarChart');
    const pieCtx = document.getElementById('attendancePieChart');
    if (barCtx && pieCtx && window.Chart) {
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Candidate A', 'Candidate B', 'Candidate C', 'Candidate D'],
                datasets: [{
                    label: 'Votes',
                    data: [250, 180, 210, 160],
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#22c55e', '#f97316'],
                    borderColor: ['#1d4ed8', '#6d28d9', '#16a34a', '#c2410c'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { color: '#cbd5e1' } },
                    title: { display: true, text: 'Candidate Votes', color: '#f8fafc', font: { size: 16 } }
                },
                scales: {
                    x: { ticks: { color: '#e2e8f0' } },
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#e2e8f0' },
                        grid: { color: 'rgba(148, 163, 184, 0.3)' }
                    }
                }
            }
        });

        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Voted', 'Not Voted', 'Abstained'],
                datasets: [{
                    data: [70, 20, 10],
                    backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
                    borderColor: '#0f172a',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#cbd5e1' } },
                    title: { display: true, text: 'Voter Activity', color: '#f8fafc', font: { size: 16 } }
                }
            }
        });
    }
}

// Render charts after content is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCharts);
} else {
    renderCharts();
}
