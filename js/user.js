// Function to handle section navigation
function setupSectionNavigation() {
    document.querySelectorAll('.side-menu a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            // Remove active class from all menu items
            document.querySelectorAll('.side-menu a').forEach(item => item.classList.remove('active'));

            // Add active class to the clicked menu item
            link.classList.add('active');

            // Hide all sections
            document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));

            // Show the corresponding section
            const targetId = link.textContent.trim().toLowerCase() + '-section';
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            } else {
                console.error(`Section with ID ${targetId} not found.`);
            }
        });
    });
}

// Function to fetch user data from the API
async function fetchUserData(userId) {
    try {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/user/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        updateDashboard(data);
    } catch (err) {
        console.error('Error fetching user data:', err);
    }
}

// Function to update the dashboard with user data
function updateDashboard(data) {
    document.getElementById('user-name').textContent = data.name || 'N/A';
    document.getElementById('user-role').textContent = data.role || 'N/A';
    document.getElementById('welcome-message').textContent = `Welcome to BodaBodaCare, ${data.name || 'User '}`;
    document.getElementById('coverage').textContent = `Coverage: ${data.coverage || 'N/A'}`;
    document.getElementById('premium').textContent = `Premium: ${data.premium || 'N/A'}`;
    document.getElementById('pending-claims').textContent = `Pending: ${data.pending_claims || 0}`;
    document.getElementById('approved-claims').textContent = `Approved: ${data.approved_claims || 0}`;
    document.getElementById('upcoming-appointments').textContent = `Upcoming: ${data.upcoming_appointments || 0}`;
    document.getElementById('completed-appointments').textContent = `Completed: ${data.completed_appointments || 0}`;
    document.getElementById('last-payment').textContent = `Last Payment: ${data.last_payment || 'N/A'}`;
    document.getElementById('due-payment').textContent = `Due: ${data.due_payment || 'N/A'}`;
}

// Main function to initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    setupSectionNavigation();
    
    const userId = 1; // Replace with actual user ID
    fetchUserData(userId);
});