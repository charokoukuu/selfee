export type templateTypes = {
    name: string;
    prompt: string;
    image: string;
    background?: backgroundTypes[];
}

export type backgroundTypes = {
    name: string;
    prompt: string;
    image: string;
}

// 背景画像
export const background: backgroundTypes[] = [
    {
        name: "uminienko",
        prompt: "A portrait img of a man in front of the Uyuni Salt Flats is dreamlike landscape featuring a vast reflective salt flat, with a sky full of fluffy clouds and their silhouettes reflecting perfectly on the surface of the salt flat, with a softly blurred background, vibrant colors, natural lighting, and a serene, confident expression",
        image: "https://a-tabito.jp/wp-content/uploads/2018/02/DSC_0203-1200x630.jpg"
    },
    {
        name: "flower",
        prompt: "a man of img Portrait photo in front of a beautiful background, softly blurred, vibrant colors, natural lighting, head and shoulders in frame, serene and confident expression",
        image: "https://res.cloudinary.com/tabikobo/images/c_scale,w_448,h_299,dpr_2/f_auto,q_auto/v1689924072/wordpress_tabi-pocket/af8f10f4c90fd99737035b3a555994bb/af8f10f4c90fd99737035b3a555994bb.jpg?_i=AA"
    },
    {
        name: "Template 3",
        prompt: "Prompt 3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFeJEYhNbcTrqSiQFp9rqJg59p1tSJmMV0ZS_hY5ofNFJqMY52ZghonOC-pvl7OZqjs8&usqp=CAU"
    },
    {
        name: "Template 3",
        prompt: "Prompt 3",
        image: "https://beiz.jp/images_T/mountain/mountain_00009.jpg"
    }
]

// テンプレート画像
export const templates: templateTypes[] = [
    {
        name: "Official Image",
        prompt: "A portrait photo of a person, dressed in a black business suit, against a plain white background. The image is well-lit with natural lighting, capturing a formal and serious expression. The format is similar to an ID photo, with the head and shoulders in the frame, emphasizing a clean, professional appearance.",
        image: "https://studioindi.jp/wp-content/uploads/2024/05/ba-box-retouchflow-after2-m1.jpg"
    },
    {
        name: "Portrait Image",
        prompt: "Prompt 2",
        image: "https://www.spacemarket.com/magazine/wp-content/uploads/2023/06/13134759/26542245_s.jpg",
        background: background
    },
    {
        name: "Prisoner Image",
        prompt: "A mugshot photo of a person standing in front of a height measurement backdrop, wearing black-and-white striped prison attire. The individual holds a prisoner ID placard with a neutral and slightly serious expression. The lighting creates a shadowed effect on one side, emphasizing the formal, police department setting.",
        image: "https://media.istockphoto.com/id/1436122354/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E8%AD%A6%E5%AF%9F%E7%BD%B2%E3%81%AE%E3%83%9E%E3%82%B0%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%E3%83%AC%E3%82%BF%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89%E3%82%92%E6%8C%81%E3%81%A4%E5%9B%9A%E4%BA%BA.jpg?s=612x612&w=0&k=20&c=uziqQBsVzH6DOKMm5g5BDQBGDAn811QGpEQ8kqk_tZQ="
    },
    {
        name: "Official Image",
        prompt: "Prompt 12",
        image: "https://studioindi.jp/wp-content/uploads/2024/05/ba-box-retouchflow-after2-m1.jpg"
    },
    {
        name: "Portrait Image",
        prompt: "Prompt 22",
        image: "https://www.spacemarket.com/magazine/wp-content/uploads/2023/06/13134759/26542245_s.jpg"
    },
    {
        name: "Fantasy Image",
        prompt: "Prompt 32",
        image: "https://blog.ja.playstation.com/tachyon/sites/7/2021/07/a3d299e7a2841e06dcb6771ade6f25a3b4973985.jpg?fit=1024%2C675"
    }
]
