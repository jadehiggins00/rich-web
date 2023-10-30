function searchUser() {
    const username = document.getElementById("usernameInput").value;
    const userEndpoint = `https://api.github.com/users/${username}`;

    fetch(userEndpoint)
        .then(response => response.json())
        .then(user => {
            document.getElementById("avatar").src = user.avatar_url;
            document.getElementById("name").textContent = user.name;
            document.getElementById("username").textContent = user.login;
            document.getElementById("email").textContent = user.email;
            document.getElementById("location").textContent = user.location;
            document.getElementById("gists").textContent = user.public_gists;


            return fetch(user.repos_url);
        })
        .then(response => response.json())
        .then(repos => {
            const reposContainer = document.getElementById("repos");
            reposContainer.innerHTML = "";

            repos.forEach(repo => {
                const repoDiv = document.createElement("div");
                repoDiv.classList.add("repo");
                repoDiv.innerHTML = `
                <table class="bordered-table">
                    <tr>
                        <td><strong>${repo.name}</strong></td>
                    </tr>
                    <tr>
                        <td>${repo.description}</td>
                    </tr>
                </table>
                `;
                reposContainer.appendChild(repoDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
}
