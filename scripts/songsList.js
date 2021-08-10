//Fill playlist
const playlist_body = document.getElementById("playlist-table__body");
const playlist_details = document.querySelector(".playlist-details");
const playMusic_button = document.getElementById("playMusicBtn");
const like_songsList = document.getElementById("like-songs");

let mobile_nav_height;
const mobile_nav = document.querySelector('.aside-mobile__links');
// const current_music_div = document.querySelector('.current-music');
const current_music_div = document.querySelector('.music-current-desktop');

function fillData(data) {
    playlist_details.innerHTML = `
    <div class="playlist-details__image">
        <img src="../assets/images/sample.jpg" alt="playlist-image" />
    </div>
    <div class="playlist-details__content">
        <p>لیست اهنگ</p>
        <h1>${data.name}</h1>
        <div class="flex songsListDetails">
            <span><b>Spotify</b></span>
            <span>${data.songs.length} آهنگ </span>
        </div>
    </div>
`;
    const songsList = data.songs
        .map(
            (song, i) =>
            `<tr>
            <td class="hide-column">
            <span> ${i + 1} </span>
            <img src="../assets/Icons/play-triangle-button.svg" class="play_sign_button svgColor" alt="">
            </td>
            <td class="song-details__container">
                <div class="song-details">
                    <div>
                        <a href="./song.html?id=${song.id}">
                            <img src=${song.cover} />
                        </a>
                    </div>
                    <div>
                        <h6>${song.name}</h6>
                        <h6>${song.artist}</h6>
                    </div>
                </div>
            </td>
            <td class="hide-column">${data.name}</td>
            <td class="hide-column">${new Date(
              song.publish_date
            ).getFullYear()}/${new Date(
          song.publish_date
        ).getMonth()}/${new Date(song.publish_date).getDay()}</td>
            <td class="remove-column" ><img  id="${
              song.id
            }" class="remove" src="../assets/Icons/remove_circle_white_24dp.svg"/></td>
        </tr>`
        )
        .join("\n");
    playlist_body.innerHTML = songsList;
    playMusic_button.addEventListener("click", () => {
        if (getToken()) {
            window.location.href = `./song.html?id=${data.songs[0].id}`;
        } else {
            permission();
        }
    });
}

function getPlaylistSongs() {
    let id = localStorage.getItem("favoriteId");
    GetData("getPlaylist", id)
        .then((res) => {
            fillData(res);
            showToast("درحال بارگزاری آهنگ ها");
        })
        .catch(() => {
            showToast("خطا در ارتباط با سرور");
        });
}

getPlaylistSongs();

// //handle size
// let mobile_nav_height;
// const mobile_nav = document.querySelector(".aside-mobile__links");
// const current_music_div = document.querySelector(".current-music");

// mobile_nav_height = mobile_nav.clientHeight;
// current_music_div.style.bottom = `${mobile_nav_height}px`;

// window.addEventListener("resize", () => {
//   mobile_nav_height = mobile_nav.clientHeight;
//   current_music_div.style.bottom = `${mobile_nav_height}px`;
// });

//Remove a song
const removeSong = (id) => {
    PostData("postRemoveSong", {
            token: getToken(),
            playlistId: +localStorage.getItem("favoriteId"),
            songId: id,
        })
        .then((res) => {})
        .catch((err) => {});
    showToast("آهنگ حذف شد");
};

document.addEventListener(
    "click",
    function(e) {
        if (e.target.className === "remove") {
            removeSong(+e.target.id);
            getPlaylistSongs();
        }
    },
    false
);

if (current_music_div) {
    mobile_nav_height = mobile_nav.clientHeight;
    console.log(mobile_nav_height);
    current_music_div.style.bottom = `${mobile_nav_height+3}px`;

    window.addEventListener('resize', () => {
        mobile_nav_height = mobile_nav.clientHeight;
        current_music_div.style.bottom = `${mobile_nav_height}px`;
    })
}

/* When the user clicks on the button, 
                                        toggle between hiding and showing the dropdown content */
function dropbtnHandler() {
    document.getElementById("myDropdown").classList.toggle("show");
}

const dropbtn = document.querySelector('.dropbtn');
const dropbtn_icon = document.querySelector('.dropbtn img');
dropbtn.addEventListener('click', dropbtnHandler);

window.addEventListener('click', (e) => {
    if (e.target !== dropbtn_icon) {
        const myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
})