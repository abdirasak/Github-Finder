const APIURL = 'https://api.github.com/users/'
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')





async function getUser(username){

    try {
        const res = await axios(APIURL + username)

        createUserCard(res.data)
        getRepos(username)
    } catch (error) {
       if (error.response.status == 404){
            createErrCard('No profile with this username')
       }
    }
}

async function getRepos(username){
    try {
        const res = await axios(APIURL + username + '/repos')
        
        addReposToCard(res.data)

    } catch (error) {
            //createErrCard('Could not fetch repos') 
    }
}

function createUserCard (user){

    const cardHTML = `
            <div class="card">
                    <img class="round" src="${user.avatar_url}" alt="${user.name}" />
                    <h3>${user.name}</h3>
                    <h4>${user.location}</h4>
                    <p>${user.bio}</p>
                    <a href="${user.html_url}" target="_blank" class="link">Read more</a>
                    <div class="skills">
                    <ul>
                        <li>${user.followers} <strong>Followers</strong></li>
                        <li>${user.following} <strong>Following</strong></li>
                        <li>${user.public_repos} <strong>Repos</strong></li>
                    </ul>
                    <div id="repos"> 
                    </div>
                    </div>
            </div>

    `
    main.innerHTML = cardHTML
}




function createErrCard (msg){

    const errCard = `
        <div class="card"> 

            <h1>${msg}</h1>
        
        </div>
    `
    main.innerHTML = errCard

}

function addReposToCard(repos){

    const reposElm = document.getElementById('repos')
    console.log(reposElm)
    repos 
        .slice(0, 5)
        .forEach(repo => {
            const repoElm = document.createElement('a')
            repoElm.classList.add('repo')
            repoElm.href = repo.html_url
            repoElm.target = '_blank'
            repoElm.innerText = repo.name

            reposElm.appendChild(repoElm)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if (user){
        getUser(user)

        search.value = ''
    }

})