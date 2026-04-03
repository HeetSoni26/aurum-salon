/* ===== AURUM — Reminder System ===== */

function scheduleReminder(booking) {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    const apptDate = new Date(booking.date + 'T00:00:00');
    const timeParts = booking.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (timeParts) {
        let h = parseInt(timeParts[1]);
        const m = parseInt(timeParts[2]);
        if (timeParts[3].toUpperCase() === 'PM' && h !== 12) h += 12;
        if (timeParts[3].toUpperCase() === 'AM' && h === 12) h = 0;
        apptDate.setHours(h, m, 0, 0);
    }

    const now = new Date();

    // 24-hour reminder
    const reminder24 = new Date(apptDate.getTime() - 24 * 60 * 60 * 1000);
    if (reminder24 > now) {
        const delay24 = reminder24.getTime() - now.getTime();
        setTimeout(() => sendNotification(booking, '24 hours'), delay24);
    }

    // 1-hour reminder
    const reminder1 = new Date(apptDate.getTime() - 60 * 60 * 1000);
    if (reminder1 > now) {
        const delay1 = reminder1.getTime() - now.getTime();
        setTimeout(() => sendNotification(booking, '1 hour'), delay1);
    }

    // Also store reminder timestamps
    const reminders = JSON.parse(localStorage.getItem('aurum_reminders') || '[]');
    reminders.push({
        bookingId: booking.id,
        apptTime: apptDate.toISOString(),
        reminder24: reminder24.toISOString(),
        reminder1: reminder1.toISOString()
    });
    localStorage.setItem('aurum_reminders', JSON.stringify(reminders));
}

function sendNotification(booking, timeframe) {
    const title = '✨ AURUM Salon Reminder';
    const body = `Your appointment is in ${timeframe}!\n${booking.services.join(', ')} with ${booking.artist} at ${booking.time}`;

    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: 'assets/hero.png',
            badge: 'assets/hero.png',
            tag: `aurum-${booking.id}-${timeframe}`
        });
    }

    // Also show in-page toast
    showToast(`⏰ Reminder: ${booking.services[0]} in ${timeframe}!`);
}

// Re-schedule reminders on page load for existing bookings
document.addEventListener('DOMContentLoaded', () => {
    if ('Notification' in window && Notification.permission === 'default') {
        // Will ask on first booking
    }

    const bookings = JSON.parse(localStorage.getItem('aurum_bookings') || '[]');
    const now = new Date();

    bookings.forEach(booking => {
        const apptDate = new Date(booking.date + 'T00:00:00');
        const timeParts = booking.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (timeParts) {
            let h = parseInt(timeParts[1]);
            const m = parseInt(timeParts[2]);
            if (timeParts[3].toUpperCase() === 'PM' && h !== 12) h += 12;
            if (timeParts[3].toUpperCase() === 'AM' && h === 12) h = 0;
            apptDate.setHours(h, m, 0, 0);
        }

        // Only schedule future reminders
        if (apptDate > now) {
            const reminder24 = new Date(apptDate.getTime() - 24 * 60 * 60 * 1000);
            const reminder1 = new Date(apptDate.getTime() - 60 * 60 * 1000);

            if (reminder24 > now) {
                setTimeout(() => sendNotification(booking, '24 hours'), reminder24.getTime() - now.getTime());
            }
            if (reminder1 > now) {
                setTimeout(() => sendNotification(booking, '1 hour'), reminder1.getTime() - now.getTime());
            }
        }
    });
});
