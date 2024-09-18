type templateTypes = {
    name: string;
    prompt: string;
    image: string;
}

export const templates: templateTypes[] = [
    {
        name: "Official Image",
        prompt: "Prompt 1",
        image: "https://studioindi.jp/wp-content/uploads/2024/05/ba-box-retouchflow-after2-m1.jpg"
    },
    {
        name: "Portrait Image",
        prompt: "Prompt 2",
        image: "https://www.spacemarket.com/magazine/wp-content/uploads/2023/06/13134759/26542245_s.jpg"
    },
    {
        name: "Fantasy Image",
        prompt: "Prompt 3",
        image: "https://blog.ja.playstation.com/tachyon/sites/7/2021/07/a3d299e7a2841e06dcb6771ade6f25a3b4973985.jpg?fit=1024%2C675"
    }
]
export const background: templateTypes[] = [
    {
        name: "Template 1",
        prompt: "Prompt 1",
        image: "image1.jpg"
    },
    {
        name: "Template 2",
        prompt: "Prompt 2",
        image: "image2.jpg"
    },
    {
        name: "Template 3",
        prompt: "Prompt 3",
        image: "image3.jpg"
    }
]
