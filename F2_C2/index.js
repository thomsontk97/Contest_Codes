const puppeteer = require('puppeteer');

async function extractData(){

    //Launch Browser and New page
    const browser = await puppeteer.launch({headless : true});
    const page = await browser.newPage();
    //
  
    //Website url
    await page.goto('https://github.com/trending');
    //


    //Evaluate
    var all_repos = await page.evaluate(() => {
        var repos = [];
        


        //Repo-Title  
            var repo_title_list = Array.from(document.querySelectorAll('div > article.Box-row > h1'));

            var title_arr = [];
            repo_title_list.forEach((title) => {
                var rep_titl = title.querySelector('a').textContent.trim();
                title_arr.push(rep_titl);
            });
        
        //

        //Description
        var repo_desc_list = Array.from(document.querySelectorAll('div > article.Box-row > p'));

        var desc_arr = [];
        repo_desc_list.forEach((desc) => {
            var rep_desc = desc.textContent.trim();
            desc_arr.push(rep_desc);
        });
        //

        //URL
        var repo_url_list = Array.from(document.querySelectorAll('div > article.Box-row > h1'));

        var url_arr = [];
        repo_url_list.forEach((url) => {
            var rep_url = url.querySelector('a').innerText;
            url_arr.push(rep_url);
        });

        //Stars
        var repo_star_list = Array.from(document.querySelectorAll('div > article.Box-row > div > a:nth-of-type(1)'));

        var star_arr = [];
        repo_star_list.forEach((star) => {
            var repo_star = star.innerText;
            star_arr.push(repo_star);
        });
        //Forks
        var repo_forks_list = Array.from(document.querySelectorAll('div > article.Box-row > div > a:nth-of-type(2)'));

        var forks_arr = [];
        repo_forks_list.forEach((forks) => {
            var repo_forks = forks.innerText;
            forks_arr.push(repo_forks);
        });

        //Language
        var repo_lang_list = Array.from(document.querySelectorAll('div > article.Box-row > div > span > span:nth-child(2)'));

        var lang_arr = [];
        repo_lang_list.forEach((lang) => {
            var repo_lang = lang.innerText;
            lang_arr.push(repo_lang);    
        });
        //


        //
        var n = repo_title_list.length;
        for(var i=0; i<n; i++){
            var repo_obj = {
                Title:title_arr[i],
                Description:desc_arr[i],
                URL:url_arr[i],
                Stars:star_arr[i],
                Forks:forks_arr[i],
                Language:lang_arr[i]
            }
            repos.push(repo_obj);
        }
        //

        return repos;


    });

    console.log("Repositeries: ",all_repos);
  
    //Close Browser
    await browser.close();
}


extractData();