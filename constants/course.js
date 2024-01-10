import { getCourseCategories } from "../api/course";

const categoriesList = async () => {
    const response = await getCourseCategories()
    if (response?.status === 200) {
        return response.data
    } else {
        return []
    }

}

const getCourseDefaultImage = (type) => {
    switch (type) {
        case "LANGUAGE":
            return require("../assets/home/courseImage/courseTranslation.png")
        case "MATH":
            return require("../assets/home/courseImage/courseMath.png")
        case "DANCE":
            return require("../assets/home/courseImage/courseBallet.png")
        case "SINGING":
            return require("../assets/home/courseImage/courseMusic.png")
        case "PHYSIC":
            return require("../assets/home/courseImage/coursePhysics.png")
        case "PROGRAM":
            return require("../assets/home/courseImage/courseCoding.png")
        case "DRAWING ":
            return require("../assets/home/courseImage/courseArt.png")
        default:
            return require("../assets/home/courseImage/couseDefault.png")
    }
}

const getCourseDefaultName = (type) => {
    switch (type) {
        case "LANGUAGE":
            return "Ngoại Ngữ"
        case "MATH":
            return "Toán"
        case "DANCE":
            return "Múa"
        case "SINGING":
            return "Hát"
        case "PHYSIC":
            return "Vật Lý"
        case "PROGRAM":
            return "Lập Trình"
        case "DRAWING ":
            return "Vẽ"
        default:
            return "Khoá học"
    }
}

export const courseCategories = async () => {
    const categories = await categoriesList();

    return categories.map((item) => ({
        ...item,
        img: getCourseDefaultImage(item.name),
        vietName: getCourseDefaultName(item.name),
    }));
};


