// const dotenv = require('dotenv')

// dotenv.config({ path: '../.env' })

document.addEventListener('DOMContentLoaded',() => {
    /** @type {HTMLInputElement} */
    const searchUser = document.querySelector('#searchUser')
    /** @type {HTMLDivElement} */
    const profile = document.querySelector('#profile')
    // /** @type {HTMLDivElement} */
    // const repos = document.querySelector('#repos')

    /**
     * Search user by username
     * @param {InputEvent} e
     */
    const search = (username) => {
        const url = `https://api.github.com/users/${username}`
        const credentials = {
            client_id: '',
            client_secret: '',
        }


        const headers = new Headers()
        headers.set('Authorization','token ' + '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')

        // Make request to GitHub
        fetch(url,{
            method: 'GET',
            // body: credentials
            // ,
            headers: headers
            // headers: {
            //     "Authorization": `token ${}`
            // }
        })
            .then(res => res.json())
            .then(user => {

                fetch(`${url}/repos`,{
                    method: 'GET',
                    // body: { created: 'asc',per_page: 5 },
                    headers: headers
                })
                    .then(res => res.json())
                    .then(reposData => {

                        /** @type {HTMLDivElement} */
                        const repos = document.querySelector('#repos')
                        repos.innerHTML += reposData.map(repo => {
                            console.log(repo);
                            return `
                             <div class="card">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                </div>
              </div>
            </div>
                            `
                        }).join('')
                    })

                console.log(user);
                console.log(user.public_gists);

                profile.innerHTML = `

           <div class="card border-primary mb-3" style="max-width: 100rem;">
          <div class="card-header"><h3>${user.name}</h3></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos" class="mb-5"></div>
                `
            }).catch(err => console.error(err))
    }

    // searchUser.addEventListener('keyup',(e) => {
    //     search(e.target.value)
    // })

    document.querySelector('form').addEventListener('submit',(e) => {
        e.preventDefault()
        const val = searchUser.value
        if (val === '') {
            alert('Enter a Username')
            return
        }
        search(val)
    })
})