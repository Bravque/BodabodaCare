// Sample JavaScript to dynamically change the welcome message and notification count
document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.querySelector('header h1');
    const notificationCount = document.querySelector('.card p'); // For notifications

    // Simulate fetching data dynamically
    const user = {
        name: 'Bravin Ojweke',
        lastLogin: '2 days ago',
        notifications: 5,
    };

    // Update the dashboard with dynamic data
    welcomeMessage.textContent = `Welcome back, ${user.name}!`;
    notificationCount.textContent = `You have ${user.notifications} new notifications.`;
});
