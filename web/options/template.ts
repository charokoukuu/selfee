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
        prompt: "Prompt 1",
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
        prompt: "Prompt 1",
        image: "https://studioindi.jp/wp-content/uploads/2024/05/ba-box-retouchflow-after2-m1.jpg"
    },
    {
        name: "Portrait Image",
        prompt: "Prompt 2",
        image: "https://www.spacemarket.com/magazine/wp-content/uploads/2023/06/13134759/26542245_s.jpg",
        background: background
    },
    {
        name: "Fantasy Image",
        prompt: "Prompt 3",
        image: "https://blog.ja.playstation.com/tachyon/sites/7/2021/07/a3d299e7a2841e06dcb6771ade6f25a3b4973985.jpg?fit=1024%2C675"
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
