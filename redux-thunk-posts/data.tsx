const initialState = {
  posts: [
    {
      id: 0,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/19/12/08/christmas-mood-cinnamon-tea-cakes-1600x900_944565-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/19/12/08/christmas-mood-cinnamon-tea-cakes-1920x1080_944565-mm-90.jpg",
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      id: 1,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/21/04/23/ipad-pro-2021-1600x900_897567-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/21/04/23/ipad-pro-2021-1920x1080_897567-mm-90.jpg",
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      id: 2,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/18/04/11/with-the-laptop-in-nature-1600x900_97898-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/18/04/11/with-the-laptop-in-nature-1920x1080_97898-mm-90.jpg",
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
    {
      id: 3,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/21/10/31/pixar-pier-1600x900_476995-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/21/10/31/pixar-pier-1920x1080_476995-mm-90.jpg",
      title: "eum et est occaecati",
      body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    },
    {
      id: 4,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/20/01/25/cityscape-from-shanghai-china-1600x900_666788-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/20/01/25/cityscape-from-shanghai-china-1920x1080_666788-mm-90.jpg",
      title: "nesciunt quas odio",
      body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
    },
    {
      id: 5,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/19/09/15/sunset-in-san-diego-harbor-4k-picture-1600x900_666694-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/19/09/15/sunset-in-san-diego-harbor-4k-picture-1920x1080_666694-mm-90.jpg",
      title: "dolorem eum magni eos aperiam quia",
      body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
    },
    {
      id: 6,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/19/07/28/strawberry-splashing-in-milk-1600x900_477969-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/19/07/28/strawberry-splashing-in-milk-1920x1080_477969-mm-90.jpg",
      title: "magnam facilis autem",
      body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
    },
    {
      id: 7,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/18/06/14/coffee-date-1600x900_45769-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/18/06/14/coffee-date-1920x1080_45769-mm-90.jpg",
      title: "dolorem dolore est ipsam",
      body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
    },
    {
      id: 8,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/18/05/29/bucket-with-strawberries-1600x900_69889-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/18/05/29/bucket-with-strawberries-1920x1080_69889-mm-90.jpg",
      title: "nesciunt iure omnis dolorem tempora et accusantium",
      body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
    },
    {
      id: 9,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/18/05/17/tomatoes-and-basil-1600x900_84698-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/18/05/17/tomatoes-and-basil-1920x1080_84698-mm-90.jpg",
      title: "optio molestias id quia eum",
      body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
    },
    {
      id: 10,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/18/04/16/blackberries-and-raspberries-1600x900_95968-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/18/04/16/blackberries-and-raspberries-1920x1080_95968-mm-90.jpg",
      title: "et ea vero quia laudantium autem",
      body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
    },
    {
      id: 11,
      url_image_1600x900:
        "https://uhdwallpapers.org/uploads/converted/18/04/25/creative-art-wine-love-1600x900_46475-mm-90.jpg",
      url_image_1920x1080:
        "https://uhdwallpapers.org/uploads/converted/18/04/25/creative-art-wine-love-1920x1080_46475-mm-90.jpg",
      title: "in quibusdam tempore odit est dolorem",
      body: "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
    },
  ],
  post: null,
};
module.exports = initialState;
