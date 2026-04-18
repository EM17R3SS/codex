async function addUser() {
    const name = document.getElementById("userName")?.value;
    const email = document.getElementById("userEmail")?.value;
    const messageDiv = document.getElementById("addUserMessage");

    if (!name || !email) {
        showMessage("Заполните все поля", "error", messageDiv);
        return;
    }

    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        });

        const result = await response.json();

        if (result.success) {
            showMessage("Пользователь добавлен!", "success", messageDiv);
            setTimeout(() => location.reload(), 1000);
        } else {
            showMessage(result.error, "error", messageDiv);
        }
    } catch (err) {
        showMessage("Ошибка соединения с сервером", "error", messageDiv);
    }
}

async function deleteUser(id) {
    if (!confirm("Удалить пользователя?")) return;

    try {
        const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
        const result = await response.json();

        if (result.success) {
            location.reload();
        } else {
            alert(result.error);
        }
    } catch (err) {
        alert("Ошибка при удалении");
    }
}

async function refreshUsers() {
    try {
        const response = await fetch("/api/users?format=json");
        const data = await response.json();

        if (data.users) {
            renderUsersTable(data.users);
            document.getElementById("userCount").textContent =
                data.users.length;
        }
    } catch (err) {
        console.error("Ошибка обновления:", err);
    }
}

function renderUsersTable(users) {
    const tbody = document.getElementById("usersBody");
    if (!tbody) return;

    if (!users || users.length === 0) {
        tbody.innerHTML =
            '<tr><td colspan="5" style="text-align:center;">Нет пользователей</td></tr>';
        return;
    }

    tbody.innerHTML = users
        .map(
            (user) => `
        <tr>
            <td>${user.id}</td>
            <td>${escapeHtml(user.name)}</td>
            <td>${escapeHtml(user.email)}</td>
            <td>${new Date(user.createdAt).toLocaleString("ru-RU")}</td>
            <td><button class="btn-delete" onclick="deleteUser(${user.id})">Удалить</button></td>
        </tr>
    `,
        )
        .join("");
}

function showMessage(text, type, container) {
    if (!container) return;
    container.textContent = text;
    container.className = `form-message ${type}`;
    setTimeout(() => {
        container.textContent = "";
        container.className = "form-message";
    }, 3000);
}

function escapeHtml(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function initContactForm() {
    const form = document.getElementById("feedbackForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const messageDiv = document.getElementById("formMessage");

        const formData = {
            name: document.getElementById("name")?.value,
            email: document.getElementById("email")?.value,
            message: document.getElementById("message")?.value,
        };

        showMessage("Спасибо! Сообщение отправлено.", "success", messageDiv);
        form.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
});
