//active sections
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
        document.getElementById(targetId).classList.add('active');
    });
});

//api end point to fetch user data
document.addEventListener('DOMContentLoaded', () => {
    const userId = 1; // Replace with actual user ID
    
    // Fetch user data dynamically
    fetch(`http://localhost:${process.env.PORT}/api/user/${userId}`)
        .then(response => response.json())
        .then(data => updateDashboard(data))
        .catch(err => console.error('Error fetching user data:', err));

    function updateDashboard(data) {
        document.getElementById('user-name').textContent = data.name;
        document.getElementById('user-role').textContent = data.role;
        document.getElementById('welcome-message').textContent = `Welcome to BodaBodaCare, ${data.name}`;
        document.getElementById('coverage').textContent = `Coverage: ${data.coverage}`;
        document.getElementById('premium').textContent = `Premium: ${data.premium}`;
        document.getElementById('pending-claims').textContent = `Pending: ${data.pending_claims}`;
        document.getElementById('approved-claims').textContent = `Approved: ${data.approved_claims}`;
        document.getElementById('upcoming-appointments').textContent = `Upcoming: ${data.upcoming_appointments}`;
        document.getElementById('completed-appointments').textContent = `Completed: ${data.completed_appointments}`;
        document.getElementById('last-payment').textContent = `Last Payment: ${data.last_payment}`;
        document.getElementById('due-payment').textContent = `Due: ${data.due_payment}`;
    }
});