# YT-Paginator
A MVC based paginator for youtube for a specific search query.
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/45993519/174975901-2b13be52-167b-4562-8205-5f2763b38958.png">


# Search API
Search API could be used by clicking the search button or using a route `/search/:query`. 

Example: `/search/mystery`.

Search API searches for partials matches in video title or description.

# Setup
First setup environment variables in `.env`.

An example file(`.env.example`) has been pushed and could be taken as an example. 

`SAVE_TO_DATA` and `RUN_ASYNC_SERVER` can be 0 or 1 for off and on respectively.

`API_KEYS` is a comma seperated list for example: `"API_KEY1, API_KEY2, API_KEY3"`.

## Bare Metal
```
npm install
npm run serve 
```

## Docker
```
npm install
docker build --tag node-docker .
docker run -p 8000:8000 node-docker
```


# Vhost
Make sure you've installed [nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04).
Edit `vhost/ytpaginator.nginx.conf` to your needs and then run.
```
cd vhost/
sudo cp ytpaginator.nginx.conf /etc/nginx/sites-available/ytpaginator.nginx.conf
sudo ln -s /etc/nginx/sites-available/ytpaginator.nginx.conf /etc/nginx/sites-enabled/ytpaginator.nginx.conf
systemctl restart nginx
```
