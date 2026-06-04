document.addEventListener("DOMContentLoaded", () => {
    // Targets the placeholder container inside your HTML files
    const sidebarContainer = document.getElementById("sidebar-container");
    
    if (!sidebarContainer) return; // Guard clause if the container isn't present

    const currentPath = window.location.pathname;
    const isMain = currentPath.includes("index.html") || currentPath.endsWith("/");
    const isRoutes = currentPath.includes("lpft_routes.html");
    const isPurchase = currentPath.includes("lpft_purchase.html");
    const isProfile = currentPath.includes("lpft_profile.html");

    // Injects the unified navigation layout globally across all active flight windows
    sidebarContainer.innerHTML = `
        <div>
            <div class="sidebar-brand-icon"><i class="fa-solid fa-plane"></i></div>
            <div class="nav-links">
                <a href="#" class="nav-item ${isMain ? 'active' : ''}" title="Dashboard Home" onclick="sidebarNavigate('index.html')">
                    <i class="fa-solid fa-chart-pie"></i>
                </a>
                <a href="#" class="nav-item ${isRoutes ? 'active' : ''}" title="Route Network" onclick="sidebarNavigate('lpft_routes.html')">
                    <i class="fa-solid fa-route"></i>
                </a>
                <a href="#" class="nav-item ${isPurchase ? 'active' : ''}" title="Buy Aircraft" onclick="sidebarNavigate('lpft_purchase.html')">
                    <i class="fa-solid fa-plane-up"></i>
                </a>
                <a href="#" class="nav-item ${isProfile ? 'active' : ''}" title="Pilot Profile" onclick="sidebarNavigate('lpft_profile.html')">
                    <i class="fa-solid fa-user"></i>
                </a>
            </div>
        </div>
        <div class="sidebar-footer" title="Log Out" onclick="sidebarLogout()">
            <i class="fa-solid fa-right-from-bracket"></i>
        </div>
    `;
});

function sidebarNavigate(targetHtml) {
    const raw = localStorage.getItem('lpf_airline_db');
    if (raw) {
        const db = JSON.parse(raw);
        window.location.href = `${targetHtml}?name=${encodeURIComponent(db.airlineName)}&icao=${encodeURIComponent(db.icao)}&hub=${encodeURIComponent(db.hub)}&mode=${encodeURIComponent(db.mode)}`;
    } else {
        window.location.href = targetHtml;
    }
}

function sidebarLogout() {
    if (confirm("Log out and clear session database?")) {
        localStorage.removeItem('lpf_airline_db');
        window.location.href = 'lpft_onboard.html';
    }
}
