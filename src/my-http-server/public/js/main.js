async function addUser() {
    const name = document.getElementById("userName")?.value;
    const email = document.getElementById("userEmail")?.value;

    if (!name || !email) {
        showMessage("Заполните все поля", "error");
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
            showMessage("Пользователь добавлен!", "success");
            refreshUsers();
            document.getElementById("userName").value = "";
            document.getElementById("userEmail").value = "";
        } else {
            showMessage(result.error, "error");
        }
    } catch (err) {
        showMessage("Ошибка соединения", "error");
    }
}

async function deleteUser(id) {
    if (!confirm("Удалить пользователя?")) return;

    try {
        const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
        const result = await response.json();

        if (result.success) {
            showMessage("Пользователь удалён", "success");
            refreshUsers();
        } else {
            showMessage(result.error, "error");
        }
    } catch (err) {
        showMessage("Ошибка при удалении", "error");
    }
}

async function refreshUsers() {
    try {
        const response = await fetch("/api/users?format=json");
        const data = await response.json();

        if (data.users) {
            renderUsers(data.users);
            const countSpan = document.getElementById("userCount");
            if (countSpan) countSpan.textContent = data.users.length;
        }
    } catch (err) {
        console.error("Ошибка обновления:", err);
        showMessage("Ошибка при обновлении", "error");
    }
}

function renderUsers(users) {
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
            <td>${user.createdAt ? new Date(user.createdAt).toLocaleString("ru-RU") : "—"}</td>
            <td><button class="btn-delete" onclick="deleteUser(${user.id})">Удалить</button></td>
        </tr>
    `,
        )
        .join("");
}

function showMessage(message, type) {
    const messageDiv = document.getElementById("addUserMessage");
    if (!messageDiv) return;

    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;

    setTimeout(() => {
        messageDiv.textContent = "";
        messageDiv.className = "form-message";
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
        showMessage("Спасибо! Сообщение отправлено.", "success");
        form.reset();
        setTimeout(() => {
            if (messageDiv) messageDiv.innerHTML = "";
        }, 3000);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
    const addUserForm = document.getElementById("addUserForm");
    if (addUserForm) {
        addUserForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            await addUser();
        });
    }
});
