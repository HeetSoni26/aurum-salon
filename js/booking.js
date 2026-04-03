/* ===== AURUM — Booking System ===== */

let bookingStep = 1;
let selectedServices = [];
let selectedArtist = null;
let selectedDate = null;
let selectedTime = null;
let calMonth, calYear;

const ARTISTS = [
    { name: 'Sophia Laurent', role: 'Creative Director' },
    { name: 'Alessandro Rossi', role: 'Senior Stylist' },
    { name: 'Maya Chen', role: 'Skin & Spa Lead' },
    { name: 'Elena Vasquez', role: 'Makeup Director' },
    { name: 'Any Available', role: 'First available artist' }
];

// Generate some random booked slots per day
function getBookedSlots(dateStr) {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    const booked = [];
    const count = Math.abs(hash) % 5 + 1;
    for (let i = 0; i < count; i++) {
        booked.push(Math.abs((hash * (i + 1))) % 20);
    }
    return booked;
}

function openBooking() {
    bookingStep = 1;
    selectedServices = [];
    selectedArtist = null;
    selectedDate = null;
    selectedTime = null;
    const now = new Date();
    calMonth = now.getMonth();
    calYear = now.getFullYear();

    updateBookingUI();
    renderBookingTabs();
    renderBookingServices('hair');
    renderArtists();
    document.getElementById('bookingModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBooking() {
    document.getElementById('bookingModal').classList.remove('active');
    document.body.style.overflow = '';
}

function bookingNav(dir) {
    if (dir === 1 && !validateStep()) return;
    if (bookingStep === 5 && dir === 1) { confirmBooking(); return; }
    bookingStep += dir;
    bookingStep = Math.max(1, Math.min(5, bookingStep));
    if (bookingStep === 3) renderCalendar();
    if (bookingStep === 4) renderTimeSlots();
    updateBookingUI();
}

function validateStep() {
    if (bookingStep === 1 && selectedServices.length === 0) { showToast('Please select at least one service'); return false; }
    if (bookingStep === 2 && !selectedArtist) { showToast('Please choose an artist'); return false; }
    if (bookingStep === 3 && !selectedDate) { showToast('Please select a date'); return false; }
    if (bookingStep === 4 && !selectedTime) { showToast('Please select a time slot'); return false; }
    if (bookingStep === 5) {
        const n = document.getElementById('bName').value.trim();
        const p = document.getElementById('bPhone').value.trim();
        const e = document.getElementById('bEmail').value.trim();
        if (!n || !p || !e) { showToast('Please fill in all required fields'); return false; }
    }
    return true;
}

function updateBookingUI() {
    // Steps
    document.querySelectorAll('.booking-steps .step').forEach(s => {
        const si = +s.dataset.step;
        s.classList.toggle('active', si === bookingStep);
        s.classList.toggle('done', si < bookingStep);
    });
    // Panels
    for (let i = 1; i <= 5; i++) {
        const panel = document.getElementById('bStep' + i);
        if (panel) panel.classList.toggle('active', i === bookingStep);
    }
    document.getElementById('bStepConfirm').style.display = 'none';
    // Buttons
    document.getElementById('btnPrev').style.display = bookingStep > 1 ? '' : 'none';
    document.getElementById('btnNext').textContent = bookingStep === 5 ? 'Confirm Booking' : 'Next';
    document.getElementById('modalFooter').style.display = '';
}

// ---- Booking Service Selection ----
function renderBookingTabs() {
    const c = document.getElementById('bookingTabs');
    c.innerHTML = Object.keys(TAB_LABELS).map((k, i) =>
        `<button class="booking-tab${i === 0 ? ' active' : ''}" data-tab="${k}" onclick="bookingTabClick(this,'${k}')">${TAB_LABELS[k]}</button>`
    ).join('');
}

function bookingTabClick(btn, cat) {
    document.querySelectorAll('.booking-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderBookingServices(cat);
}

function renderBookingServices(cat) {
    const c = document.getElementById('bookingServices');
    const items = SERVICES[cat] || [];
    c.innerHTML = items.map(s => {
        const sel = selectedServices.find(x => x.name === s.name && x.cat === cat);
        return `<div class="booking-service-item${sel ? ' selected' : ''}" onclick="toggleService(this, '${s.name}', ${s.price}, '${cat}', '${s.duration}')">
            <div class="check">${sel ? '✓' : ''}</div>
            <div class="booking-service-info"><div class="name">${s.name}</div><div class="meta">${s.duration}</div></div>
            <div class="booking-service-price">$${s.price}</div>
        </div>`;
    }).join('');
    updateCart();
}

function toggleService(el, name, price, cat, duration) {
    const idx = selectedServices.findIndex(x => x.name === name && x.cat === cat);
    if (idx > -1) { selectedServices.splice(idx, 1); el.classList.remove('selected'); el.querySelector('.check').textContent = ''; }
    else { selectedServices.push({ name, price, cat, duration }); el.classList.add('selected'); el.querySelector('.check').textContent = '✓'; }
    updateCart();
}

function updateCart() {
    const total = selectedServices.reduce((s, x) => s + x.price, 0);
    document.getElementById('cartSummary').innerHTML =
        `<span>Selected: ${selectedServices.length} service${selectedServices.length !== 1 ? 's' : ''}</span><span class="cart-total">$${total}</span>`;
}

// ---- Artist Selection ----
function renderArtists() {
    const c = document.getElementById('artistGrid');
    c.innerHTML = ARTISTS.map(a =>
        `<div class="artist-option" onclick="selectArtist(this, '${a.name}')"><h4>${a.name}</h4><span>${a.role}</span></div>`
    ).join('');
}

function selectArtist(el, name) {
    document.querySelectorAll('.artist-option').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    selectedArtist = name;
}

// ---- Calendar ----
function renderCalendar() {
    const today = new Date();
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    let html = `<div class="cal-header">
        <button class="cal-nav" onclick="calNav(-1)">‹</button>
        <h4>${monthNames[calMonth]} ${calYear}</h4>
        <button class="cal-nav" onclick="calNav(1)">›</button>
    </div><div class="cal-days">`;
    ['SU','MO','TU','WE','TH','FR','SA'].forEach(d => html += `<div class="cal-day-name">${d}</div>`);

    for (let i = 0; i < firstDay; i++) html += '<div class="cal-day empty"></div>';
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(calYear, calMonth, d);
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isSunday = date.getDay() === 0;
        const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
        const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const isSelected = selectedDate === dateStr;
        let cls = 'cal-day';
        if (isPast || isSunday) cls += ' disabled';
        if (isToday) cls += ' today';
        if (isSelected) cls += ' selected';
        const onclick = (isPast || isSunday) ? '' : `onclick="selectDate('${dateStr}', this)"`;
        html += `<div class="${cls}" ${onclick}>${d}</div>`;
    }
    html += '</div>';
    document.getElementById('calendar').innerHTML = html;
}

function calNav(dir) {
    calMonth += dir;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
}

function selectDate(dateStr, el) {
    selectedDate = dateStr;
    document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
    el.classList.add('selected');
}

// ---- Time Slots ----
function renderTimeSlots() {
    const slots = [];
    for (let h = 10; h <= 19; h++) {
        slots.push(`${h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`);
        slots.push(`${h > 12 ? h - 12 : h}:30 ${h >= 12 ? 'PM' : 'AM'}`);
    }
    const booked = getBookedSlots(selectedDate || '');
    document.getElementById('timeSlots').innerHTML = slots.map((s, i) => {
        const isBooked = booked.includes(i);
        const isSelected = selectedTime === s;
        let cls = 'time-slot';
        if (isBooked) cls += ' booked';
        if (isSelected) cls += ' selected';
        return `<div class="${cls}" ${isBooked ? '' : `onclick="selectTime('${s}', this)"`}>${s}</div>`;
    }).join('');
}

function selectTime(time, el) {
    selectedTime = time;
    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
    el.classList.add('selected');
}

// ---- Confirm Booking ----
function confirmBooking() {
    if (!validateStep()) return;
    const name = document.getElementById('bName').value.trim();
    const phone = document.getElementById('bPhone').value.trim();
    const email = document.getElementById('bEmail').value.trim();
    const notes = document.getElementById('bNotes').value.trim();
    const total = selectedServices.reduce((s, x) => s + x.price, 0);

    const booking = {
        id: Date.now(),
        name, phone, email, notes,
        services: selectedServices.map(s => s.name),
        serviceDetails: [...selectedServices],
        artist: selectedArtist,
        date: selectedDate,
        time: selectedTime,
        total,
        createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('aurum_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('aurum_bookings', JSON.stringify(bookings));

    // Show confirmation
    for (let i = 1; i <= 5; i++) {
        const p = document.getElementById('bStep' + i);
        if (p) p.classList.remove('active');
    }
    const confirm = document.getElementById('bStepConfirm');
    confirm.style.display = 'block';

    const dateObj = new Date(selectedDate + 'T00:00:00');
    const dateFormatted = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    document.getElementById('confirmDetails').innerHTML = `
        <p><strong>Client:</strong> ${name}</p>
        <p><strong>Services:</strong> ${selectedServices.map(s => s.name).join(', ')}</p>
        <p><strong>Artist:</strong> ${selectedArtist}</p>
        <p><strong>Date:</strong> ${dateFormatted}</p>
        <p><strong>Time:</strong> ${selectedTime}</p>
        <p><strong>Total:</strong> <span class="gold">$${total}</span></p>
    `;
    document.getElementById('modalFooter').style.display = 'none';
    document.querySelectorAll('.booking-steps .step').forEach(s => s.classList.add('done'));

    updateBadge();
    scheduleReminder(booking);
    showToast('✨ Booking confirmed! See you at AURUM.');

    // Reset form fields
    document.getElementById('bName').value = '';
    document.getElementById('bPhone').value = '';
    document.getElementById('bEmail').value = '';
    document.getElementById('bNotes').value = '';
}

// ---- Appointments Panel ----
function toggleAppointments() {
    document.getElementById('appointmentsPanel').classList.toggle('open');
    renderAppointments();
}

function renderAppointments() {
    const bookings = JSON.parse(localStorage.getItem('aurum_bookings') || '[]');
    const c = document.getElementById('appointmentsList');
    if (bookings.length === 0) {
        c.innerHTML = '<div class="no-appts">No appointments yet.<br>Book your first experience!</div>';
        return;
    }
    c.innerHTML = bookings.sort((a, b) => new Date(b.date) - new Date(a.date)).map(b => {
        const d = new Date(b.date + 'T00:00:00');
        const ds = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        return `<div class="appt-card">
            <div class="appt-date">${ds} at ${b.time}</div>
            <div class="appt-services">${b.services.join(', ')}</div>
            <div>Artist: ${b.artist}</div>
            <div class="appt-total">$${b.total}</div>
            <button class="appt-cancel" onclick="cancelBooking(${b.id})">Cancel</button>
        </div>`;
    }).join('');
}

function cancelBooking(id) {
    let bookings = JSON.parse(localStorage.getItem('aurum_bookings') || '[]');
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem('aurum_bookings', JSON.stringify(bookings));
    renderAppointments();
    updateBadge();
    showToast('Appointment cancelled.');
}

function updateBadge() {
    const bookings = JSON.parse(localStorage.getItem('aurum_bookings') || '[]');
    const badge = document.getElementById('apptBadge');
    if (bookings.length > 0) { badge.style.display = 'flex'; badge.textContent = bookings.length; }
    else { badge.style.display = 'none'; }
}

// Init badge on load
document.addEventListener('DOMContentLoaded', () => {
    updateBadge();
    const phoneInput = document.getElementById('bPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
});
