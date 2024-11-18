document.addEventListener('DOMContentLoaded', function() {
    const userCount = document.querySelector('.user-management .card p');
    const notificationCount = document.querySelector('.statistics .card p');

    // Simulate dynamic data loading
    const stats = {
        totalUsers: 1200,
        activeUsers: 980,
        totalSales: 45600,
        recentActivities: [
            'User John Doe just registered.',
            'System update completed.',
            'Order #2345 has been processed.'
        ]
    };

    // Dynamically update the page with fetched data
    userCount.textContent = `${stats.activeUsers} active users`;
    notificationCount.textContent = `$${stats.totalSales} total sales`;

    const activitiesSection = document.querySelector('.recent-activities');
    stats.recentActivities.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.classList.add('card');
        activityCard.innerHTML = `<h3>Activity</h3><p>${activity}</p>`;
        activitiesSection.appendChild(activityCard);
    });
});
