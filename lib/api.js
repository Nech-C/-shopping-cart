
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_URL_GAMES = "https://api.rawg.io/api/games"; 

/* api functions */
/**
 * 
 * @param {int} numGames - number of games to return
 * @returns {json} - json object of games
 */
export async function getGames(numGames = 15) {
    try {
      let url = new URL("https://api.rawg.io/api/games");
  
      // Setup the parameters
      let params = {
        key: API_KEY, // Replace with your actual API key
        page_size: String(numGames)      // Number of results to return per page
      };
  
      // Append parameters to the URL
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
      // Await the fetch call to resolve, getting the Response object
      let response = await fetch(url);
  
      // Await the parsing of the Response body as JSON
      let data = await response.json();
  
      // The data variable now holds the parsed JSON object
      console.log(data);
  
      // If you need to use the data outside, you can return it
      return data;
    } catch (error) {
      console.error('Error fetching games:', error);
    }
}

/**
 * 
 * @param {int} numGame - number of games to return
 * @param {Date} date  - date to end with
 * @param {int} range - number of days to go back from date
 * @returns {json} - json object of games
 */
export async function getNewReleases(numGame = 30, date = new Date(), range = 30) {

        const startDate = new Date(date.getTime() - (range * 24 * 60 * 60 * 1000));
        const endDate = date;
        

        let params = {
            key: API_KEY,
            page_size: String(numGame),
            dates: `${formatDate(startDate)},${formatDate(endDate)}`
        }

        return await getGamesWithParams(params);
}


/**
 * 
 * @param {*} params 
 * @returns {json} - json object of games
 */
export async function getGamesWithParams(params = {}) {
    const defaultParams =  { page_size: 15, key: API_KEY};
    try {
        if (Object.keys(params).length === 0) {
            params = defaultParams;
        } else {
            params = {...defaultParams, ...params};
        }

        let url = new URL(API_URL_GAMES);

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        let data = await fetch(url)
                            .then(response => response.json())
                            .then(data => data['results'])

        console.log(data);

        return data;


    } catch (error) {
        console.error('Error fetching games with params:', error);
    }
}


/* helper functions */
/**
 * 
 * @param {Date} date
 * @returns {string} - formatted date string(yyyy-mm-dd)
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export const defaultGameObject = {
    "slug": "baldurs-gate-3",
    "name": "Baldur's Gate III",
    "playtime": 9,
    "platforms": [
        {
            "platform": {
                "id": 4,
                "name": "PC",
                "slug": "pc"
            }
        },
        {
            "platform": {
                "id": 187,
                "name": "PlayStation 5",
                "slug": "playstation5"
            }
        },
        {
            "platform": {
                "id": 5,
                "name": "macOS",
                "slug": "macos"
            }
        }
    ],
    "stores": [
        {
            "store": {
                "id": 1,
                "name": "Steam",
                "slug": "steam"
            }
        },
        {
            "store": {
                "id": 3,
                "name": "PlayStation Store",
                "slug": "playstation-store"
            }
        },
        {
            "store": {
                "id": 5,
                "name": "GOG",
                "slug": "gog"
            }
        }
    ],
    "released": "2023-08-03",
    "tba": false,
    "background_image": "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg",
    "rating": 4.57,
    "rating_top": 5,
    "ratings": [
        {
            "id": 5,
            "title": "exceptional",
            "count": 336,
            "percent": 75.34
        },
        {
            "id": 4,
            "title": "recommended",
            "count": 69,
            "percent": 15.47
        },
        {
            "id": 3,
            "title": "meh",
            "count": 21,
            "percent": 4.71
        },
        {
            "id": 1,
            "title": "skip",
            "count": 20,
            "percent": 4.48
        }
    ],
    "ratings_count": 429,
    "reviews_text_count": 12,
    "added": 2800,
    "added_by_status": {
        "yet": 278,
        "owned": 1210,
        "beaten": 221,
        "toplay": 744,
        "dropped": 92,
        "playing": 255
    },
    "metacritic": 97,
    "suggestions_count": 570,
    "updated": "2024-01-11T18:30:43",
    "id": 324997,
    "score": null,
    "clip": null,
    "tags": [
        {
            "id": 31,
            "name": "Singleplayer",
            "slug": "singleplayer",
            "language": "eng",
            "games_count": 216648,
            "image_background": "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg"
        },
        {
            "id": 42396,
            "name": "Для одного игрока",
            "slug": "dlia-odnogo-igroka",
            "language": "rus",
            "games_count": 42842,
            "image_background": "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg"
        },
        {
            "id": 42392,
            "name": "Приключение",
            "slug": "prikliuchenie",
            "language": "rus",
            "games_count": 34828,
            "image_background": "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg"
        },
        {
            "id": 40847,
            "name": "Steam Achievements",
            "slug": "steam-achievements",
            "language": "eng",
            "games_count": 35083,
            "image_background": "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg"
        },
        {
            "id": 7,
            "name": "Multiplayer",
            "slug": "multiplayer",
            "language": "eng",
            "games_count": 36899,
            "image_background": "https://media.rawg.io/media/games/b7b/b7b8381707152afc7d91f5d95de70e39.jpg"
        },
        {
            "id": 40849,
            "name": "Steam Cloud",
            "slug": "steam-cloud",
            "language": "eng",
            "games_count": 16464,
            "image_background": "https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg"
        },
        {
            "id": 42425,
            "name": "Для нескольких игроков",
            "slug": "dlia-neskolkikh-igrokov",
            "language": "rus",
            "games_count": 9080,
            "image_background": "https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg"
        },
        {
            "id": 42394,
            "name": "Глубокий сюжет",
            "slug": "glubokii-siuzhet",
            "language": "rus",
            "games_count": 11078,
            "image_background": "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg"
        },
        {
            "id": 24,
            "name": "RPG",
            "slug": "rpg",
            "language": "eng",
            "games_count": 19489,
            "image_background": "https://media.rawg.io/media/games/15c/15c95a4915f88a3e89c821526afe05fc.jpg"
        },
        {
            "id": 18,
            "name": "Co-op",
            "slug": "co-op",
            "language": "eng",
            "games_count": 10934,
            "image_background": "https://media.rawg.io/media/games/15c/15c95a4915f88a3e89c821526afe05fc.jpg"
        },
        {
            "id": 42412,
            "name": "Ролевая игра",
            "slug": "rolevaia-igra",
            "language": "rus",
            "games_count": 15904,
            "image_background": "https://media.rawg.io/media/games/c6b/c6bfece1daf8d06bc0a60632ac78e5bf.jpg"
        },
        {
            "id": 42421,
            "name": "Стратегия",
            "slug": "strategiia",
            "language": "rus",
            "games_count": 17293,
            "image_background": "https://media.rawg.io/media/games/879/879c930f9c6787c920153fa2df452eb3.jpg"
        },
        {
            "id": 42435,
            "name": "Шедевр",
            "slug": "shedevr",
            "language": "rus",
            "games_count": 1059,
            "image_background": "https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg"
        },
        {
            "id": 42413,
            "name": "Симулятор",
            "slug": "simuliator",
            "language": "rus",
            "games_count": 17528,
            "image_background": "https://media.rawg.io/media/games/27b/27b02ffaab6b250cc31bf43baca1fc34.jpg"
        },
        {
            "id": 9,
            "name": "Online Co-Op",
            "slug": "online-co-op",
            "language": "eng",
            "games_count": 5108,
            "image_background": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
        },
        {
            "id": 42480,
            "name": "Фэнтези",
            "slug": "fentezi",
            "language": "rus",
            "games_count": 10219,
            "image_background": "https://media.rawg.io/media/games/f8c/f8c6a262ead4c16b47e1219310210eb3.jpg"
        },
        {
            "id": 64,
            "name": "Fantasy",
            "slug": "fantasy",
            "language": "eng",
            "games_count": 26457,
            "image_background": "https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg"
        },
        {
            "id": 42444,
            "name": "Песочница",
            "slug": "pesochnitsa",
            "language": "rus",
            "games_count": 3748,
            "image_background": "https://media.rawg.io/media/games/25c/25c4776ab5723d5d735d8bf617ca12d9.jpg"
        },
        {
            "id": 198,
            "name": "Split Screen",
            "slug": "split-screen",
            "language": "eng",
            "games_count": 6306,
            "image_background": "https://media.rawg.io/media/screenshots/c97/c97b943741f5fbc936fe054d9d58851d.jpg"
        },
        {
            "id": 397,
            "name": "Online multiplayer",
            "slug": "online-multiplayer",
            "language": "eng",
            "games_count": 3804,
            "image_background": "https://media.rawg.io/media/games/21b/21babfc41e2a6972290833d1b860f13e.jpg"
        },
        {
            "id": 75,
            "name": "Local Co-Op",
            "slug": "local-co-op",
            "language": "eng",
            "games_count": 5257,
            "image_background": "https://media.rawg.io/media/games/926/926928beb8a9f9b31cf202965aa4cbbc.jpg"
        },
        {
            "id": 72,
            "name": "Local Multiplayer",
            "slug": "local-multiplayer",
            "language": "eng",
            "games_count": 12909,
            "image_background": "https://media.rawg.io/media/games/ca1/ca16da30f86d8f4d36261de45fb35430.jpg"
        },
        {
            "id": 40832,
            "name": "Cross-Platform Multiplayer",
            "slug": "cross-platform-multiplayer",
            "language": "eng",
            "games_count": 2476,
            "image_background": "https://media.rawg.io/media/screenshots/bf7/bf71c819eace914e6c42ae3ecb667308.jpg"
        },
        {
            "id": 468,
            "name": "role-playing",
            "slug": "role-playing",
            "language": "eng",
            "games_count": 1547,
            "image_background": "https://media.rawg.io/media/games/598/59851e152a6898c8bf79069b5bf2f4db.jpg"
        },
        {
            "id": 42424,
            "name": "Пошаговая",
            "slug": "poshagovaia",
            "language": "rus",
            "games_count": 1665,
            "image_background": "https://media.rawg.io/media/games/8ca/8ca40b562a755d6a0e30d48e6c74b178.jpg"
        },
        {
            "id": 121,
            "name": "Character Customization",
            "slug": "character-customization",
            "language": "eng",
            "games_count": 4184,
            "image_background": "https://media.rawg.io/media/games/d69/d69810315bd7e226ea2d21f9156af629.jpg"
        },
        {
            "id": 40833,
            "name": "Captions available",
            "slug": "captions-available",
            "language": "eng",
            "games_count": 1301,
            "image_background": "https://media.rawg.io/media/games/fee/fee0100afd87b52bfbd33e26689fa26c.jpg"
        },
        {
            "id": 42419,
            "name": "Рогалик",
            "slug": "rogalik",
            "language": "rus",
            "games_count": 3565,
            "image_background": "https://media.rawg.io/media/games/3be/3be0e624424d3453005019799a760af2.jpg"
        },
        {
            "id": 99,
            "name": "Isometric",
            "slug": "isometric",
            "language": "eng",
            "games_count": 4246,
            "image_background": "https://media.rawg.io/media/games/489/4899fe1e7b65e550ea619db02006ca6c.jpg"
        },
        {
            "id": 82,
            "name": "Magic",
            "slug": "magic",
            "language": "eng",
            "games_count": 8886,
            "image_background": "https://media.rawg.io/media/games/d09/d096ad37b7f522e11c02848252213a9a.jpg"
        },
        {
            "id": 42551,
            "name": "Менеджмент",
            "slug": "menedzhment",
            "language": "rus",
            "games_count": 3130,
            "image_background": "https://media.rawg.io/media/screenshots/bf7/bf71c819eace914e6c42ae3ecb667308.jpg"
        },
        {
            "id": 40937,
            "name": "Steam Trading Cards",
            "slug": "steam-trading-cards-2",
            "language": "eng",
            "games_count": 587,
            "image_background": "https://media.rawg.io/media/games/bd2/bd2cc7714e0b9b1adad1ba1b2400d436.jpg"
        },
        {
            "id": 42552,
            "name": "Можно приостановить",
            "slug": "mozhno-priostanovit",
            "language": "rus",
            "games_count": 278,
            "image_background": "https://media.rawg.io/media/games/399/3990e15f219261780b30f20cdc62266b.jpg"
        },
        {
            "id": 42521,
            "name": "Экономика",
            "slug": "ekonomika",
            "language": "rus",
            "games_count": 1318,
            "image_background": "https://media.rawg.io/media/games/309/309f6f52d63d494270c3f4ca24e66839.jpg"
        },
        {
            "id": 238,
            "name": "CRPG",
            "slug": "crpg",
            "language": "eng",
            "games_count": 921,
            "image_background": "https://media.rawg.io/media/games/218/218167ff4011acc825c844d0070940a0.jpg"
        },
        {
            "id": 206,
            "name": "Party-Based RPG",
            "slug": "party-based-rpg",
            "language": "eng",
            "games_count": 931,
            "image_background": "https://media.rawg.io/media/games/b2c/b2c9c6115114c8f7d461b5430e8a7d4a.jpg"
        },
        {
            "id": 467,
            "name": "Role Playing Game",
            "slug": "role-playing-game",
            "language": "eng",
            "games_count": 19,
            "image_background": "https://media.rawg.io/media/games/8ea/8ea1e2850d7568bc9733d546c0ac6ce1.jpg"
        },
        {
            "id": 574,
            "name": "Dungeons & Dragons",
            "slug": "dungeons-dragons",
            "language": "eng",
            "games_count": 180,
            "image_background": "https://media.rawg.io/media/screenshots/610/610e26d28e5cc1c9499f0162a3451da9.jpg"
        }
    ],
    "esrb_rating": {
        "id": 4,
        "name": "Mature",
        "slug": "mature",
        "name_en": "Mature",
        "name_ru": "С 17 лет"
    },
    "user_game": null,
    "reviews_count": 446,
    "saturated_color": "0f0f0f",
    "dominant_color": "0f0f0f",
    "short_screenshots": [
        {
            "id": -1,
            "image": "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg"
        },
        {
            "id": 2300708,
            "image": "https://media.rawg.io/media/screenshots/a67/a676cdec0eadc42a133ac49e7f2e1aac.jpg"
        },
        {
            "id": 2300709,
            "image": "https://media.rawg.io/media/screenshots/705/705846f6583a6da009a0ae7fcdece36d.jpg"
        },
        {
            "id": 2300710,
            "image": "https://media.rawg.io/media/screenshots/d29/d29b1d2726d69432d2b4180a79b9ee9d.jpg"
        },
        {
            "id": 2300711,
            "image": "https://media.rawg.io/media/screenshots/ed1/ed19ec8ce43f9dd3553df4a6d9301f61.jpg"
        },
        {
            "id": 2300712,
            "image": "https://media.rawg.io/media/screenshots/6c8/6c8983d658a4a24dc8eb9d2f88f1dabf.jpg"
        },
        {
            "id": 2300713,
            "image": "https://media.rawg.io/media/screenshots/92c/92cbe16a795afbc9d9837ed9eae4f22b.jpg"
        }
    ],
    "parent_platforms": [
        {
            "platform": {
                "id": 1,
                "name": "PC",
                "slug": "pc"
            }
        },
        {
            "platform": {
                "id": 2,
                "name": "PlayStation",
                "slug": "playstation"
            }
        },
        {
            "platform": {
                "id": 5,
                "name": "Apple Macintosh",
                "slug": "mac"
            }
        }
    ],
    "genres": [
        {
            "id": 10,
            "name": "Strategy",
            "slug": "strategy"
        },
        {
            "id": 3,
            "name": "Adventure",
            "slug": "adventure"
        },
        {
            "id": 5,
            "name": "RPG",
            "slug": "role-playing-games-rpg"
        }
    ]
}